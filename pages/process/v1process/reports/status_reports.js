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
import { Container } from 'reactstrap';

import Layout from '../../../../components/Layout';

const isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
const isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
var isBetween = require("dayjs/plugin/isBetween");
dayjs.extend(isBetween);

let fromDate = "";
let toDate = "";

function StatusData() {
  const toastrRef = useRef();
  const router = useRouter();

  const [session, loading] = useSession();

  const [count, setCount] = useState(0);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

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
  // const [date,setDate] = useState('');

  const [page, setPage] = useState(1);
  const [taskValue, setTaskValue] = useState();
  const [data, setData] = useState([]);

  const [serverPage, setServerPage] = useState(1);
  const [searchData, setSearchData] = useState([]);

  const [showTaskModel, setShowTaskModel] = useState(false);
  const [modelUser, setModelUser] = useState({});
  const [modelTaskInput, setModelTaskInput] = useState("");
  const [q, setQ] = useState("");
  const [totalCreatedReport, setTotalCreatedReport] = useState();

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

  const searchDocuments = async (from, to) => {
    
    await axios
      .get(`/api/admin/agency/v1statusReport?fromDate=${from}&toDate=${to}`)
      .then((response) => {
       

        setUsers(response.data.data);
        setCount(response.data.count);
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
        `/api/admin/agency/v1statusReport?page=${page+1}&fromDate=${fromDate}&toDate=${toDate}`
      )
      .then((response) => {
        setUsers((prevData) => [...prevData, ...response.data.data]);
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

  // const today = new Date();
  // const yesterday = new Date(Date.parse(today) - 86400000);
  // let year = yesterday.getFullYear();
  // let month = yesterday.getMonth() + 1;
  // let dt = yesterday.getDate();

  // if (dt < 10) {
  //   dt = "0" + dt;
  // }
  // if (month < 10) {
  //   month = "0" + month;
  // }
  // const dateString = year + "-" + month + "-" + dt;

  // // today
  // let month1 = today.getMonth() + 1;
  // let dt1 = today.getDate();

  // if (dt1 < 10) {
  //   dt1 = "0" + dt1;
  // }
  // if (month1 < 10) {
  //   month1 = "0" + month1;
  // }
  // // const current_date=dt1 + "-" + month1 + "-" + today.getFullYear();
  // const current_date = today.getFullYear() + "-" + month1 + "-" + dt1;
  // const endDAte = today.getFullYear() + "-" + month1 + "-" + dt1;

  // const [date, setDate] = useState(current_date);

  // const [activeDate, setActiveDate] = useState(current_date);

  // //=============== End =============Current date============

  // const handleFilterDate = (date, field) => {
  //   const fromDateUnix = fromDate
  //     ? Math.floor(new Date(fromDate).getTime() / 1000)
  //     : "";
  //   const toDateUnix = toDate
  //     ? Math.floor(new Date(toDate).getTime() / 1000)
  //     : "";

  //   const filteredArray = [];

  //   if (toDate && fromDate) {
  //     users.map((user) => {
  //       const UserUnix = Math.floor(new Date(user.date).getTime() / 1000);

  //       if (fromDateUnix <= UserUnix && toDateUnix >= UserUnix) {
  //         filteredArray.push(user);
  //       }
  //     });
  //   } else if (fromDate) {
  //     users.map((user) => {
  //       const UserUnix = Math.floor(new Date(user.date).getTime() / 1000);
  //       const TodayUnix = Math.floor(new Date().getTime() / 1000);

  //       if (fromDateUnix <= UserUnix && TodayUnix >= UserUnix) {
  //         filteredArray.push(user);
  //       }
  //     });
  //   } else if (toDate) {
  //     users.map((user) => {
  //       filteredArray.push(user);
  //     });
  //   }

  //   setSearchData(filteredArray);
  // };

  // const handleInput = (field, value) => {
  //   switch (field) {
  //     case "from":
  //       fromDate = value;
  //       handleFilterDate(value, "from");
  //       break;
  //     case "to":
  //       toDate = value;
  //       handleFilterDate(value, "to");
  //       break;
  //     default:
  //       break;
  //   }
  // };

  // // ===================the search result=========Start Filter by Date
  // const [currentDate, setCurrentDate] = useState("");

  // const filter = (e) => {
  //   const keyword = e.target.value;

  //   setDate(keyword);
  // };

  // const filterByDate = (keyword) => {
  //   if (keyword != "") {
  //     const results = users.filter((user) => {
  //       return user.date.toString().startsWith(keyword.toString());
  //     });
  //     setSearchData(results);
  //   } else {
  //     setSearchData(users);
  //     // If the text field is empty, show all users
  //   }
  // };

  // useEffect(() => {
  //   filterByDate(date);
  // }, [date, users]);

  // // ===================End=========>>> Filter by Date====

  // const curr_date = (e) => setActiveDate(e.target.value);

  // // ================== Total =======
  const total1 = users.map((item) =>
    (item.name == session?.user?.isSuperAdmin) == false || session?.user?.name
      ? parseInt(item.total_number_product_created_today)
      : 0
  );

  const total_product_till_date = total1.reduce((prev, curr) => prev + curr, 0);
  

  const total3 = users.map((item) =>
    item.name == session?.user?.name
      ? parseInt(item.total_approval_done_today)
      : 0
  );

  const total_product_appr = total3.reduce((prev, curr) => prev + curr, 0);
  

  //=======================================================================================================
  return (
    <>
      <Layout>
        {/* <Header /> */}
        <div className="bg-theme-clr pb-4 pt-3 pt-md-4">
          <Container className="col text-center mt-5 pt-10 bg-secondary">
            <div className="col text-center text-white">
              <h1> Status Reports</h1>
            </div>
          </Container>
        </div>

        <div className="md-form mt-0 search-box bg-info">
          <div style={{ padding: "5px 20px 0px  " }}>
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
          </div>
        </div>
        <div>
          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="btn btn-info"
            table="dtBasicExample"
            filename="B-1-report"
            sheet="tablexls"
            buttonText="Download as XLS"
          />
        </div>
        <div>
          <h3>
            <span style={{ color: "green" }}>TotalV1 Reports Created=</span>
            <span style={{ color: "red" }}>{count*(page)}</span>
          </h3>
        </div>

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
                  <b>employee name:</b>
                </th>

                <th className="th-sm">
                  <b>total number of call</b>
                </th>
                <th className="th-sm">date</th>
                <th className="th-sm" style={{ width: "15px", height: "10px" }}>
                  <b>total business connected</b>
                </th>
                <th className="th-sm" style={{ width: "10px", height: "15px" }}>
                  <b>Total document receved</b>
                </th>
                <th className="th-sm">
                  <b>total DC Created</b>
                </th>

                <th className="th-sm">
                  <b>total DC approved</b>
                </th>
                <th className="th-sm">
                  <b>Target Left</b>
                </th>
                <th className="th-sm">
                  <b>TIl_Date</b>
                </th>
                <th className="th-sm">
                  <b>Month_Approved_till_Date</b>
                </th>
                <th className="th-sm">
                  <b>Achievement(%)</b>
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
                      <td>{user?.name}</td>

                      <td>{user?.total_no_of_calls}</td>

                      <td>{user?.date.slice(0, 10)}</td>

                      <td>{user?.total_bussiness_connected}</td>
                      <td>{user?.total_docs_received_today}</td>
                      <td>{user?.total_catalog_created}</td>

                      <td>{user?.total_approval_done_today}</td>
                      <td>{user?.target_left}</td>
                      <td>{user?.til_date}</td>
                      <td>{user?.Month_Aproved_til_Date}</td>
                      <td>
                        {((user?.Month_Aproved_til_Date / 3500) * 100).toFixed(
                          2
                        ) + "%"}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <div>
          <button onClick={loadNextPage}>Load More</button>
          
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
