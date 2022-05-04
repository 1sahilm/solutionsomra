import React, { useState,useRef,useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/router'
import { useSession ,getSession} from "next-auth/client";

import { ToastContainer, toast } from 'react-toastify';






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
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  
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
import Layout from "../../components/Layout";




function Agency_User () {
  
  const [name,setName]=useState('')
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone,setPhone] =useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [valid, setValid] = useState(false);

  const toastrRef = useRef(); //init toastr ref
  const [count, setCount] = useState(0);
  const [toasterData, setToasterData] = useState({
    position: 'topEnd',
    status: 'Primary',
    duration: 5000,
    hasIcon: true,
    destroyByClick: true,
    preventDuplicates: false,
  });

 const router=useRouter()
  const[session,loading] = useSession();
  
  // useEffect(()=>{
  //   if(!session?.user?.isSuperAdmin){
  //     router.push("/admin/dashboard")
  //   }
  // },[session])


  useEffect(() => {
    if (password === confirmPassword) {
      setValid(true);
      console.log(password, confirmPassword);
    } else {
      setValid(false);
    }
  }, [password, confirmPassword]);

  const onCheckbox = () => {
    setChecked(!checked);
  };

  console.log(checked)

  const handleNewAdmin = async (e) => {
   e.preventDefault()
    
    const payload = {
      name,
      username,
      phone,
      password,
      isSuperAdmin: checked,
    };
    try {
      await axios.post('/api/user/create', payload).then(async (response) => {
       

        if (response.data.success) {
          setCount(count + 1);
         
          toast("user Created")
        } else {
          setCount(count + 1);
          toast("someThing Wrong")
        }
      });
    } catch (err) {
      setCount(count + 1);
      toast(response?.data?.data)
    }
    
    router.reload(`/`)
  };

 

  return (
    <>
    <Layout>
      <ToastContainer/>
         {/* <Header /> */}
         <div>
         <div className="bg-theme-clr pb-4 pt-md-4">
         
             

         <Container className="DataListHeading" onClick={()=>toast('created')}>
             <div className="col text-center text-white">
                 <h1 className="">Admin Panel  For Creating User</h1>
             </div>
         </Container>
         </div>
         <div>
         <Container style={{backgroundColor:"#996633"}}>
         <Col lg="12" md="6" className="mt-4">
        <Card className="DataListHeading">
          <CardBody className="px-lg-5 py-lg-5 mt-0" style={{backgroundColor:"#fff2e6"}}>
            <div className="text-center text-muted mb-4">
              <h2 style={{color:"#000"}}>Create User</h2>
            </div>
            <Form role="form" className="new-group-frm" >
              <FormGroup >
                <InputGroup className="input-group-alternative mb-3">
                  
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  
                  <Input placeholder="Name" type="text" onChange={(e) => setName(e.target.value)} />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  
                  <Input
                    placeholder="Username"
                    type="email"
                    autoComplete="new-email"
                    onChange={(e) => setUsername(e.target.value)}
                    
                  />
                </InputGroup>
                </FormGroup>
                <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                 
                    <InputGroupText>
                      <i className="ni ni-mobile-button" />
                    </InputGroupText>
                  
                  <Input
                    placeholder="Phone Number"
                    type="number"
                    autoComplete="new-phone"
                    onChange={(e) => setPhone(e.target.value)}
                    
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                 
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    onChange={(e)=>setPassword(e.target.value)}
                  />
                </InputGroup>
              </FormGroup> 
              <Row className="my-4">
                <Col xs="12">
                 
                </Col>
              </Row>
              <div className="text-center">
                <Button className="mt-4" color="primary" type="button" onClick={handleNewAdmin}>
                  Create User
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



export default Agency_User;


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
