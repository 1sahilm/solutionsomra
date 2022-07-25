import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import 'react-datepicker/dist/react-datepicker.css';

import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import axios from 'axios';
import dayjs from 'dayjs';
// core components
import {
  getSession,
  useSession,
} from 'next-auth/client';
import { useRouter } from 'next/router';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
// reactstrap components
import {
  Container,
  Row,
} from 'reactstrap';

import { Link } from '@mui/material';

import Layout from '../../../../components/Layout';

const isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
const isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
var isBetween = require("dayjs/plugin/isBetween");
dayjs.extend(isBetween);

function S1Data() {
  const toastrRef = useRef();
  const router = useRouter();

  const [session, loading] = useSession();

  const [count, setCount] = useState(0);

  const [checkbox, setCheckbox] = useState({
    1: false,
    2: false,
    3: false,
  });

  const onChangeCheckbox = (value, name) => {
    setCheckbox({ ...checkbox, [name]: value });
  };

  //VARIABLE INITIALIZATION

  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    from: "",
    to: "",
  });
  

  const [page, setPage] = useState(1);
  const [taskValue, setTaskValue] = useState();
  // const [data,setData]= useState([]);

  const [serverPage, setServerPage] = useState(1);
  const [searchData, setSearchData] = useState([]);

  const [showTaskModel, setShowTaskModel] = useState(false);
  const [modelUser, setModelUser] = useState({});
  const [modelTaskInput, setModelTaskInput] = useState("");
  const [q, setQ] = useState("");
  const [totalData, setTotalData] = useState([]);
  const [filterdata, setFilterdata] = useState();
  const [data2, setData2] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    setModelTaskInput(modelUser?.task);
  }, [modelUser]);

  const handleTaskUpdate = async () => {
    await axios
      .patch(`/api/user/update/${modelUser?._id}`, { task: modelTaskInput })
      .then(() => {
        setShowTaskModel(!showTaskModel);
      });
  };

  ///============================test2 end========

  useEffect(() => {
    function getData() {
      axios.get(`/api/userForm/process/s1-process/oldcode`).then((response) => {
        setTotalData(response.data.data);
        setServerPage(response.data.totalPages);
        setPage(page + 1);
      });
    }

    getData();
  }, []);

  const searchDocuments = async (from, to) => {
    await axios
      .get(
        `/api/userForm/process/s1-process/s1-addprocess?fromDate=${from}&toDate=${to}`
      )
      .then((response) => {
       

        setUsers(response.data.data);
        setServerPage(response.data.totalPages);
        setPage(1);
      });
  };
  useEffect(() => {
    if (fromDate && toDate) {
      searchDocuments(fromDate, toDate);
    }
  }, [fromDate, toDate]);

 

  const loadNextPage = async () => {
    await axios
      .get(
        `/api/userForm/process/s1-process/s1-addprocess?page=${page}&fromDate=${fromDate}&toDate=${toDate}`
      )
      .then((response) => {
        setUsers((prevData) => [...prevData, ...response.data.data]);
        setServerPage(response.data.totalPages);
        setPage(page + 1);
      });
  };

  const deleteuser = (id) => {
    axios.delete(`/api/user/delete/${id}`).then((response) => {
      router.reload(`/`);
    });
  };


  //DAte ===============Start=============Current date============

  const today = new Date();
  const yesterday = new Date(Date.parse(today) - 86400000);
  let year = yesterday.getFullYear();
  let month = yesterday.getMonth() + 1;
  let dt = yesterday.getDate();

  if (dt < 10) {
    dt = "0" + dt;
  }
  if (month < 10) {
    month = "0" + month;
  }

  //22-04-22
  //21,04
  const dateString = year + "-" + month + "-" + dt;

  // today
  let month1 = today.getMonth() + 1;
  let dt1 = today.getDate();

  if (dt1 < 10) {
    dt1 = "0" + dt1;
  }
  if (month1 < 10) {
    month1 = "0" + month1;
  }
  // const current_date=dt1 + "-" + month1 + "-" + today.getFullYear();
  const current_date = today.getFullYear() + "-" + month1 + "-" + dt1;
  const endDAte = today.getFullYear() + "-" + month1 + "-" + dt1;

  const [date, setDate] = useState(current_date);

  const [activeDate, setActiveDate] = useState(current_date);

  const handleFilterDate = (date, field) => {
   
  };

  // ===================the search result=========Start Filter by Date
  const [currentDate, setCurrentDate] = useState("");

  const filter = (e) => {
    const keyword = e.target.value;

    setDate(keyword);
  };

  // ===================End=========>>> Filter by Date====

  const curr_date = (e) => setActiveDate(e.target.value);

  // ================== Total =======


  

  //=======================================================================================================
  return (
    <>
      <Layout>
        {/* <Header /> */}
        <div className="bg-theme-clr pb-4 pt-3 pt-md-4">
          <Container
            className=""
            style={{
              backgroundColor: "#ffcc99",
              marginLeft: "20px",
              width: "2000",
            }}
          >
            <div className="col text-center text-white mt-5">
              <h1>S1 Reports</h1>
            </div>
          </Container>
          <div style={{ display: "", flexDirection: "" }}>
            <Row>
              {/* <Col lg="3" style={{backgroundColor:"#d2d9d4" ,color:"white"}}><h1>Total Done:{test.length}</h1></Col><Col lg="6"></Col><Col lg="3" style={{backgroundColor:"#d2d9d4" ,color:"white"}}><h2>left:{60004-test.length}</h2> </Col> */}
            </Row>
          </div>
        </div>

        <div
          className="md-form mt-0 search-box "
          style={{ backgroundColor: "#edd8c4" }}
        >
          <div style={{ padding: "5px 20px 0px" }}>
            <div className="col-sm-2 my-2 ">
              <label htmlFor="startDate">From</label>
              <input
                type="date"
                style={{ backgroundColor: "#e4f2f1" }}
                className="form-control"
                id="startDate"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
            <div className="col-sm-2 my-2">
              <label htmlFor="endDate">To</label>
              <input
                type="date"
                style={{ backgroundColor: "#e4f2f1" }}
                className="form-control"
                id="endDate"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
          </div>
          <div></div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <ReactHTMLTableToExcel
            className="btn btn-info"
            table="dtBasicExample"
            filename="ReportExcel"
            sheet="Sheet"
            buttonText="Export excel"
          />

          <button
            style={{ display: "flex", backgroundColor: "grey", color: "white" }}
          >
            <Link href="/api/userForm/process/s1-process/downloads1?type=daily">
              <a style={{ color: "whitesmoke" }}>Today Reports</a>
            </Link>
          </button>
          <button>
            {" "}
            <Link href="/api/userForm/process/s1-process/downloads1?type=yesterday">
              <a>Yesterday Reports</a>
            </Link>
          </button>
          <button>
            <Link href="/api/userForm/process/s1-process/downloads1?type=weekly">
              <a>weekly Reports</a>
            </Link>
          </button>
          {/* <button><Link href="/api/userForm/process/s1-process/downloads1?type=monthly"><a >monthly Reports</a></Link></button>  */}
        </div>
        <div>Filter data:{users.length}</div>

        <div className="table-responsive">
          <table
            id="dtBasicExample"
            className="table table-striped table-bordered table-sm"
            cellSpacing="0"
            width="100%"
          >
            <thead className="bg-secondary text-white p-3 mt-2 text-center">
              <tr>
                <th className="th-sm" style={{ width: "10px", height: "10px" }}>
                  s. no
                </th>
                <th className="th-sm">
                  <b>Agent Name</b>
                </th>

                <th className="th-sm">
                  <b>Brand</b>
                </th>

                <th className="th-sm">
                  <b>Date</b>
                </th>

                <th className="th-sm">
                  <b>SID:</b>
                </th>
                <th className="th-sm">
                  <b>SID2:</b>
                </th>
                <th className="th-sm">DocID</th>
                <th className="th-sm" style={{ width: "15px", height: "10px" }}>
                  <b>Company Name</b>
                </th>
                <th className="th-sm" style={{ width: "10px", height: "15px" }}>
                  <b>Product Url</b>
                </th>
                <th className="th-sm" style={{ width: "10px", height: "15px" }}>
                  <b>Lot Type</b>
                </th>
                <th className="th-sm" style={{ width: "10px", height: "15px" }}>
                  <b>Contractor_Name</b>
                </th>
                <th className="th-sm" style={{ width: "10px", height: "15px" }}>
                  <b>Priority_Flag</b>
                </th>

                <th className="th-sm" style={{ width: "10px", height: "15px" }}>
                  <b>mapping Flag</b>
                </th>
                <th className="th-sm" style={{ width: "10px", height: "15px" }}>
                  <b>no_of_Search</b>
                </th>

                <th className="th-sm" style={{ width: "10px", height: "15px" }}>
                  <b>sent_For_Sourcing</b>
                </th>

                <th className="th-sm" style={{ width: "10px", height: "15px" }}>
                  <b>source_flag</b>
                </th>

                <th className="th-sm" style={{ backgroundColor: "navy" }}>
                  <b>Found On JD</b>
                </th>

                <th className="th-sm" style={{ backgroundColor: "navy" }}>
                  {" "}
                  <b>JD Product Link</b>
                </th>
                <th className="th-sm" style={{ backgroundColor: "navy" }}>
                  <b>Found On Brand</b>
                </th>
                <th className="th-sm" style={{ backgroundColor: "navy" }}>
                  <b>Brand Site Product Link</b>
                </th>
                <th className="th-sm" style={{ backgroundColor: "navy" }}>
                  <b>Standard Product Name</b>
                </th>
                <th className="th-sm" style={{ backgroundColor: "navy" }}>
                  <b>Remark</b>
                </th>
                <th className="th-sm" style={{ backgroundColor: "navy" }}>
                  <b>Total Submission</b>
                </th>
                <th className="th-sm" style={{ backgroundColor: "navy" }}>
                  <b>Till Date Submission</b>
                </th>
              </tr>
            </thead>
            <tbody>
              {!users ? (
                <h1>loaading</h1>
              ) : (
                users?.map((user, index) => {
                  

                  let month_till_approved = 0;
                  month_till_approved =
                    month_till_approved +
                    user.total_number_product_approved_today;
                  let til_date_product = 0;
                  til_date_product =
                    til_date_product + user.total_number_product_created_today;

                  return (
                    <tr key={index}>
                      <td>{index + 1}.</td>

                      <td>{user?.agentId}</td>
                      <td>{user?.brand_name}</td>
                      {/* <td>{user?.timestamp?.slice(0,10)}</td> */}
                      {user?.createdAt.slice(0, 10)}

                      <td>{user?.s_id}</td>
                      <td>{user?.SID1}</td>

                      <td>{user?.doc_id}</td>
                      <td>{user?.company_name}</td>
                      <td>{user?.product_url}</td>
                      <td>{user?.Lot_type}</td>
                      <td>{"OMRA"}</td>
                      <td>{1}</td>
                      <td>{0}</td>
                      <td>{""}</td>
                      <td>{0}</td>
                      <td>{1}</td>

                      <td>{user?.found_on_jd}</td>
                      <td>{user?.jd_productLink}</td>
                      <td>{user?.found_on_brandSite}</td>
                      <td>{user?.brandSite_productLink}</td>
                      <td>{user?.standard_product_name}</td>
                      <td>{user?.remark}</td>
                      <td>{user?.today_total_submission}</td>
                      <td>{user?.till_date_submission}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <div>
          <button onClick={loadNextPage}>Load More</button>
          {/* <button onClick={searchDocuments}>loading</button> */}
        </div>
      </Layout>
    </>
  );
}

export default S1Data;

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
