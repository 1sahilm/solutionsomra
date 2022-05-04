import React, { useState,useRef,useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/router'

import easypdf from "easypdf-io"




// reactstrap components
import {
    Badge,
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    Progress,
    Table,
  
    Container,
    Row,
    UncontrolledTooltip,
    CardBody,
    FormGroup,
  Form,
  Input,
  Col,
  Button,
  Alert,
  } from "reactstrap";


// core components

import {useSession,getSession} from 'next-auth/client';
import Layout from "../../components/Layout";


function TaskList() {
   
    const router=useRouter();


    const[session,loading] = useSession();
  
    // useEffect(()=>{
    //   if(!session?.user?.isSuperAdmin){
    //     router.push("/admin/dashboard")
    //   }
    // },[session])
  const [count, setCount] = useState(0);
//   const [toasterData, setToasterData] = useState({
//     position: 'topEnd',
//     status: 'Primary',
//     duration: 5000,
//     hasIcon: true,
//     destroyByClick: true,
//     preventDuplicates: false,
//   });

  const [checkbox, setCheckbox] = useState({
    1: false,
    2: false,
    3: false,
  });

  const onChangeCheckbox = (value, name) => {
    setCheckbox({ ...checkbox, [name]: value });
  };

  //VARIABLE INITIALIZATION

  const [name, setName] = useState('');
  const [task_name, setTask_name] = useState('');
  const [users, setUsers] = useState([]);
  const [date,setDate] = useState('');
  const [page,setPage] =useState(1);
  
 
  const [serverPage,setServerPage] = useState(1);
  const [monthly_target_assign, setMonthly_target_assign] = useState('');
  const [monthly_base_target_assign,setMonthly_base_target_assign]=useState('')
  const [monthly_target_done, setMonthly_target_done] = useState('');
  const [valid_date,setValid_date]=useState('');
  const [category, setCategory] = useState('');
  const [tasks,setTasks]= useState('');
  
  

  //Next API For Beds start type

  useEffect(() => {
    
    function getUsers() {
      axios.get(`/api/admin/agency/agency_data?username=${router.query.username}`).then((response) => {
          console.log(response)
        setUsers(response.data.data);
        setServerPage(response.data.totalPages);
        setPage(page=>page + 1);
      });
    }
    if(router?.query?.username){
    getUsers();
    }
  }, [router]);

  console.log(users);

  

  const loadNextPage = async () => {

    axios.get(`/api/admin/agency/agency_data?page=${page}&limit=20`).then((response) => {

      setUsers((prevData)=>[...prevData, ...response.data.data]);
      setServerPage(response.data.totalPages);
      setPage(page + 1);
    });
  };

  const deleteuser = (id) => {
    axios.delete(`/api/user/delete/${id}`).then((response) => {
      console.log(response);
      router.reload(`/`)
    });
  };


  const handlePdfDownload= async ({data})=>{
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
            }
        };
    }

    function downloadPDF() {
        var data =  getSampleData();
        easypdf.create(data, function(result) {
            easypdf.download('sample.pdf', result.pdf);
            //	you can download like this as well:
            //	easypdf.download();
            //	easypdf.download('sample.pdf');
        });
    }

     downloadPDF();

  }
 


    //=======================================================================================================
    return(
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
                    
                    <p>Super Admin: {user?.isSuperAdmin ? 'true' : 'false'}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Button
                        fullWidth
                        appearance="hero"
                        status="Primary"
                        style={{ maxWidth: '45%' }}
                        onClick={() => handlePdfDownload({data:user}) }
                      >
                       Download PDF
                      </Button>
                      {/* <Button
                        fullWidth
                        appearance="hero"
                        status="Danger"
                        style={{ maxWidth: '45%' }}
                        onClick={() => deleteuser(user._id)}
                      >
                        Delete User
                      </Button> */}
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
