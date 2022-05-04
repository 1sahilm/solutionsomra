import React, { useState,useRef,useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/router'

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file


import ReactHTMLTableToExcel from "react-html-table-to-excel"; 


import dayjs from "dayjs";
const isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
const isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
var isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween)



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

import "react-datepicker/dist/react-datepicker.css";
import Layout from "../../../../components/Layout";



let fromDate="";
let toDate ="";

function StatusData() {
    const toastrRef = useRef();
    const router=useRouter();


    const[session,loading] = useSession();
  
  // useEffect(()=>{
  //   if(!session?.user?.isSuperAdmin==true){
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
  const [filters, setFilters] = useState({
    from: "",
    to: "",
  });
  // const [date,setDate] = useState('');
  

  const [page,setPage] =useState(1)
  const[taskValue,setTaskValue] = useState();
  const [data,setData]= useState([]);
  
 
  const [serverPage,setServerPage] = useState(1);
  const [searchData, setSearchData] = useState([]);

  const [monthly_target_assign, setMonthly_target_assign] = useState('');
  const [monthly_base_target_assign,setMonthly_base_target_assign]=useState('')
  const [monthly_target_done, setMonthly_target_done] = useState('');
  const [valid_date,setValid_date]=useState('');
  const [category, setCategory] = useState('');
  const [tasks,setTasks]= useState('');

  const [showTaskModel , setShowTaskModel] = useState(false);
  const [modelUser,setModelUser] = useState({});
  const [modelTaskInput,setModelTaskInput] = useState("");
  const [q,setQ]=useState('');
  const [totalCreatedReport,setTotalCreatedReport]=useState()
 
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
  
  useEffect(() => {
    
    function getUsers() {
      axios.get(`/api/admin/agency/agency_data?search=${users?.date}`).then((response) => {
        console.log(count+1)
        setTotalCreatedReport(response.data.data.length)
          
        setUsers(response.data.data);
        setServerPage(response.data.totalPages);
        setPage(page + 1);
      });
    }
   
    getUsers();
    
  }, []);

  console.log(users.length)
  console.log(totalCreatedReport)

 

  const loadNextPage = async () => {

    axios.get(`/api/user?page=${page}&limit=20`).then((response) => {

      setUsers((prevData)=>[...prevData, ...response.data.data]);
      setServerPage(response.data.totalPages);
      setPage(page + 1);
    });
  };

  const deleteuser = (id) => {
    axios.delete(`/api/user/delete/${id}`).then((response) => {
      
      router.reload();
    });
  };



 

//DAte ===============Start=============Current date============


const today= new Date();
const yesterday = new Date(Date.parse(today)-86400000)
let year = yesterday.getFullYear();
let month = yesterday.getMonth()+1;
let dt = yesterday.getDate();


if (dt < 10) {
   dt = '0' + dt;
}
if (month < 10) {
  month = '0' + month;
}
const dateString = year + "-" + month+ "-" + dt;

// today
let month1 = today.getMonth()+1;
let dt1 = today.getDate();

if (dt1 < 10) {
  dt1 = '0' + dt1;
}
if ( month1 < 10) {
 month1 = '0' + month1;
}
// const current_date=dt1 + "-" + month1 + "-" + today.getFullYear();
const current_date=today.getFullYear() + "-" + month1 + "-" + dt1;
const endDAte=today.getFullYear() + "-" + month1 + "-" + dt1;


const [date,setDate] = useState(current_date);






const [activeDate,setActiveDate]=useState(current_date)
/// DAte picker range=================
// var startDate = new Date();
// var endDate = new Date("2015-08-12");

// const resultProductData = users.filter(a => {
//   var date = new Date(a.date);
//   return (date >= startDate && date <= endDate);
// });


//=============== End =============Current date============
// const handleFilterDate = (date, field) => {
//   const filteredData = users.filter((item) => {
//     if (field === "from" && dayjs(item.date).isSameOrAfter(dayjs(date))) {
//       return item;
//     }
//     // else if (field === "to" && dayjs(item.date).isSameOrBefore(dayjs(date))) {
//     //   return item;
//     // }
  
//   });

//   setSearchData(filteredData);
// };
const handleFilterDate = (date, field) => {
  
  const fromDateUnix = fromDate? Math.floor(new Date(fromDate).getTime() / 1000):""
  const toDateUnix = toDate? Math.floor(new Date(toDate).getTime() / 1000):""
  

  const filteredArray = [];


  if(toDate&&fromDate){
    users.map((user)=>{
    const UserUnix = Math.floor(new Date(user.date).getTime() / 1000)

    

    if(fromDateUnix<=UserUnix && toDateUnix>=UserUnix){
      filteredArray.push(user)
    }
    })

    

  }
  else if (fromDate){
    users.map((user)=>{
      const UserUnix = Math.floor(new Date(user.date).getTime() / 1000)
      const TodayUnix = Math.floor(new Date().getTime() / 1000)

  
      if(fromDateUnix<=UserUnix && TodayUnix>=UserUnix){
        filteredArray.push(user)
      }
      })
  
      
  
    
  }
    else if (toDate){
    users.map((user)=>{
        filteredArray.push(user)
      })
  
  }
  
  
  // const filteredData = users.filter((item) => {
  //   if (field === "from" && dayjs(item.date).isSameOrAfter(dayjs(date))) {
  //     return item;
  //   }
  //   // else if (field === "to" && dayjs(item.date).isSameOrBefore(dayjs(date))) {
  //   //   return item;
  //   // }
  
  // });

 

  setSearchData(filteredArray);
};

 






const handleInput = (field,value)  => {
  


  switch (field) {
    case "from":
      fromDate = value;
      handleFilterDate(value, "from");
      break;
    case "to":
      toDate = value;
      handleFilterDate(value, "to");
      break;
    default:
      break;
  }
};



  

  // ===================the search result=========Start Filter by Date
  const [currentDate,setCurrentDate] = useState("");

  
  
  const filter = (e) => {
    const keyword = e.target.value;
  
  

    setDate(keyword)

  
  };

  const filterByDate=(keyword)=>{
    

    if (keyword != '') {
      
      const results = users.filter((user) => {
        return user.date.toString().startsWith(keyword.toString());
        // return user.date.toString().startsWith(keyword.toString())
        // Use the toLowerCase() method to make it case-insensitive
      });
      setSearchData(results);
    } else {
      setSearchData(users);
      // If the text field is empty, show all users
    }
  }

  useEffect(()=>{
    filterByDate(date);
  },[date,users])

  
  // ===================End=========>>> Filter by Date====



  const curr_date=e=>setActiveDate(e.target.value)

// ================== Total =======
const total1 = users.map((item) =>
item.name == session?.user?.isSuperAdmin==false ||session?.user?.name
  ? parseInt(item.total_number_product_created_today)
  : 0
);

const total_product_till_date = total1.reduce((prev, curr) => prev + curr, 0);
console.log(total_product_till_date);


  const total3 = users.map((item) =>
  item.name == session?.user?.name
    ? parseInt(item.total_approval_done_today)
    : 0
);

const total_product_appr = total3.reduce((prev, curr) => prev + curr, 0);
console.log(total_product_appr);






    //=======================================================================================================
    return(
        <>
        <Layout >
         {/* <Header /> */}
         <div className="bg-theme-clr pb-4 pt-3 pt-md-4">
         
             

         <Container className="col text-center mt-5 pt-10 bg-secondary">
             <div className="col text-center text-white">
                 <h1> Status Reports</h1>
             </div>
         </Container>
         </div>

         <div className="md-form mt-0 search-box bg-info">
  {/* <input className="form-control" type="date" placeholder="Search" aria-label="Search" style={{width:"15%", border:"1px", borderBlock:"solid",
  borderColor: 'skyBlue', paddingLeft:"20px",marginLeft:"20px" }} value={q} onchange={(e)=>setQ(e.target.value)} />  */}
  {/* <button  className="md-form mt-0" onChange={e=>e.target.value} >Search</button> */}
  {/* <Calendar onChange={onChange} value={value} /> */}
  


<div style={{ padding: "5px 20px 0px  "}}>


<div className="col-sm-3 my-2 ">
        <label htmlFor="startDate">From</label>
        <input
          type="date"
          className="form-control bg-"
          id="startDate"
          onChange={(e)=>handleInput("from",e.target.value)}
        />
      </div>
      <div className="col-sm-3 my-2">
        <label htmlFor="endDate">To</label>
        <input
          type="date"
          className="form-control"
          id="endDate"
          onChange={(e)=>handleInput("to",e.target.value)}
        />
      </div>
     




</div>
<div>

</div>
    
 
</div>
<div>
<ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="btn btn-info"
                    table="dtBasicExample"
                    filename="B-1-report"
                    sheet="tablexls"
                    buttonText="Download as XLS"/> 
</div>
<div><h3><span style={{color:"green"}}>TotalV1 Reports Created=</span><span style={{color:"red"}}>{totalCreatedReport}</span></h3></div>

         
       <div className="table-responsive">
        <table id="dtBasicExample" className="table table-striped table-bordered table-sm" cellSpacing="0" width="100%" >

  <thead className="bg-secondary text-white p-3 mt-2 text-center"> 
    <tr>
        <th className="th-sm" style={{width:"10px" ,height:'10px'}}>s. no
 
        </th>
        <th className="th-sm" ><b>employee name:</b>

        </th>
      
      <th className="th-sm"><b>total number of call</b>

      </th>
      <th className="th-sm">date

     </th>
      <th className="th-sm" style={{width:"15px" ,height:'10px'}}><b>total business connected</b>

      </th>
      <th className="th-sm" style={{width:"10px" ,height:'15px'}}><b>Total document receved</b>

      </th>
      <th className="th-sm"><b>total DC Created</b></th>
    
     
      <th className="th-sm"><b>total DC approved</b></th>
      <th className="th-sm"><b>Target Left</b></th>
      <th className="th-sm"><b>TIl_Date</b></th>
      <th className="th-sm"><b>Month_Approved_till_Date</b></th>
      <th className="th-sm"><b>Achievement(%)</b></th>
     


    </tr>
  </thead>
  <tbody>
 
  {!searchData ? 
   <h1>loaading</h1>
      
  
           : (
            searchData?.map((user,index) => {
              console.log(user?.total_number_product_approved_today)
              
              let month_till_approved=0
               month_till_approved=month_till_approved+user.total_number_product_approved_today
              let til_date_product=0
              til_date_product=til_date_product+user.total_number_product_created_today
              return(
                 
 
  


    <tr key={index}>
        
      <td>{index+1}.</td>
      <td>{user?.name}</td>
    
      <td>{user?.total_no_of_calls}</td>
      
      <td>{user?.date.slice(0,10)}</td>
      
      <td>{user?.total_bussiness_connected}</td>
      <td>{user?.total_docs_received_today}</td>
      <td>{user?.total_catalog_created}
    
     
      
      </td>
     
      <td>{user?.total_approval_done_today }</td>
      <td>{user?.target_left}</td>
      <td>{user?.til_date}</td>
      <td>{user?.Month_Aproved_til_Date}</td>
      <td>{(((user?.Month_Aproved_til_Date)/3500)*100).toFixed(2)+"%"}</td>
      
      
      
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



export default StatusData;


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