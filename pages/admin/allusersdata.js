import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import easypdf from 'easypdf-io';
// core components
import {
  getSession,
  useSession,
} from 'next-auth/client';
import { useRouter } from 'next/router';
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  Container,
} from 'reactstrap';

import Layout from '../../components/Layout';

function TaskList() {
  const router = useRouter();

  const [session, loading] = useSession();

  const [count, setCount] = useState(0);

  const [checkbox, setCheckbox] = useState({
    1: false,
    2: false,
    3: false,
  });

  const onChangeCheckbox = (value, name) => {
    setCheckbox({ ...checkbox, [name]: value });
  };

  //VARIABLE INITIALIZATION

  const [users, setUsers] = useState([]);

  const [page, setPage] = useState(1);

  const [serverPage, setServerPage] = useState(1);

  //Next API For Beds start type

  useEffect(() => {
    function getUsers() {
      axios
        .get(`/api/admin/agency/agency_data?username=${router.query.username}`)
        .then((response) => {
         
          setUsers(response.data.data);
          setServerPage(response.data.totalPages);
          setPage((page) => page + 1);
        });
    }
    if (router?.query?.username) {
      getUsers();
    }
  }, [router]);

 

  const loadNextPage = async () => {
    axios
      .get(`/api/admin/agency/agency_data?page=${page}&limit=20`)
      .then((response) => {
        setUsers((prevData) => [...prevData, ...response.data.data]);
        setServerPage(response.data.totalPages);
        setPage(page + 1);
      });
  };

  const deleteuser = (id) => {
    axios.delete(`/api/user/delete/${id}`).then((response) => {
     
      router.reload(`/`);
    });
  };

  const handlePdfDownload = async ({ data }) => {
    function getSampleData() {
      var html = `
        <div class="container">
        <div style="
        width:300px; max-width:350px; class="table-responsive-sm">
        <table style="font-family: arial, sans-serif;
        border-collapse: collapse;
        width:10px;
       ">
       <thead>
  <tr>
   
    <th style="border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;width:10%">Employee Name</th>
    <th style="border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;width:10%">Total number of call</th>
    <th style="border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;width:10%">Total business connected</th>
    <th style="border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;width:10%">total number - document received today</th>
    <th style="border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;width:10%">Total catalog created</th>
    <th style="border: 1px solid #dddddd;
    text-align: left;
    padding: 8px; width:10%">Total approval done today</th>
    
   
  </tr>
  </thead>
  <tbody>
  <tr>
   
    <td style="border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;width:10%"> ${data?.name}<br/></td>
    <td style="border: 1px solid #dddddd;
    text-align: left;
    padding: 8px; width:10%"> ${data?.total_no_of_calls}<br/></td>

    <td style="border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;width:10%">${data?.total_bussiness_connected}</td>
    <td style="border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;width:10%">${data?.total_docs_received_today}</td>
    <td style="border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;width:10%">${data?.total_catalog_created}</td>
  
    <td style="border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;width:10%">${data?.total_approval_done_today}</td>
    
   
  </tr>
  </tbody>

 
</table>
        </div></div>`;
      return {
        // Base64 encode html
        html: btoa(html),
        // background: 'https://public.easyinvoice.cloud/img/watermark-draft.jpg',
        settings: {
          // "margin-top": 25, // Default to 25
          // "margin-right": 25, // Default to 25
          // "margin-left": 25, // Default to 25
          // "margin-bottom": 25, // Default to 25
          // "format": "Letter" // Defaults to A4
        },
      };
    }

    function downloadPDF() {
      var data = getSampleData();
      easypdf.create(data, function (result) {
        easypdf.download("sample.pdf", result.pdf);
      });
    }

    downloadPDF();
  };

  //=======================================================================================================
  return (
    <>
      <Layout>
        {/* <Header /> */}
        <div className="bg-theme-clr pb-4 pt-3 pt-md-4">
          <Container className="DataListHeading">
            <div className="col text-center text-white">
              <h1>User Reports</h1>
            </div>
          </Container>
        </div>

        <Container>
          {!users ? (
            <h1>Loading</h1>
          ) : (
            users?.map((user) => {
              console.log(user);
              return (
                <Card key={user?._id}>
                  <header>ID=({user?._id})</header>
                  <CardBody>
                    <p>Name: {user?.name}</p>
                    <p>username: {user?.username}</p>
                    <p>timestamp: {user?.timestamp}</p>

                    <p>Super Admin: {user?.isSuperAdmin ? "true" : "false"}</p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button
                        fullWidth
                        appearance="hero"
                        status="Primary"
                        style={{ maxWidth: "45%" }}
                        onClick={() => handlePdfDownload({ data: user })}
                      >
                        Download PDF
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              );
            })
          )}
        </Container>
      </Layout>
    </>
  );
}

export default TaskList;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: true,
      },
    };
  }

  if (!session.user.isSuperAdmin) {
    return {
      redirect: {
        destination: "/process",
        permanent: true,
      },
    };
  }

  return {
    props: { session: session },
  };
}
