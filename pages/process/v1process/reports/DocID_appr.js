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
import { getSession } from 'next-auth/client';
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



function ApprovedData() {
  const toastrRef = useRef();
  const router = useRouter();

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
  // const [date,setDate] = useState('');


  const [page, setPage] = useState(1);

  const [serverPage, setServerPage] = useState(1);
  const [searchData, setSearchData] = useState([]);

  useState("");

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [showTaskModel, setShowTaskModel] = useState(false);
  const [modelUser, setModelUser] = useState({});
  const [modelTaskInput, setModelTaskInput] = useState("");
  const [q, setQ] = useState("");

  useEffect(() => {
    setModelTaskInput(modelUser?.task);
  }, [modelUser]);

  // const handleTaskUpdate = async () => {
  //   await axios
  //     .patch(`/api/user/update/${modelUser?._id}`, { task: modelTaskInput })
  //     .then(() => {
  //       setShowTaskModel(!showTaskModel);
  //     });
  // };

  //Next API For Beds start type

  //   const deleteuser = (id) => {
  //     axios.delete(`/api/user/delete/${id}`).then((response) => {
  //
  //       router.reload();
  //     });
  //   };

  // Data fetch
//      old api========================
  // useEffect(() => {
  //   function getUsers() {
  //     axios
  //       .get(`/api/admin/agency/docid_approved?search=${users?.date}`)
  //       .then((response) => {
  //         setUsers(response.data.data);
  //         setServerPage(response.data.totalPages);
  //         setPage(page + 1);
  //       });
  //   }

  //   getUsers();
  // }, []);

  const searchDocuments = async (from, to) => {
    console.log(from,to)
    await axios
      .get(`/api/admin/agency/docid_approved?fromDate=${from}&toDate=${to}`)
      .then((response) => {
        console.log(response.data);

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
        `/api/admin/agency/docid_approved?page=${page}&fromDate=${fromDate}&toDate=${toDate}`
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
  
  const current_date = today.getFullYear() + "-" + month1 + "-" + dt1;
  const endDAte = today.getFullYear() + "-" + month1 + "-" + dt1;

  const [date, setDate] = useState(current_date);

  const [activeDate, setActiveDate] = useState(current_date);


 

  const filter = (e) => {
    const keyword = e.target.value;

    setDate(keyword);
  };

 

  const handleFilterDate = (date, field) => {
    const fromDateUnix = fromDate
      ? Math.floor(new Date(fromDate).getTime() / 1000)
      : "";
    const toDateUnix = toDate
      ? Math.floor(new Date(toDate).getTime() / 1000)
      : "";

    const filteredArray = [];

    if (toDate && fromDate) {
      users.map((user) => {
        const UserUnix = Math.floor(new Date(user.date).getTime() / 1000);

        if (fromDateUnix <= UserUnix && toDateUnix >= UserUnix) {
          filteredArray.push(user);
        }
      });
    } else if (fromDate) {
      users.map((user) => {
        const UserUnix = Math.floor(new Date(user.date).getTime() / 1000);
        const TodayUnix = Math.floor(new Date().getTime() / 1000);

        if (fromDateUnix <= UserUnix && TodayUnix >= UserUnix) {
          filteredArray.push(user);
        }
      });
    } else if (toDate) {
      users.map((user) => {
        filteredArray.push(user);
      });
    }

    setSearchData(filteredArray);
  };
  const handleInput = (field, value) => {
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
  const filterByDate = (keyword) => {
    if (keyword != "") {
      const results = users.filter((user) => {
        return user.date.toString().startsWith(keyword.toString());
        
      });
      setSearchData(results);
    } else {
      setSearchData(users);
      // If the text field is empty, show all users
    }
  };

  useEffect(() => {
    filterByDate(date);
  }, [date, users]);



  // ===================End=========>>> Filter by Date====

  const curr_date = (e) => setActiveDate(e.target.value);

  console.log(searchData);
  console.log("v1data",new Date(fromDate))
  console.log("v1data",toDate)

  //=======================================================================================================
  return (
    <>
      <Layout>
        {/* <Header /> */}
        <div className="bg-theme-clr pb-4 pt-3 pt-md-4">
          <Container
            className="col text-center mt-5 pt-10 bg-secondary"
            style={{ backgroundColor: "#ffcc99" }}
          >
            <div className="col text-center text-white">
              <h1>DocId Approved Reports</h1>
            </div>
          </Container>
        </div>

        <div className="md-form mt-0 search-box bg-info">
          <div style={{ padding: "5px 20px 0px" }}>
            

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
          <div></div>
        </div>

        <div>
          <ReactHTMLTableToExcel
            className="btn btn-info"
            table="dtBasicExample"
            filename="ApprovedV1Report"
            sheet="Sheet"
            buttonText="Export excel"
          />
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
                  <b>Agent name:</b>
                </th>
                <th className="th-sm">
                  <b>doc ID</b>
                </th>
                <th className="th-sm">
                  <b>Date</b>
                </th>

                <th className="th-sm" style={{ width: "15px", height: "10px" }}>
                  <b>Business name</b>
                </th>
                <th className="th-sm" style={{ width: "10px", height: "15px" }}>
                  <b>number of products</b>
                </th>
                <th className="th-sm" style={{ width: "10px", height: "15px" }}>
                  <b>Approved Status</b>
                </th>
              </tr>
            </thead>
            <tbody>
              {!searchData ? (
                <h1>loaading</h1>
              ) : (
                users?.map((user, index) => {
                  return (
                    <>
                      {user?.inputList1.map((item, index) => {
                        console.log(item);
                        return (
                          <tr key={index}>
                            <td>{index + 1}.</td>
                            <td className="th-sm">{user?.name}</td>
                            <td className="sm">{item.docId}</td>
                            <td>{user?.date.slice(0, 10)}</td>
                            <td className="sm">{item.bussiness_name}</td>
                            <td className="sm">{item.bussiness_number}</td>
                            <td className="sm">
                              {item.appr_status}
                              <br />
                            </td>
                          </tr>
                        );
                      })}
                      
                      
                     
                    </>
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

export default ApprovedData;

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
