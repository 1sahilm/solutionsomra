import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
// core components
import {
  getSession,
  useSession,
} from 'next-auth/client';
import { useRouter } from 'next/router';
// reactstrap components
import { Container } from 'reactstrap';

import Layout from '../../components/Layout';

function UserData() {
    
    const router=useRouter();


    const[session,loading] = useSession();
  
//   useEffect(()=>{
//     if(!session?.user?.isSuperAdmin){
//       router.push("/admin/dashboard")
//     }
//   },[session])
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
  const [page,setPage] =useState(1)
  const[taskValue,setTaskValue] = useState();
  const [data,setData]= useState([]);

  const [user1,setUser1]=useState([])
  
 
  const [serverPage,setServerPage] = useState(1);
  const [monthly_target_assign, setMonthly_target_assign] = useState('');
  const [monthly_base_target_assign,setMonthly_base_target_assign]=useState('')
  const [monthly_target_done, setMonthly_target_done] = useState('');
  const [valid_date,setValid_date]=useState('');
  const [category, setCategory] = useState('');
  const [tasks,setTasks]= useState('');
  const [isActivate,setIsActivate]=useState(session)
  const [userSession,setUserSession]=useState(session);

  const [showTaskModel , setShowTaskModel] = useState(false);
  const [modelUser,setModelUser] = useState({});
  const [modelTaskInput,setModelTaskInput] = useState("");
  const [data2,setData2]=useState([]);

  useEffect(()=>{
    setModelTaskInput(modelUser?.task)
  },[modelUser])
  
  const handleTaskUpdate = async () =>
  {
    await axios.patch(`/api/user/update/${modelUser?._id}`,{task:modelTaskInput}).then(()=>{
      setShowTaskModel(!showTaskModel);
    })
  }

  //Next API For Beds start type

//   const deleteuser = (id) => {
//     axios.delete(`/api/user/delete/${id}`).then((response) => {
//       
//       router.reload();
//     });
//   };

  // Data fetch




  // for target Left==================
  useEffect( () => {
  async  function getData() {
    await axios.get(`/api/admin/agency/details?page=${page}&limit=200`).then((response) => {
        const allusers = response.data.data
        // allusers.map((user)=>{
        //   user.status=false;
        // })

        console.log(allusers)

        setData2(allusers);
        setServerPage(response.data.totalPages);
        setPage(page + 1);
        
      });
    }
  getData();
  }, []);

  console.log(data2)
 
 

  const test2=data2.map((test)=>test)
  // console.log(test2)
  
  // const left_target=data2.m

  
 //============================================================================
  useEffect(async() => {
    async function getUsers() {
      axios.get(`/api/user?page=${page}&limit=200`).then((response) => {
        const allusers = response.data.data
        

        setUsers(allusers);
        setServerPage(response.data.totalPages);
        setPage(page + 1);
        
      });
    }
   await getUsers();
  }, []);





  // console.log(users)

  const loadNextPage = async () => {

    axios.get(`/api/user?page=${page}&limit=200`).then((response) => {

      setUsers((prevData)=>[...prevData, ...response.data.data]);
      setServerPage(response.data.totalPages);
      setPage(page + 1);
    });
  };

  const deleteuser = (id) => {
    axios.delete(`/api/user/delete/${id}`).then((response) => {
      
      router.reload(`/`)
    });
  };


  const [showMe, setShowMe] = useState(false);
  function toggle(){
    setShowMe(!showMe);
  }

      
   
// Activate Toggle
// const [button,setButton]=useState(false)
// function HandleActivate(){
//  setButton(!button)

 

// }
const [button,setButton]=useState(false)
// function HandleActivate(){
//  setButton(!button)

 

// }




/// filter for only end Users
const userFilter=(users)=>{
  return users.isSuperAdmin==false

}
const userss=users.filter(userFilter)

const currentMonth=new Date().getMonth()+1

function HandleActivate(userID){

  setUsers(

    users.map((user)=>{
      if(user?._id==userID){
        console.log({user,userID})
        axios.patch(`/api/user`,{isActive :!user.status,id:user?._id}).then((response) => {
          console.log(response)
        })
          user.status = !user.status;
      }
      return user;
    })

  )
}


   //=======================================================================================================
    return(
        <>
        <Layout>
         {/* <Header /> */}
         <div className="bg-theme-clr pb-4 pt-3 pt-md-4">
         
             

         <Container className="DataListHeading">
             <div className="col text-center text-white">
                 <h1>Employee Details</h1>
             </div>
         </Container>
         </div>
         
       
               
                
       <div className="table-responsive">

    

        <table  id="dtBasicExample" className="table table-striped table-bordered table-sm" cellSpacing="0" width="100%">

  <thead>
    <tr>
        <th className="th-sm" style={{width:"10px" ,height:'10px'}}>s. no

        </th>
        <th className="th-sm" >employee name

        </th>
       
        <th className="th-sm">Employee email ID

        </th>
        <th className="th-sm">Status

</th>
        <th className="th-sm">Monthly Target

        </th>
        <th className="th-sm" style={{backgroundColor:"yellow"}}>Target Left

        </th>
        <th className="th-sm" style={{backgroundColor:"yellow"}}>Target Left(this Month)

</th>
     </tr>
  </thead>
  <tbody>
  {!users ? (
            <h1>Loading</h1>
          ) : (
            users?.map((user,index) => {
              // console.log(user?._id)
              console.log(user._id)

              let test=data2.filter((item)=>{
               if( item.agentId==user._id ){
                 return item
               }
              })
              // test = test? test[test.length-1]:null;
              const lastMonth=test?.filter(item=>(parseInt(item?.date?.slice(5,7))==currentMonth-1))
              const Target_item=lastMonth? lastMonth[lastMonth.length-1]:null;
              const thisMonth=test?.filter(item=>(parseInt(item?.date?.slice(5,7))==currentMonth))
              const Target_item_current_month=thisMonth? thisMonth[thisMonth.length-1]:null;
              console.log(thisMonth.length)
              console.log(lastMonth.length)
            
              
        return(
        <tr key={index}>
     <td>{index+1}.</td>
      <td>{user?.name}</td>
      <td>{user?.username}</td>


      <td ><button onClick={()=>HandleActivate(user?._id) } >{user.status?<span style={{color:"green"}}>Activated</span>:<span style={{color:"red"}}>Activate</span>}</button></td>
      

   
      
     
    
      
      <td>{user?.task}</td>
      <td><b style={{color:"green"}}>{Target_item?.target_left}</b></td>

    <td>{Target_item_current_month?.target_left}</td> 
     
     
      
     </tr>  
  
  
              )
}))}

</tbody>
  
</table>


              
                
                    
                
            

</div>
                
         
</Layout>
            
       
        </>
    );
}



export default UserData;

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



