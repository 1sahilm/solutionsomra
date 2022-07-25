import React from 'react';

// layout for this page
// core components
import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
// reactstrap components
import { Container } from 'reactstrap';

import Layout from '../../components/Layout';

const Dashboard = () => {
  const router = useRouter();


  
 

  //
  // const [session, loading] = useSession();

  const [activeNav, setActiveNav] = React.useState(1);
  const [chartExample1Data, setChartExample1Data] = React.useState("data1");

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };



  






  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `/api/userForm/process/s1-process/oldcode`
  //       );
  //       console.log(response)
  //       setProcess(response.data);
  //       setError(null);
  //     } catch (err) {
  //       setError(err.message);
  //       setProcess(null);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   getData();
  // }, []);
  

  // const total_sid_done=process?.map((item)=>item.s_id)
  // console.log(total_sid_done)

  // const loadNextPage = async () => {
  //   axios.get(`/api/userForm/process/s1-process/oldcode?page=${page}&limit=20`).then((response) => {
  //     setUsers((prevData) => [...prevData, ...response.data.data]);
  //     setServerPage(response.data.totalPages);
  //     setPage(page=>page + 1);
  //   });
  // };

  // const deleteuser = (id) => {
  //   axios.delete(`/api/process/delete/${id}`).then((response) => {
      
  //     router.reload();
  //   });
  // };

  // useEffect(() => {
  //   async  function getProcess1() {
  //     await  axios.get(`/api/userForm/process/s1-process/oldcode`).then((response) => {
  //       console.log(response)
  //         setGrandData(response.data.data);
  //         setServerPage(response.data.totalPages);
  //         setPage(page=>page+1);
  //       });
  //     }
  //     getProcess1();
  //   }, []);


    // const total_data=grandData?.map((item)=>item.SID)

    // useEffect(()=>{

    //   if(total_sid_done.length > 0 && total_data.length>0){
  
      
  
    //   const temp = total_data.filter((item)=> total_sid_done.indexOf(item)=== -1)
  
    //   console.log(temp)
    //   setLeftSid(temp)
  
  
    //   }
      
  
    // },[total_sid_done,total_data])

  // useEffect(()=>{
   

  // },[process])
  

  return (
    <>
    <Layout>
      <div className="bg-theme-clr pb-4 pt-3 pt-md-4">
        <Container className="DataListHeading">
          <div className="col text-center text-white">
            <h1>OmraSolutions Process</h1>
          </div>
        </Container>
      </div>

      <Container>
        <h1>Dashboard</h1>
        
        

{/*  */}
      </Container>
      </Layout>
    </>
  );
};

export default Dashboard;

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
