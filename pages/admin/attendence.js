import React, { useState,useRef,useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/router'






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


function UserAttendence() {
    
    const router=useRouter();
    const req=router.query




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
  const [s1data,setS1data]=useState([])
  const currentMonth=new Date().getMonth()+1

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


const {target_left,agentId}=req

  // for target Left==================
  useEffect(async () => {
    async function getS1Data() {
    await  axios.get(`/api/userForm/process/s1-process/oldcode?`).then((response) => {
        const allusers = response.data.data
        // allusers.map((user)=>{
        //   user.status=false;
        // })

        // console.log(allusers)

        setS1data(allusers);
        setServerPage(response.data.totalPages);
        setPage(page + 1);
        
      });
    }
   await getS1Data();
  }, []);
// console.log(s1data.map(item=>item._id[0]))
const [presentUsers,setPresentUsers] = useState([])
const [current_Month_presentUsers,setCurrent_Month_presentUsers]=useState([])
console.log(s1data)

const current_Month_s1Data=s1data.filter(item=>(parseInt(item._id[0].slice(5,7))==currentMonth)?item:'')
const last_Month_s1Data=s1data.filter(item=>(parseInt(item._id[0].slice(5,7))==currentMonth-1)?item:'')


// const byDate=s1data[0]._id[0].slice(5,7)
// console.log(parseInt(byDate))
console.log(currentMonth)
console.log(current_Month_s1Data)
console.log(last_Month_s1Data)


// previous Month S1 Users Present Data
useEffect(()=>{

  const array =[]
  last_Month_s1Data.map((item)=> {
  const temp =  item.data;
  array.push(...temp)

const counts = {};
array.forEach((x) => {
  counts[x] = (counts[x] || 0) + 1;
});
 setPresentUsers(counts)
//  console.log(counts)
})},[last_Month_s1Data])

// for current Month==============================

useEffect(()=>{

  const array =[]
  current_Month_s1Data.map((item)=> {
  const temp =  item.data;
  array.push(...temp)

const counts = {};
array.forEach((x) => {
  counts[x] = (counts[x] || 0) + 1;
});
setCurrent_Month_presentUsers(counts)
//  console.log(counts)
})},[current_Month_s1Data])

// console.log([presentUsers].map(item=>Object.keys(item)))





  // console.log([...new Set(s1data)])

  // const filterData=s1data.filter((v,i,a)=>a.findIndex(v2=>['agentId','name','date'].every(k=>v2[k] ===v[k]))===i)
  // console.log(filterData)


 
 

  const test2=data2.map((test)=>test)
  // s1 for attendence
  useEffect(async () => {
    async function getData() {
    await  axios.get(`/api/admin/agency/details?`).then((response) => {
        const allusers = response.data.data
        // allusers.map((user)=>{
        //   user.status=false;
        // })

        // console.log(allusers)

        setData2(allusers);
        setServerPage(response.data.totalPages);
        setPage(page + 1);
        
      });
    }
   await getData();
  }, []);



  
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
const previousMonth=new Date().getMonth()
// const currentMonth=new Date().getMonth()+1



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
     
       
      
        
        <th>V1LastMonth</th>
        <th>V1This Month</th>
        <th>S1 lastMonth</th>
        <th>S1 currentMonth</th>
        <th>LastMonth working days</th>
        <th>Current Month working days</th>

        
       
     </tr>
  </thead>
  <tbody>
  {!users ? (
            <h1>Loading</h1>
          ) : (
            users?.map((user,index) => {
              // console.log(user?._id)
            //   console.log(user._id)

            // for last Month s1 attendence
          const amit1= Object.entries(presentUsers).map(item=>item)
            // console.log(presentUsers)
            const amit2=amit1.filter(item=>item[0]==user.name?item:0)
            const amit3=amit2.map(item=>item[1])
            // console.log(amit3[0])

            // current Month attendence
            const s1_currentData= Object.entries(current_Month_presentUsers).map(item=>item)
           
            const s1_currentData1=s1_currentData.filter(item=>item[0]==user.name?item:0)
            const s1_currentData2=s1_currentData1.map(item=>item[1])

            // s1 users Filter
            const s1_users=Object.entries(presentUsers).filter(item=>{
              if( item==user.name ){
                const item2=Object.values(presentUsers)
                return item2
              }
            })
            
              
              
              

              let test=data2.filter((item)=>{
               if( item.agentId==user._id ){
                 return item
               }
              })
              // const 
              
              // console.log(test.map(item=>parseInt(item.date.slice(5,7))))
              // console.log(currentMonth-1)
              const test21=s1data.filter(item=>(parseInt(item._id[0].slice(5,7))==currentMonth)?item:'')
              const test22=test21.map(it=>it.data)

              const lastMonth=test.filter(item=>(parseInt(item.date.slice(5,7))==currentMonth-1))
              const Target_item=lastMonth? lastMonth[lastMonth.length-1]:null;
              const thisMonth=test.filter(item=>(parseInt(item.date.slice(5,7))==currentMonth))
              const Target_item_current_month=thisMonth? thisMonth[thisMonth.length-1]:null;
              // console.log(thisMonth.length)
              // console.log(lastMonth.length)
            //   console.log(parseInt(test3.date)==currentMonth)
            //   console.log(test3)
           
            
              
        return(
        <tr key={index}>
     <td>{index+1}.</td>
      <td>{user?.name}</td>
      <td>{user?.username}</td>


      {/* <td ><button onClick={()=>HandleActivate(user?._id) } >{user.status?<span style={{color:"green"}}>Activated</span>:<span style={{color:"red"}}>Activate</span>}</button></td>
       */}

   
      
     
    
      
      {/* <td>{user?.task}</td>
      <td><b style={{color:"green"}}>{Target_item?.target_left}</b></td>

      <td>{Target_item_current_month?.target_left}</td> */}
      <td>{lastMonth.length}</td>
      <td>{thisMonth.length}</td>
      {/* <td>{s1_users}</td> */}
      <td>{amit3[0]?amit3[0]:0}</td>
      <td>{s1_currentData2[0]?s1_currentData2[0]:0}</td>
      <td>{lastMonth.length>amit3?lastMonth.length:amit3}</td>
      <td>{thisMonth.length>s1_currentData2?thisMonth.length:s1_currentData2}</td>
     
      
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



export default UserAttendence;

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




