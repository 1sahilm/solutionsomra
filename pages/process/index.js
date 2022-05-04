import React, { useEffect, useState } from "react";
// node.js library that concatenates classes (strings)

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";
// layout for this page

// core components

import { useSession, getSession } from "next-auth/client";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import UserLayout from "../../components/userLayout";

const Dashboard = () => {
  const router = useRouter();

  const [process, setProcess] = useState([]);
  const [page, setPage] = useState(1);
  const [serverPage, setServerPage] = useState(1);

  //

  // useEffect(()=>{
  //   if(!session){
  //     router.push("/auth/login")
  //   }

  // },[session])

  const [activeNav, setActiveNav] = React.useState(1);
  const [chartExample1Data, setChartExample1Data] = React.useState("data1");

  //   const toggleNavs = (e, index) => {
  //     e.preventDefault();
  //     setActiveNav(index);
  //     setChartExample1Data("data" + index);
  //   };

  //   useEffect(() => {
  //     function getProcess() {
  //       axios.get(`/api/process?`).then((response) => {
  //         setProcess(response.data.data);
  //         setServerPage(response.data.totalPages);
  //         setPage(page + 1);
  //       });
  //     }
  //     getProcess();
  //   }, []);

  //   const loadNextPage = async () => {

  //     axios.get(`/api/process?page=${page}&limit=20`).then((response) => {

  //       setUsers((prevData)=>[...prevData, ...response.data.data]);
  //       setServerPage(response.data.totalPages);
  //       setPage(page + 1);
  //     });
  //   };

  //   const deleteuser = (id) => {
  //     axios.delete(`/api/process/delete/${id}`).then((response) => {
  //       console.log(response);
  //       router.reload();
  //     });
  //   };

  return (
    <>
    <div style={{background:"#edd8c4"}}>
    <UserLayout >
      
      <div className="bg-theme-clr pb-4 pt-3 pt-md-4">
        <Container className="">
          <div className="col text-center text-success mt-5 bg-info">
            <h1>Choose your  Process</h1>
          </div>
        </Container>
      </div>

      <Container  style={{ display:"flex", justifyContent: "center" ,justifyContent: "space-between" }}>
        <Button
          style={{
            background: "grey",
            padding: "40px",
            marginTop: "30px",
            color: "white",
            textAlign: "center",
            
          }}
          onClick={() => router.push(`process/v1process/Submission-form`)}
        >
          V1-Process
        </Button>

        <Button
          style={{
            background: "grey",
            padding: "40px",
            marginTop: "30px",
            color: "white",
            textAlign: "center",
          }}
          onClick={() => router.push(`process/s1process/addprocess`)}
        >
          S1-Process
        </Button>
      </Container>
     
      </UserLayout>
      </div>
    </>
  );
};

export default Dashboard;

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  if (session?.user?.isSuperAdmin) {
    return {
      redirect: {
        destination: "/admin/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
