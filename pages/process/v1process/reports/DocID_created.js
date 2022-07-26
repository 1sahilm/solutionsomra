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

let fromDate = "";
let toDate = "";

function CreatedData(props) {
  const toastrRef = useRef();
  const router = useRouter();

  const session = props.session;

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

  const [serverPage, setServerPage] = useState(1);
  const [searchData, setSearchData] = useState([]);

  const [showTaskModel, setShowTaskModel] = useState(false);
  const [modelUser, setModelUser] = useState({});
  const [modelTaskInput, setModelTaskInput] = useState("");
  const [q, setQ] = useState("");

 



  const searchDocuments = async (from, to) => {
   
    await axios
      .get(`/api/admin/agency/v1statusReport?fromDate=${from}&toDate=${to}`)
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

  

  // ===================End=========>>> Filter by Date====

  const curr_date = (e) => setActiveDate(e.target.value);

 

  //=======================================================================================================
  return (
    <>
      <Layout>
      
        <div className="bg-theme-clr pb-4 pt-3 pt-md-4">
          <Container
            className="col text-center mt-5 pt-10 bg-secondary"
            style={{ backgroundColor: "#ffcc99" }}
          >
            <div className="col text-center text-white">
              <h1> DocId Crated Reports</h1>
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
            filename="CreatedIdV1Report"
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
                  <b>Update Status</b>
                </th>
              </tr>
            </thead>
            <tbody>
              {!users ? (
                <h1>loaading</h1>
              ) : (
                users?.map((user, index) => {
                  return (
                    <>
                      {user?.inputList.map((item, index) => {
                       
                        return (
                          <tr key={index}>
                            <td>{index + 1}.</td>
                            <td className="th-sm">{user?.name}</td>
                            <td className="sm">{item.docId}</td>
                            <td className="sm">{user?.date.slice(0, 10)}</td>
                            <td className="sm">{item.bussiness_name}</td>
                            <td className="sm">{item.bussiness_number}</td>
                            <td className="sm">{item.update_status}</td>
                           
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

export default CreatedData;

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
