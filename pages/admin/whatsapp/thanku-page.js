import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import axios from 'axios';
import {
  getSession,
  useSession,
} from 'next-auth/client';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
// reactstrap components
import { Container } from 'reactstrap';

// core components



function Submited_data () {

  const whatsappData = useSelector((state)=> state.whatsapp)
  const {array } = whatsappData;



  
  
  // const [name,setName]=useState('')
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [valid, setValid] = useState(false);
  const [value,setValue]=useState();
  const [total_no_of_calls,setTotal_no_of_calls]=useState('')

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

  const router=useRouter();
 

  const[session,loading] = useSession();
  // useEffect(()=>{
  //   if(!session){
  //     router.push("/auth/login")
  //   }
  // },[session])
  
  const name=router?.query?.value
  const date=router?.query?.value2
  const Total_no_of_calls=router.query.value3
  const Total_Business_Connected=router.query.value4
  const Total_document_Received_Today=router.query.value5
  const Total_Catalouge_Created=router.query.value6

  const Total_Approval_Done_Today=router.query.value8
  
 
  const Monthly_Target_Approved=router.query.value10
  const Monthly_Target_Total_number=router.query.value11
  const My_monthly_base_target_approved=router.query.value12
  const My_monthly_base_target_total_approved=router.query.value13
  const total_number_product_created_today=router.query.value14
  const product_till_date=router.query.value15
  const Month_Aproved_til_Date=router.query.value16
  const total_number_product_approved_today=router.query.value17
  // const title18=router.query.value18
  // const title19=router.query.value19
  // const title20=router.query.value20

  // const mydataArray=[{name:title},{Date:title2},{no_calls:title3},title4,title5,title6,title7,title8].split(",")
 



 



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

 

  const handleNewAdmin = async () => {
    const payload = {
      name,
      username,
      password,
      isSuperAdmin: checked,
    };
    try {
      await axios.post('/api/user/create', payload).then(async (response) => {
        

        if (response.data.success) {
          setCount(count + 1);
          toastrRef.current?.add('SUCCESS', response.data.message, { ...toasterData, status: 'Success' });
        } else {
          setCount(count + 1);
          toastrRef.current?.add('ERROR', response.data.message, { ...toasterData, status: 'Danger' });
        }
      });
    } catch (err) {
      setCount(count + 1);
      toastrRef.current?.add('ERROR', err?.message, { ...toasterData, status: 'Danger' });
    }
  };


  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

 const  openWhatsApp=()=> {  
  // window.open(`https://wa.me/+918210374580?text=${testing});  

  
   
  const htdata=()=>(
    
      <h1>hello</h1>

    
    
  )

  let string = "";
 
  array.map((item,index) =>{
    if (index === 0){
    string = string + `Total Catalouge Created: *${item.length}*  %0a`
    
    }
    else{
      string = string + `*Total Approval Done Today*: *${item.length}*  %0a`

    }
    item.map((i) => {
      string = string + i.docId + " " + i.bussiness_name +" "+ i.bussiness_number + " %0a";
      
    })
    string = string + " %0a %0a %0a %0a %0a %0a"

  })


  const payload = `Name: *${name}* %0a
Date: *${date}* %0a
Total Number Calls: ${Total_no_of_calls} %0a
Total Business Connected: ${Total_Business_Connected} %0a %0a %0a


*Total Number Document received today*: *${Total_document_Received_Today}* %0a %0a %0a
${string}

Your Monthly Target: ${Monthly_Target_Approved} %0a  %0a %0a %a

Your numbers are left from Monthly Target: ${Monthly_Target_Approved-Month_Aproved_til_Date} %0a
Total Number product created today: ${total_number_product_created_today} %0a

*Total approval target*: *${Monthly_Target_Approved}* %0a
*Today Total approval*: *${total_number_product_approved_today}* %0a

*Till date Total approved products*: *${product_till_date}* %0a
  `
  var url = `https://wa.me/+918968140816?text=${payload}`
  
    
    window.open(url, '_blank').focus();
  

  // window.open(`https://wa.me/+918743906997?text=`)
 

  }  

  const changeBackground =(e)=> {
    e.target.style.background = 'red';

    
  }




  return (

    
    <>
         {/* <Header /> */}
         <div className="bg-theme-clr pb-4 pt-md-4">
         
             

         <Container className="">
             <div className="col text-center text-white">
                 <h1 className="">Thanku for Submiting</h1>
             </div>
         </Container>
         </div>
         <Container className="mt-4">
         <table className="table">
  {/* <thead className="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead> */}
  <tbody>
    <tr>
      
      <th scope="row">1</th>
      <th>Name:</th>
      <td>{name}</td>
      <th>Date:</th>
      <td>{date}</td>
      
    </tr>
    <tr>
      
      <th scope="row">2</th>
      <th>Total Number Of Calls:</th>
      <td>{Total_no_of_calls}</td>
      <th>Total Business Connected :</th>
      <td>{Total_Business_Connected}</td>
      
    </tr>
    <tr>
      
      <th scope="row">3</th>
      <th>Total document Received Today:</th>
      <td>{Total_document_Received_Today}</td>
      <th>Total Catalouge Created:</th>
      <td>{Total_Catalouge_Created}</td>
      
    </tr>
    <tr>
      {array[0]?.map((item) =>{
        return(
          <>
          <th scope="row">4</th>
          <th>Doc iD :</th>
          <td>{item?.docId}</td> 
          <th>Business Name:</th>
          <td>{item?.bussiness_name}</td>
          <th>Number:</th>
          <td>{item?.bussiness_number}</td>

          </>
        )
        })}
      
    
      
    </tr>
    <tr>
      
      <th scope="row">5</th>
      <th>Total Approval Done Today :</th>
      <td>{Total_Approval_Done_Today}</td>
      
      
    </tr>

    <tr>
      
    {array[1]?.map((item) =>{
        return(
          <>
          <th scope="row">4</th>
          <th>Doc iD :</th>
          <td>{item?.docId}</td> 
          <th>Business Name:</th>
          <td>{item?.bussiness_name}</td>
          </>
        )
        })}
      
    </tr>
    <tr>
      
      <th scope="row">7</th>
      <th>Monthly Target Approved:</th>
      <td>{Monthly_Target_Approved}</td>
      <th>Target Left:</th>
      <td>{Monthly_Target_Total_number-Monthly_Target_Approved}</td>
      <th>Monthly Target-Total number/ Approved:</th>
      <td>{Monthly_Target_Total_number}</td>
      
    </tr>
    {/* <tr>
      
     
    <th scope="row">8</th>
      <th>Monthly Target Approved:</th>
      <td>{title15}</td>
      <th>Target Left:</th>
      <td>{title16}</td>
      <th>Monthly Target-Total number/ Approved:</th>
      <td>{title17}</td>
      
    </tr> */}
    {/* <tr>
      
     
    <th scope="row">9</th>
      <th>Monthly Base Target Approved:</th>
      <td>{My_monthly_base_target_approved}</td>
      <th>Target Left:</th>
      <td>{My_monthly_base_target_total_approved-My_monthly_base_target_approved}</td>
      <th>Monthly base Target-Total number/ Approved:</th>
      <td>{My_monthly_base_target_total_approved}</td>
      
    </tr> */}

    <tr>
      
     
    <th scope="row">10</th>
      <th>Total Number of Product created Today :</th>
      <td>{total_number_product_created_today}</td>
      <th>Till Date Product :</th>
      <td>{product_till_date}</td>
      <th>Month Aproved til Date :</th>
      <td>{Month_Aproved_til_Date}</td>
      
    </tr>

    <tr>
      
     
    <th scope="row">11</th>
      <th>Total Number Product Approved Today :</th>
      <td>{total_number_product_approved_today}</td>
     
      
    </tr>
  </tbody>
</table>

<table className="table">
  {/* <thead className="thead-light">
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead> */}
  {/* <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody> */}
</table>    
      </Container>
      <h3  align="right"> Share Via whatsapp </h3><img src = "https://image.freepik.com/free-vector/whatsapp-icon-design_23-2147900927.jpg" height="50" width={100} size="100" align="right" onMouseOver={changeBackground} onClick={openWhatsApp}/>  

      
        </>
        
    );
}



export default Submited_data;

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






