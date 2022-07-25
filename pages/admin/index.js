import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  Container,
  Table,
} from 'reactstrap';

import Layout from '../../components/Layout';

function TaskList() {
    
    const router=useRouter();


 


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
  const [page,setPage] =useState(1)
  const[taskValue,setTaskValue] = useState();
  
 
  const [serverPage,setServerPage] = useState(1);
  

  const [showTaskModel , setShowTaskModel] = useState(false);
  const [modelUser,setModelUser] = useState({});
  const [modelTaskInput,setModelTaskInput] = useState("");

  useEffect(()=>{
    setModelTaskInput(modelUser?.task)
  },[modelUser])
  
  const handleTaskUpdate = async () =>
  {
    await axios.patch(`/api/user/update/${modelUser?._id}`,{task:modelTaskInput}).then(async()=>{
     await refreshUsers();
     setShowTaskModel(!showTaskModel);

    })
    
  }

  async function getUsers() {
    await axios.get(`/api/user?page=${page}&limit=200`).then((response) => {
       setUsers(response.data.data);
       setServerPage(response.data.totalPages);
       setPage(page + 1);
     });
   }

   async function refreshUsers() {
    await axios.get(`/api/user?page=${page -1}&limit=200`).then((response) => {
       setUsers(response.data.data);
       setServerPage(response.data.totalPages);
   
     });
   }


  //Next API For Beds start type

  useEffect(async () => {
    
   await getUsers();
  }, []);



  console.log(users);

  const loadNextPage = async () => {

    axios.get(`/api/user?page=${page}&limit=200`).then((response) => {

      setUsers((prevData)=>[...prevData, ...response.data.data]);
      setServerPage(response.data.totalPages);
      setPage(page + 1);
    });
  };

  const deleteuser = (id) => {
    axios.delete(`/api/user/delete/${id}`).then((response) => {
      console.log(response);
      
    });
  };
  





    //=======================================================================================================
    return(
        <>
        <Layout>
         {/* <Header /> */}
         <div className="bg-theme-clr pb-4 pt-3 pt-md-4">
         
             

         <Container className="" style={{backgroundColor:"#ffcc99"}}>
             <div className="col text-center text-white">
                 <h1>User List</h1>
             </div>
         </Container>
         </div>
         
        <Container>
        {!users ? (
            <h1>Loading</h1>
          ) : (
            users?.map((user) => {
              console.log(user.isSuperAdmin);
            
              return (
                <Card key={user._id}>
                  <header>ID=({user._id})</header>
                  <CardBody>
                    <Table>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>UserName</th>
                          <th>
                               Created At</th>
                          <th> Target</th>
                          <th> Last Month Target</th>
                        
                        </tr>
                        
                      </thead>
                      <tbody>
                        <tr>
                     
                  <td> {user.name}</td>
                  <td> {user.username}</td>
                    
                    <td>{user.timestamp}</td> 
                    
                    
                    <td> {user.task }</td>
                    <td>{"0"}</td>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Button
                        fullWidth
                        appearance="hero"
                        status="Primary"
                        style={{ maxWidth: '45%' }}
                        onClick={() => router.push(`/admin/create_agency/allusersdata?username=${user.name}`)}
                      >
                     view report
                      </Button>

                      
                      <Button
                        fullWidth
                        appearance="hero"
                        status="Danger"
                        style={{ maxWidth: '45%' }}
                        onClick={()=> {setShowTaskModel(!showTaskModel)
                          setModelUser(user)
                        }
                        }
                      >
                        Add Target
                      </Button>
                      
                    </div>
                    </tr>
                    </tbody>
                    </Table>
                  </CardBody>
                </Card>
             );
            })
          )}
{console.log(showTaskModel)}

          <div style={{display:showTaskModel? "flex":"none",alignItems:"center" ,background:"rgba(0,0,0,0.3)", justifyContent:"center" , minHeight:"100vh" , width:"100vw",position:"fixed",top:0,left:0 }}> 
          <div style={{background:"white" ,minWidth:"400px",minHeight:300 , display:"flex" , flexDirection:"column" , alignItems:"stretch" ,justifyContent:"center",borderRadius:20,padding:20}} >
          <input type="number" style={{width:"100%" , margin:"10px  0"}} value={modelTaskInput} onChange={(e)=> setModelTaskInput(e.target.value)}  />
          <Button style={{width:"100%" , margin:"10px  0"}} onClick={handleTaskUpdate}>Submit</Button>
                    <Button  style={{width:"100%" , margin:"10px  0"}} onClick={()=> setShowTaskModel(!showTaskModel)}>close</Button>

                    </div>
          </div>

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
