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

function UserAttendence() {
  const router = useRouter();
  const req = router.query;

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

  const [page, setPage] = useState(1);

  const [serverPage, setServerPage] = useState(1);

  const [isActivate, setIsActivate] = useState(session);
  const [userSession, setUserSession] = useState(session);

  const [showTaskModel, setShowTaskModel] = useState(false);
  const [modelUser, setModelUser] = useState({});
  const [modelTaskInput, setModelTaskInput] = useState("");
  const [data2, setData2] = useState([]);
  const [s1data, setS1data] = useState([]);
  const [showText, setShowtext] = useState(false);
  const currentMonth = new Date().getMonth() + 1;

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

  const { target_left, agentId } = req;

  // for target Left==================
  useEffect(async () => {
    async function getS1Data() {
      await axios
        .get(`/api/userForm/process/s1-process/oldcode?`)
        .then((response) => {
          const allusers = response.data.data;

          setS1data(allusers);
          setServerPage(response.data.totalPages);
          setPage(page + 1);
        });
    }
    await getS1Data();
  }, []);

  const [presentUsers, setPresentUsers] = useState([]);
  const [current_Month_presentUsers, setCurrent_Month_presentUsers] = useState(
    []
  );

  const current_Month_s1Data = s1data.filter((item) =>
    parseInt(item._id[0].slice(5, 7)) == currentMonth ? item : ""
  );
  const last_Month_s1Data = s1data.filter((item) =>
    parseInt(item._id[0].slice(5, 7)) == currentMonth - 1 ? item : ""
  );

  // previous Month S1 Users Present Data
  useEffect(() => {
    const array = [];
    last_Month_s1Data.map((item) => {
      const temp = item.data;
      array.push(...temp);

      const counts = {};
      array.forEach((x) => {
        counts[x] = (counts[x] || 0) + 1;
      });
      setPresentUsers(counts);
      //  console.log(counts)
    });
  }, [last_Month_s1Data]);

  // for current Month==============================

  useEffect(() => {
    const array = [];
    current_Month_s1Data.map((item) => {
      const temp = item.data;
      array.push(...temp);

      const counts = {};
      array.forEach((x) => {
        counts[x] = (counts[x] || 0) + 1;
      });
      setCurrent_Month_presentUsers(counts);
      //  console.log(counts)
    });
  }, [current_Month_s1Data]);

  const test2 = data2.map((test) => test);
  // s1 for attendence
  useEffect(async () => {
    async function getData() {
      await axios.get(`/api/admin/agency/details?`).then((response) => {
        const allusers = response.data.data;

        setData2(allusers);
        setServerPage(response.data.totalPages);
        setPage(page + 1);
      });
    }
    await getData();
  }, []);

  //============================================================================
  useEffect(async () => {
    async function getUsers() {
      axios.get(`/api/user?page=${page}&limit=200`).then((response) => {
        const allusers = response.data.data;

        setUsers(allusers);
        setServerPage(response.data.totalPages);
        setPage(page + 1);
      });
    }
    await getUsers();
  }, []);

  const loadNextPage = async () => {
    axios.get(`/api/user?page=${page}&limit=200`).then((response) => {
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

  const [showMe, setShowMe] = useState(false);
  function toggle() {
    setShowMe(!showMe);
  }

  const [button, setButton] = useState(false);

  /// filter for only end Users
  const userFilter = (users) => {
    return users.isSuperAdmin == false;
  };
  const userss = users.filter(userFilter);

  const previousMonth = new Date().getMonth();
  // const currentMonth=new Date().getMonth()+1

  const ShowCalender = (e) => {
    e.target.style.background = "red";
    setShowtext(true);
  };
  const HideCalender = (e) => {
    e.target.style.background = "white";
    setShowtext(false);
  };

  //=======================================================================================================
  return (
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
          <table
            id="dtBasicExample"
            className="table table-striped table-bordered table-sm"
            cellSpacing="0"
            width="100%"
          >
            <thead>
              <tr>
                <th className="th-sm" style={{ width: "10px", height: "10px" }}>
                  s. no
                </th>
                <th className="th-sm">employee name</th>

                <th className="th-sm">Employee email ID</th>

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
                users?.map((user, index) => {
                  // for last Month s1 attendence
                  const amit1 = Object.entries(presentUsers).map(
                    (item) => item
                  );
                  // console.log(presentUsers)
                  const amit2 = amit1.filter((item) =>
                    item[0] == user.name ? item : 0
                  );
                  const amit3 = amit2.map((item) => item[1]);
                  // console.log(amit3[0])

                  // current Month attendence
                  const s1_currentData = Object.entries(
                    current_Month_presentUsers
                  ).map((item) => item);

                  const s1_currentData1 = s1_currentData.filter((item) =>
                    item[0] == user.name ? item : 0
                  );
                  const s1_currentData2 = s1_currentData1.map(
                    (item) => item[1]
                  );

                  // s1 users Filter
                  const s1_users = Object.entries(presentUsers).filter(
                    (item) => {
                      if (item == user.name) {
                        const item2 = Object.values(presentUsers);
                        return item2;
                      }
                    }
                  );

                  let test = data2.filter((item) => {
                    if (item.agentId == user._id) {
                      return item;
                    }
                  });

                  const test21 = s1data.filter((item) =>
                    parseInt(item._id[0].slice(5, 7)) == currentMonth
                      ? item
                      : ""
                  );
                  const test22 = test21.map((it) => it.data);

                  const lastMonth = test.filter(
                    (item) =>
                      parseInt(item.date.slice(5, 7)) == currentMonth - 1
                  );
                  const Target_item = lastMonth
                    ? lastMonth[lastMonth.length - 1]
                    : null;
                  const thisMonth = test.filter(
                    (item) => parseInt(item.date.slice(5, 7)) == currentMonth
                  );
                  const Target_item_current_month = thisMonth
                    ? thisMonth[thisMonth.length - 1]
                    : null;

                  return (
                    <tr key={index}>
                      <td>{index + 1}.</td>
                      <td>{user?.name}</td>
                      <td>{user?.username}</td>

                      <td>{lastMonth.length}</td>
                      <td>{thisMonth.length}</td>
                      {/* <td>{s1_users}</td> */}
                      <td>{amit3[0] ? amit3[0] : 0}</td>
                      <td>{s1_currentData2[0] ? s1_currentData2[0] : 0}</td>
                      <td>
                        {lastMonth.length > amit3 ? lastMonth.length : amit3}
                      </td>
                      <td
                        onMouseEnter={ShowCalender}
                        onMouseLeave={HideCalender}
                      >
                        {thisMonth.length > s1_currentData2
                          ? thisMonth.length
                          : s1_currentData2}
                        {showText && (
                          <p style={{ textAlign: "center" }}>
                            Now you can see me!
                          </p>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
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
