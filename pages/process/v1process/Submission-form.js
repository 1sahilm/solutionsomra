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
import { useDispatch } from 'react-redux';
import {
  toast,
  ToastContainer,
} from 'react-toastify';
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Row,
} from 'reactstrap';

import {
  Autocomplete,
  createFilterOptions,
  TextField,
} from '@mui/material';

import UserLayout from '../../../components/userLayout';
import { sendArray } from '../../../state/action';

// core components

function Submission() {
  const dispatch = useDispatch();

  const [session, loading] = useSession();

  const [autoComplete, setAutoComplete] = useState("");
  const OPTIONS_LIMIT = 10;
  const defaultFilterOptions = createFilterOptions();

  const filterOptions = (options, state) => {
    return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
  };

  //VARIABLE INITIALIZATION

  const [name, setName] = useState(session?.user?.name);
  const [agentId, setAgentId] = useState(session?.user?.id);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [serverPage, setServerPage] = useState(1);
  const [total_no_of_calls, setTotal_no_of_calls] = useState("");
  const [monthly_target_assign, setMonthly_target_assign] = useState("");
  const [total_bussiness_connected, setTotal_bussiness_connected] =
    useState("");

  const [total_docs_received_today, setTotal_docs_received_today] =
    useState("");
  const [total_catalog_created, setTotal_catalog_created] = useState("");
  const [My_monthly_target_approved, setMy_monthly_target_approved] = useState(
    session?.user?.task
  );

  const [
    My_monthly_target_Total_approved,
    setMy_monthly_target_Total_approved,
  ] = useState(0);

  const [My_monthly_base_target_approved, setMy_monthly_base_target_approved] =
    useState("");
  const [target_left, setTarget_left] = useState("");

  const [
    My_monthly_base_target_total_approved,
    setMy_monthly_base_target_total_approved,
  ] = useState("");

  const [til_date, setTil_date] = useState("");

  const [total_approval_done_today, setTotal_approval_done_today] =
    useState("No");
  const [
    total_number_product_created_today,
    setTotal_number_product_created_today,
  ] = useState(0);
  const [Month_Aproved_til_Date, setMonth_Aproved_til_Date] = useState("");
  const [
    total_number_product_approved_today,
    setTotal_number_product_approved_today,
  ] = useState(0);

  const [] = useState("");

  const [monthly_target_done, setMonthly_target_done] = useState("");
  const [valid_date, setValid_date] = useState("");
  const [category, setCategory] = useState("");

  const [appr_status, setAppr_status] = useState("");
  const [total_created, setTotal_created] = useState(0);
  const [total_approved, setTotal_approved] = useState(0);
  // const [jsonData,setJsonData]=useState([])

  const [inputList1, setInputList1] = useState([
    {
      docId: "",
      bussiness_name: "",
      bussiness_number: "",
      appr_status: "",
    },
  ]);
  const [inputList, setInputList] = useState([
    { docId: "", bussiness_name: "", bussiness_number: "", update_status: "" },
  ]);

  const [imageList, setImageList] = useState([]);
  const [createObjectURL, setCreateObjectURL] = useState([]);

  // const [inputList1, setInputList1] = useState([{docId1:"docid"},{bussiness_name1: "hellobaba"}]);

  const Total_Product_created_Today = inputList
    .map((item) => parseInt(item.bussiness_number))
    .reduce((prev, curr) => prev + curr, 0);

  // const Total_Product_approved_Today = inputList1?inputList1?.map((item) => parseInt(item?item.bussiness_number:0)).reduce((prev, curr) => prev + curr, 0):0;
  const Total_Product_approved_Today = inputList1
    ?.map((item) =>
      item.bussiness_number ? parseInt(item.bussiness_number) : 0
    )
    .reduce((prev, curr) => prev + curr, 0);

  const today = new Date();
  const yesterday = new Date(Date.parse(today) - 5 * 86400000);
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

  const [date, setDate] = useState(current_date);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleImageInput = async (e, index) => {
    const { name, files } = e.target;
    const list = [...inputList1];
    const preview = URL.createObjectURL(files[0]);
    list[index]["preview"] = preview;

    const cloudinaryGetUrl = async () => {
      const data = new FormData();
      data.append("image", files[0]);
      try {
        await axios(`/api/image/image`, {
          method: "POST",
          data: data,
          "content-type": "multipart/form-data",
        }).then(async (response) => {
          list[index][name] = response.data[0];
        });
      } catch (err) {}
    };

    await cloudinaryGetUrl();
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([
      ...inputList,
      { docId: "", bussiness_name: "", bussiness_number: "" },
    ]);
  };

  // Second event start

  const handleInputChange1 = (e, index) => {
    const { name, value } = e.target;

    const listsecond = [...inputList1];
    listsecond[index][name] = value;
    setInputList1(listsecond);
  };
  const handleSuggestions = (name, value) => {
    const listsecond = [...inputList1];

    listsecond[0][name] = value;
    setInputList1(listsecond);
  };

  // for file upload...............
  const handleInputChangeimage = (e, index) => {
    const { name, file } = e.target;
    const listsecond = [...inputList1];
    listsecond[index][name] = file;
    setInputList1(listsecond);
  };

  const handleRemoveClick1 = (index) => {
    const listsecond = [...inputList1];
    listsecond.splice(index, 1);
    setInputList1(listsecond);
  };

  const handleAddClick1 = () => {
    setInputList1([
      ...inputList1,
      { docId: "", bussiness_name: "", bussiness_number: "" },
    ]);
  };

  // Second event end

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const openWhatsApp = () => {
    window.open("https://wa.me/+918210374580?text=Hi%20There!");
  };

  const changeBackground = (e) => {
    e.target.style.background = "red";
  };
  //================================================ for Approved docs========>>>

  // const mouseOver = () => {

  // };

  //===============================================================================================================

  const toastrRef = useRef();
  const [count, setCount] = useState(0);
  const [toasterData, setToasterData] = useState({
    position: "topEnd",
    status: "Primary",
    duration: 5000,
    hasIcon: true,
    destroyByClick: true,
    preventDuplicates: false,
  });

  const [checkbox, setCheckbox] = useState({
    1: false,
    2: false,
    3: false,
  });

  const router = useRouter();

  const onChangeCheckbox = (value, name) => {
    setCheckbox({ ...checkbox, [name]: value });
  };

  //Next API For Beds start type

  const [size, setsize] = useState("");

  var approved_images = [];

  async function addVarient(e) {
    e.preventDefault();

    const findEmptyDocID = inputList.find((item) => item?.docId == "");
    const findEmptyBusinessName = inputList.find(
      (item) => item?.bussiness_name == ""
    );
    const findEmptyBusinessNumber = inputList.find(
      (item) => item?.bussiness_number == ""
    );
    const findEmptyUpdateStatus = inputList.find(
      (item) => item?.update_status == "--"
    );
    const findEmptyDocID1 = inputList1.find((item) => item?.docId == "");
    const findEmptyBusinessName1 = inputList1.find(
      (item) => item?.bussiness_name == ""
    );
    const findEmptyBusinessNumber1 = inputList1.find(
      (item) => item?.bussiness_number == ""
    );

    if (
      (findEmptyDocID ||
        findEmptyBusinessName ||
        findEmptyBusinessNumber ||
        findEmptyUpdateStatus) &&
      (total_approval_done_today == "No" || total_approval_done_today == "Yes")
    ) {
      toast("doc id or business name is required");
      // setInputList[(findEmptyDocID)]
      setInputList[findEmptyDocID1];

      return;
    }
    // if(((findEmptyDocID && findEmptyBusinessName)&&(findEmptyBusinessNumber && findEmptyUpdateStatus))&&(total_approval_done_today=="No"||total_approval_done_today=="Yes")){
    //   toast("doc id or business name is required")
    //   setInputList[(findEmptyDocID)]
    //   // setInputList[(findEmptyDocID1)]

    //   return
    // }
    else if (
      (findEmptyDocID1 || findEmptyBusinessName1 || findEmptyBusinessNumber1) &&
      total_approval_done_today == "Yes"
    ) {
      toast("docid2 is required");
      setInputList1[findEmptyDocID1];
      return;
    }

    // if(total_approval_done_today=="No"){
    //   setInputList1("null")

    // }

    dispatch(sendArray([inputList, inputList1]));

    // <h3 style={{color:"green"}}>alert("your data  successfully added")</h3>
    const val = {
      name,
      date,
      total_no_of_calls,
      total_bussiness_connected,
      total_docs_received_today,
      total_catalog_created,
      inputList,
      total_approval_done_today,
      inputList1,

      Total_Product_created_Today,

      total_product_till_date,
      total_product_appproved_monthly,

      total_product_appr,

      My_monthly_target_approved,
      My_monthly_target_Total_approved,
      My_monthly_base_target_approved,
      My_monthly_base_target_total_approved,

      total_number_product_created_today,
      til_date,
      Month_Aproved_til_Date,
      Total_Product_approved_Today,

      monthly_target_assign,
      monthly_target_done,
    };
    //image
    const getApprovedStatus = async () => {
      const data = new FormData();
      data.append("image", appr_status);

      try {
        await axios(`/api/image/image`, {
          method: "POST",
          data: data,
          "content-type": "multipart/form-data",
        }).then(async (response) => (approved_images = await response.data));
      } catch (err) {}
    };

    await getApprovedStatus();

    const sendData = async () => {
      const approved_status = await approved_images;
      const payload = {
        force_replace: checkbox[1],
        name: name,
        agentId: agentId,
        date: date,
        total_no_of_calls: total_no_of_calls,
        total_bussiness_connected: total_bussiness_connected,
        inputList: inputList,
        inputList1: inputList1,
        images: approved_status[0],

        total_docs_received_today: total_docs_received_today,
        total_catalog_created: total_catalog_created,

        total_approval_done_today: total_approval_done_today,

        My_monthly_target_approved: My_monthly_target_approved,
        target_left: target_left,
        My_monthly_target_Total_approved: My_monthly_target_Total_approved,

        til_date: til_date,
        Month_Aproved_til_Date: Month_Aproved_til_Date,

        total_number_product_created_today: total_number_product_created_today,
        total_number_product_approved_today:
          total_number_product_approved_today,
        monthly_target_assign: monthly_target_assign,
        monthly_target_done: monthly_target_done,
        valid_date: valid_date,
      };

      try {
        await axios
          .post("/api/admin/agency", payload)
          .then(async (response) => {
            if (response.data.success) {
              setCount(count + 1);
              router.push(`/admin/whatsapp/thanku-page?value=${val.name}
              &value2=${val.date}&value3=${val.total_no_of_calls}
              &value4=${val.total_bussiness_connected}&value5=${val.total_docs_received_today}&value6=${val.total_catalog_created}&value7=${val.inputList.docId}
              &value8=${val.total_approval_done_today}&value9=${val.inputList1}&value10=${val.My_monthly_target_approved}&value11=${val.total_product_appproved_monthly}
              &value12=${val.My_monthly_base_target_approved}&value13=${val.My_monthly_base_target_total_approved}&value14=${val.Total_Product_created_Today}&value15=${val.total_product_appr}
              &value16=${val.total_product_appr}&value17=${val.Total_Product_approved_Today}
              `);
            } else {
              setCount(count + 1);
              toast(response.data.data);
            }
          });
      } catch (err) {
        setCount(count + 1);

        // toast(response.data.data)
        toast("someThing going Wrong");
      }
    };

    sendData();
  }
  useEffect(() => {
    async function getUsers() {
      await axios
        .get(`/api/admin/agency/agency_data?agentId=${session?.user?.id}`)
        .then((response) => {
          setUsers(response.data.data);
          setServerPage(response.data.totalPages);
          setPage(page + 1);
        });
    }

    getUsers();
  }, [page, session?.user?.id]);

  const total1 = users.filter((item) =>
    item.agentId == session?.user?.id ? item : 0
  );
  const total11 = total1.filter(
    (item) => parseInt(item.date.slice(5, 7)) == today.getMonth() + 1
  );

  const total_product_till_date = total11
    .map((item) => item.total_number_product_created_today)
    .reduce((prev, curr) => prev + curr, 0);

  const total2 = users.filter((item) => {
    if (item.agentId == session?.user?.id) {
      return item;
    }
  });

  const filterItem = total2.map(
    (item) => item.total_number_product_approved_today
  );

  const total_product_appproved_monthly = filterItem.reduce(
    (prev, curr) => prev + curr,
    0
  );

  const total3 = users.filter((item) =>
    item.agentId == session?.user?.id ? item : 0
  );
  const CurrentMonthData = total3.filter(
    (item) => parseInt(item.date.slice(5, 7)) == today.getMonth() + 1
  );

  const total_product_appr = CurrentMonthData.map(
    (item) => item.total_number_product_approved_today
  ).reduce((prev, curr) => prev + curr, 0);

  useEffect(() => {
    setTarget_left(
      parseInt(My_monthly_target_approved) - parseInt(total_product_appr)
    );

    setMy_monthly_target_Total_approved(total_product_appr);
    setTotal_number_product_approved_today(Total_Product_approved_Today);
    setTotal_number_product_created_today(Total_Product_created_Today);
  }, [
    My_monthly_target_approved,
    total_product_appr,
    Total_Product_approved_Today,
    Total_Product_created_Today,
  ]);

  useEffect(() => {
    setMonth_Aproved_til_Date(total_product_appr);
    setTil_date(total_product_till_date);
  }, [total_product_appr, total_product_till_date]);

  const field_color = {
    background: "#FDFDB4",
  };
  const [showInput, setShowInput] = useState(false);

  var approved_images = [];
  const OpenInputField = (value) => {
    if (value == "No") {
      setShowInput(false);
    } else {
      setShowInput(true);
    }
    setTotal_approval_done_today(value);
  };

  const [suggestions, setSuggestions] = useState([]);

  const onSidChange = async (value) => {
    await axios
      .get(`/api/admin/agency/v1jsondata?query=${value}`)
      .then((response) => {
        setSuggestions(response.data.data);
      });
  };

  return (
    <>
      <ToastContainer />

      <UserLayout>
        {/* <Header /> */}
        <div className="bg-theme-clr pb-4 pt-4 pt-md-2">
          <Container
            className=""
            style={{ backgroundColor: "#ffcc99", marginTop: "80px" }}
          >
            <div className="col text-center text-white">
              <h1>Submission form</h1>
            </div>
          </Container>
        </div>

        <Container
          className="user-container"
          style={{
            marginTop: "10px",
            marginLeft: "-40px",
            width: "100%",
            maxWidth: "100%",
          }}
        >
          <Row>
            <div className="col">
              <Card className="bg-secondary shadow">
                <CardHeader
                  className="border-0 "
                  style={{ backgroundColor: "#edd8c4" }}
                >
                  <CardBody>
                    <h3 className="mb-4 text-center">User Information</h3>
                    <Container className="mt-4" fluid>
                      <Row>
                        <Form
                          className="submission-form-field"
                          onSubmit={addVarient}
                        >
                          <div className="">
                            <Row>
                              <Col lg="6">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-username"
                                  >
                                    Name:
                                  </label>
                                  <Input
                                    className="form-control-alternative"
                                    id="input-username"
                                    placeholder="Enter Your Name"
                                    type="text"
                                    style={field_color}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                  />
                                </FormGroup>
                              </Col>
                              <Col lg="6">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-date"
                                  >
                                    Date:
                                  </label>
                                  <Input
                                    className="form-control-alternative"
                                    id="input-date"
                                    type="date"
                                    style={field_color}
                                    min={dateString}
                                    step="1"
                                    max={current_date}
                                    defaultValue={current_date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg="6">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="total_no_of_calls"
                                  >
                                    Total Number Of Calls:
                                  </label>
                                  <Input
                                    className="form-control-alternative"
                                    id="total_no_of_calls"
                                    placeholder="5"
                                    type="number"
                                    style={field_color}
                                    onChange={(e) =>
                                      setTotal_no_of_calls(e.target.value)
                                    }
                                    required
                                  />
                                </FormGroup>
                              </Col>
                              <Col lg="6">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="Total_Business_Connected"
                                  >
                                    Total Business Connected :
                                  </label>
                                  <Input
                                    className="form-control-alternative"
                                    id="Total_Business_Connected"
                                    placeholder="22"
                                    type="number"
                                    style={field_color}
                                    onChange={(e) =>
                                      setTotal_bussiness_connected(
                                        e.target.value
                                      )
                                    }
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg="6">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="total_docs_received_today"
                                  >
                                    Total document Received Today:
                                  </label>
                                  <Input
                                    className="form-control-alternative"
                                    id="total_docs_received_today"
                                    placeholder="22"
                                    type="number"
                                    style={field_color}
                                    onChange={(e) =>
                                      setTotal_docs_received_today(
                                        e.target.value
                                      )
                                    }
                                    required
                                  />
                                </FormGroup>
                              </Col>
                              <Col lg="6">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="Total_catalog_created"
                                  >
                                    Total Catalouge Created:
                                  </label>
                                  <Input
                                    className="form-control-alternative"
                                    id="Total_catalog_created"
                                    placeholder="Cataloge"
                                    style={field_color}
                                    type="text"
                                    onChange={(e) =>
                                      setTotal_catalog_created(e.target.value)
                                    }
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            {/** Dynamic input button add delete */}

                            {inputList.map((y, i) => {
                              return (
                                <Row key={i}>
                                  <Col lg="3">
                                    <FormGroup>
                                      <label
                                        className="form-control-label"
                                        htmlFor="doc_id"
                                      >
                                        Doc iD :
                                      </label>
                                      <Autocomplete
                                        filterOptions={filterOptions}
                                        id="combo-box-demo"
                                        options={suggestions}
                                        getOptionLabel={(option) =>
                                          option?.DocID
                                        }
                                        // value={documentId}
                                        // freeSolo={true}
                                        sx={{ width: 300 }}
                                        onChange={(e, value) => {
                                          if (value?.DocID) {
                                            const payload = {
                                              target: {
                                                name: "docId",
                                                value: value.DocID,
                                              },
                                            };
                                            handleInputChange(payload, i);
                                          }
                                          if (value?.CompanyName) {
                                            const payload = {
                                              target: {
                                                name: "bussiness_name",
                                                value: value.CompanyName,
                                              },
                                            };
                                            handleInputChange(payload, i);
                                          }
                                        }}
                                        onInputChange={(e, value) => {
                                          if (value) {
                                            const payload = {
                                              target: {
                                                name: "docId",
                                                value: value,
                                              },
                                            };
                                            handleInputChange(payload, i);
                                            onSidChange(value);
                                          }
                                        }}
                                        renderInput={(params) => (
                                          <TextField
                                            {...params}
                                            label="docid"
                                            style={{ backgroundColor: "white" }}
                                          />
                                        )}
                                      />
                                    </FormGroup>
                                  </Col>
                                  <Col lg="3">
                                    <FormGroup>
                                      <label
                                        className="form-control-label"
                                        htmlFor="bussiness-name"
                                      >
                                        Business Name:
                                      </label>
                                      <Input
                                        className="form-control-alternative"
                                        id="bussines-name"
                                        placeholder="bussiness-name"
                                        name="bussiness_name"
                                        style={field_color}
                                        type="text"
                                        value={y.bussiness_name}
                                        onChange={(e) =>
                                          handleInputChange(e, i)
                                        }
                                      />
                                    </FormGroup>
                                  </Col>
                                  <Col lg="2">
                                    <FormGroup>
                                      <label
                                        className="form-control-label"
                                        htmlFor="number"
                                      >
                                        Number:
                                      </label>
                                      <Input
                                        className="form-control-alternative"
                                        id="number"
                                        placeholder=""
                                        type="number"
                                        style={field_color}
                                        name="bussiness_number"
                                        minLength={"1"}
                                        value={y.bussiness_number}
                                        onChange={(e) => {
                                          if (e.target.value.length == 3)
                                            return false;
                                          handleInputChange(e, i);
                                        }}
                                        required
                                      />
                                    </FormGroup>
                                  </Col>

                                  <Col lg="2">
                                    <FormGroup>
                                      <label
                                        htmlFor="update-status"
                                        className="form-control-label"
                                      >
                                        Update Status
                                      </label>
                                      <Input
                                        type="select"
                                        name="update_status"
                                        id="update-status"
                                        className="form-control-alternative"
                                        style={field_color}
                                        //value={y.update_status}
                                        onChange={(e) =>
                                          handleInputChange(e, i)
                                        }
                                      >
                                        <option>--</option>
                                        <option>Completed</option>
                                        <option>Owner Not Interested</option>
                                        <option>Bussiness ShutDown</option>
                                      </Input>
                                    </FormGroup>
                                  </Col>
                                  <Col lg="2">
                                    <div className="btn-box mt-4">
                                      {inputList.length !== 1 && (
                                        <button
                                          className="mr10 btn btn-danger mt-2"
                                          onClick={() => handleRemoveClick(i)}
                                        >
                                          Remove
                                        </button>
                                      )}
                                      {inputList.length - 1 === i && (
                                        <button
                                          className="btn btn-warning mt-2"
                                          onClick={handleAddClick}
                                        >
                                          Add
                                        </button>
                                      )}
                                    </div>
                                  </Col>
                                </Row>
                              );
                            })}

                            <Row>
                              <Col lg="7">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="Total_approval_done_today"
                                  >
                                    Approval Done Today :
                                  </label>

                                  <select
                                    name="Total_approval_done_today"
                                    id="Total_approval_done_today"
                                    onChange={(e) => {
                                      setInputList1([
                                        {
                                          docId: "",
                                          bussiness_name: "",
                                          bussiness_number: "",
                                          appr_status: "",
                                        },
                                      ]);
                                      OpenInputField(e.target.value);
                                    }}
                                    style={field_color}
                                  >
                                    <option value="No" selected>
                                      No
                                    </option>
                                    <option value="Yes">Yes</option>
                                  </select>
                                </FormGroup>
                              </Col>
                            </Row>

                            {inputList1.map((x, i) => {
                              const documentId = x.docId;

                              return (
                                <div
                                  style={{
                                    display: showInput ? "block" : "none",
                                  }}
                                  key={i}
                                >
                                  <Row>
                                    <Col mb="3">
                                      <FormGroup>
                                        <label
                                          className="form-control-label"
                                          htmlFor="approved-doc-id"
                                        >
                                          Doc iD 1:
                                        </label>

                                        <Autocomplete
                                          filterOptions={filterOptions}
                                          id="combo-box-demo"
                                          options={suggestions}
                                          getOptionLabel={(option) =>
                                            option?.DocID
                                          }
                                          isOptionEqualToValue={(
                                            option,
                                            value
                                          ) => option.DocID === value.DocID}
                                          sx={{ width: 300 }}
                                          onChange={(e, value) => {
                                            e.preventDefault();

                                            if (value?.DocID) {
                                              const payload = {
                                                target: {
                                                  name: "docId",
                                                  value: value.DocID,
                                                },
                                              };
                                              handleInputChange1(payload, i);
                                            }
                                            if (value?.CompanyName) {
                                              const payload = {
                                                target: {
                                                  name: "bussiness_name",
                                                  value: value.CompanyName,
                                                },
                                              };
                                              handleInputChange1(payload, i);
                                            }
                                          }}
                                          onInputChange={(e, value) => {
                                            const payload = {
                                              target: {
                                                name: "docId",
                                                value: value,
                                              },
                                            };
                                            handleInputChange1(payload, i);
                                            onSidChange(value);
                                          }}
                                          renderInput={(params) => (
                                            <TextField
                                              {...params}
                                              label="DocId"
                                              style={{
                                                backgroundColor: "white",
                                                height: "40px",
                                              }}
                                              className="new-inputx"
                                            />
                                          )}
                                        />
                                      </FormGroup>
                                    </Col>
                                    <Col mb="3">
                                      <FormGroup>
                                        <label
                                          className="form-control-label"
                                          htmlFor="approved-bussiness-name"
                                        >
                                          Business Name:
                                        </label>
                                        <Input
                                          className="form-control-alternative"
                                          id="approved-bussiness-name"
                                          placeholder="bussiness-name"
                                          type="text"
                                          style={field_color}
                                          name="bussiness_name"
                                          value={x.bussiness_name}
                                          onChange={(e) =>
                                            handleInputChange1(e, i)
                                          }
                                        />
                                      </FormGroup>
                                    </Col>

                                    <Col mb="2">
                                      <FormGroup>
                                        <label
                                          className="form-control-label"
                                          htmlFor="approved-number"
                                        >
                                          Number:
                                        </label>
                                        <Input
                                          className="form-control-alternative"
                                          id="approved-number"
                                          placeholder="number"
                                          style={field_color}
                                          type="number"
                                          name="bussiness_number"
                                          value={x.bussiness_number}
                                          onChange={(e) =>
                                            handleInputChange1(e, i)
                                          }
                                        />
                                      </FormGroup>
                                    </Col>

                                    <Col mb="2">
                                      <FormGroup>
                                        <label
                                          className="form-control-label"
                                          htmlFor="appr_status"
                                        >
                                          Appr_Status
                                        </label>
                                        <Input
                                          className="form-control-alternative"
                                          id="appr_status"
                                          placeholder=""
                                          type="file"
                                          name="appr_status"
                                          onChange={(e) =>
                                            handleImageInput(e, i)
                                          }
                                        />
                                      </FormGroup>
                                    </Col>
                                    <Col mb="2">
                                      <div className="btn-box mt-4">
                                        {inputList1.length !== 1 && (
                                          <button
                                            className="mr1 btn btn-danger mt-2"
                                            onClick={() =>
                                              handleRemoveClick1(i)
                                            }
                                          >
                                            Remove
                                          </button>
                                        )}
                                        {inputList1.length - 1 === i && (
                                          <button
                                            className="btn btn-success mt-2"
                                            onClick={handleAddClick1}
                                          >
                                            Add
                                          </button>
                                        )}
                                      </div>
                                    </Col>
                                  </Row>
                                </div>
                              );
                            })}

                            <Row>
                              <Col lg="4">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="My_monthly_target_approved"
                                  >
                                    Monthly Target Approved:
                                  </label>
                                  <Input
                                    className="form-control-alternative"
                                    id="My_monthly_target_approved"
                                    placeholder="Monthly Target Approved"
                                    type="text"
                                    disabled="true"
                                    style={field_color}
                                    value={total_product_appr}
                                    onChange={(e) =>
                                      setMy_monthly_target_Total_approved(
                                        e.target.value
                                      )
                                    }
                                  />
                                </FormGroup>
                              </Col>
                              <Col lg="4">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="Target_Left1"
                                  >
                                    Target Left:
                                  </label>
                                  <Input
                                    className="form-control-alternative"
                                    id="Target_Left1"
                                    placeholder="Target Left"
                                    style={field_color}
                                    disabled="true"
                                    type="number"
                                    value={
                                      My_monthly_target_approved -
                                      total_product_appr
                                    }
                                    onChange={(e) =>
                                      setTarget_left(e.target.value)
                                    }
                                  />
                                </FormGroup>
                              </Col>
                              <Col lg="4">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="My_monthly_target_Total_approved"
                                  >
                                    Monthly Target-Total number/ Approved:
                                  </label>
                                  <Input
                                    className="form-control-alternative"
                                    id="My_monthly_target_Total_approved"
                                    placeholder="Monthly target Total approved"
                                    // type="number"
                                    style={field_color}
                                    disabled="true"
                                    value={My_monthly_target_approved}
                                    onChange={(e) =>
                                      setMy_monthly_target_approved(
                                        e.target.value
                                      )
                                    }
                                  />
                                </FormGroup>
                              </Col>
                            </Row>

                            <Row>
                              <Col lg="4">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="Total_number_product_created_today"
                                  >
                                    Total Number of Product created Today :
                                  </label>
                                  <Input
                                    className="form-control-alternative"
                                    id="Total_number_product_created_today"
                                    placeholder="Total Number of Product created  Today"
                                    type="text"
                                    disabled="true"
                                    style={field_color}
                                    value={
                                      Total_Product_created_Today
                                        ? Total_Product_created_Today
                                        : 0
                                    }
                                    defaultValue={0}
                                    onChange={(e) =>
                                      setTotal_number_product_created_today(
                                        e.target.value
                                      )
                                    }
                                  />
                                </FormGroup>
                              </Col>

                              <Col lg="4">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="til_date"
                                  >
                                    Till Date Product(Day-1):
                                  </label>
                                  <Input
                                    className="form-control-alternative"
                                    id="til_date"
                                    placeholder="Till Date Product"
                                    type="number"
                                    disabled="true"
                                    style={field_color}
                                    value={total_product_till_date}
                                    onChange={(e) =>
                                      setTil_date(e.target.value)
                                    }
                                  />
                                </FormGroup>
                              </Col>

                              <Col lg="4">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="Month_Aproved_til_Date"
                                  >
                                    Month Aproved til Date(Day-1) :
                                  </label>
                                  <Input
                                    className="form-control-alternative"
                                    id="Month_Aproved_til_Date"
                                    placeholder="Month Aproved til Date"
                                    type="number"
                                    disabled="true"
                                    style={field_color}
                                    value={total_product_appr}
                                    onChange={(e) =>
                                      setMonth_Aproved_til_Date(e.target.value)
                                    }
                                  />
                                </FormGroup>
                              </Col>
                            </Row>

                            <Row>
                              <Col lg="6">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="total_number_product_approved_today"
                                  >
                                    Total Number Product Approved Today :
                                  </label>
                                  <Input
                                    className="form-control-alternative"
                                    id="total_number_product_approved_today"
                                    placeholder="Total Number Product Approved  Today"
                                    type="number"
                                    disabled="true"
                                    style={field_color}
                                    value={
                                      Total_Product_approved_Today
                                        ? Total_Product_approved_Today
                                        : 0
                                    }
                                    onChange={(e) =>
                                      setTotal_number_product_approved_today(
                                        e.target.value
                                      )
                                    }
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                          </div>
                          <hr className="my-4" />
                          {/* Address */}
                          <h6 className="heading-small text-muted text-center mb-4">
                            {/* Contact information */}
                          </h6>

                          <div className="text-center">
                            <Button
                              color="info"
                              type="button"
                              onClick={addVarient}
                            >
                              Submit
                            </Button>
                          </div>
                        </Form>
                      </Row>
                    </Container>
                  </CardBody>
                </CardHeader>
              </Card>
            </div>
          </Row>
        </Container>
      </UserLayout>
    </>
  );
}

export default Submission;

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
