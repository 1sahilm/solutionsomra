import React, {
  useEffect,
  useState,
} from 'react';

// node.js library that concatenates classes (strings)
import axios from 'axios';
// layout for this page
// core components
import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
// reactstrap components
import {
  Button,
  Container,
} from 'reactstrap';

import UserLayout from '../../components/userLayout';

const Dashboard = () => {
  const router = useRouter();

  const [message, setMessage] = useState([]);
  const [page, setPage] = useState(1);
  const [serverPage, setServerPage] = useState(1);

  const [activeNav, setActiveNav] = React.useState(1);
  const [chartExample1Data, setChartExample1Data] = React.useState("data1");

  useEffect(() => {
    function getProcess() {
      axios.get(`/api/admin/AddMessagev1?`).then((response) => {
        setMessage(response.data.data);
        setServerPage(response.data.totalPages);
        setPage(page + 1);
      });
    }
    getProcess();
  }, []);

  return (
    <>
      <div style={{ background: "#edd8c4" }}>
        <UserLayout>
          <div className="bg-theme-clr pb-4 pt-3 pt-md-4">
            <Container className="">
              <div className="col text-center text-success mt-5 bg-info">
                <h1>Choose your Process</h1>
              </div>
            </Container>
          </div>
          {message.map((item, i) => {
            return (
              <div key={i}>
                <marquee
                  className="bg-geeen text-light"
                  style={{ fontSize: "30px", fontWeight: "600" }}
                >
                  {item.message}
                </marquee>
              </div>
            );
          })}

          <Container
            style={{
              display: "flex",
              justifyContent: "center",
              justifyContent: "space-between",
            }}
          >
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
