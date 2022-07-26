import React, { useEffect, useRef, useState } from "react";

import axios from "axios";
import { getSession, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  InputGroup,
  InputGroupText,
  Row,
} from "reactstrap";

import Layout from "../../components/Layout";

function AddMessage() {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [valid, setValid] = useState(false);

  const toastrRef = useRef(); //init toastr ref
  const [count, setCount] = useState(0);
  const [toasterData, setToasterData] = useState({
    position: "topEnd",
    status: "Primary",
    duration: 5000,
    hasIcon: true,
    destroyByClick: true,
    preventDuplicates: false,
  });

  const router = useRouter();
  const [session, loading] = useSession();

  // useEffect(()=>{
  //   if(!session?.user?.isSuperAdmin){
  //     router.push("/admin/dashboard")
  //   }
  // },[session])

  useEffect(() => {
    if (password === confirmPassword) {
      setValid(true);
      
      
    } else {
      setValid(false);
    }
  }, [password, confirmPassword]);

  const onCheckbox = () => {
    setChecked(!checked);
  };

  
  

  const handleNewAdmin = async (e) => {
    e.preventDefault();

    const payload = {
      message,
    };
    try {
      await axios
        .patch(
          `/api/admin/AddMessagev1/update/628a22b811a4d08232f1d4ec`,
          payload
        )
        .then(async (response) => {
          if (response.data.success) {
            setCount(count + 1);

            toast("Text Updated Successfully");
          } else {
            setCount(count + 1);
            toast("someThing Wrong");
          }
        });
    } catch (err) {
     
      
      //   setCount(count + 1);
      //   toast(response?.data?.data)
    }

    router.reload(`/`);
  };

  return (
    <>
      <Layout>
        <ToastContainer />
        {/* <Header /> */}
        <div>
          <div className="bg-theme-clr pb-4 pt-md-4">
            <Container
              className="DataListHeading"
              onClick={() => toast("created")}
            >
              <div className="col text-center text-white">
                <h1 className="">Add One Liner Text</h1>
              </div>
            </Container>
          </div>
          <div>
            <Container style={{ backgroundColor: "#996633" }}>
              <Col lg="12" md="6" className="mt-4">
                <Card className="DataListHeading">
                  <CardBody
                    className="px-lg-5 py-lg-5 mt-0"
                    style={{ backgroundColor: "#fff2e6" }}
                  >
                    <div className="text-center text-muted mb-4">
                      <h2 style={{ color: "grey" }}>Add Marquee Text</h2>
                    </div>
                    <Form role="form" className="new-group-frm">
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupText>
                            <i className="ni ni-hat-3" />
                          </InputGroupText>

                          <textarea
                            placeholder="Enter Text"
                            type="text"
                            rows={4}
                            cols="100"
                            onChange={(e) => setMessage(e.target.value)}
                            style={{
                              border: "DodgerBlue",
                              backgroundColor: "white",
                              color: "blue",
                            }}
                          />
                        </InputGroup>
                      </FormGroup>

                      <Row className="my-4">
                        <Col xs="12"></Col>
                      </Row>
                      <div className="text-center">
                        <Button
                          className="mt-4"
                          color="primary"
                          type="button"
                          onClick={handleNewAdmin}
                        >
                          Update Text
                        </Button>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Container>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default AddMessage;

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
