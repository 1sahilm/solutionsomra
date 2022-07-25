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

// core components

function S1Process() {
  const dispatch = useDispatch();

  const [session, loading] = useSession();

  const [agent_id, setAgent_id] = useState(session?.user?.id);
  const [autoComplete, setAutoComplete] = useState("");
  const OPTIONS_LIMIT = 10;
  const defaultFilterOptions = createFilterOptions();

  const filterOptions = (options, state) => {
    return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
  };

  //VARIABLE INITIALIZATION

  const [name, setName] = useState(session?.user?.name);
  const [users, setUsers] = useState([]);
  const [timeout, setTimeout] = useState(1000);

  const [page, setPage] = useState(1);
  const [serverPage, setServerPage] = useState(1);
  const [s1data, setS1data] = useState([]);

  const [process_id, setProcess_id] = useState("");
  const [process_name, setProcess_name] = useState("");
  const [brand_name, setBrand_name] = useState("");

  const [s_id, setS_id] = useState("");
  const [doc_id, setDoc_id] = useState("");

  const [company_name, setCompany_name] = useState("");

  const [product_url, setProduct_url] = useState("");

  const [found_on_jd, setFound_on_jd] = useState(false);

  const [jd_productLink, setJd_productLink] = useState("");

  const [found_on_brandSite, setFound_on_brandSite] = useState(false);
  const [brandSite_productLink, setBrandSite_productLink] = useState("");
  const [standard_product_name, setStandard_product_name] = useState("");
  const [remark, setRemark] = useState("");

  const [] = useState("");

  const [today_total_submission, setToday_total_submission] = useState(0);
  const [till_date_submission, setTill_date_submission] = useState(0);
  const [category, setCategory] = useState("");

  const [sid, setSid] = useState("");
  const [TestID, setTestID] = useState("");
  const [SID1, setSID1] = useState("");
  const [Contractor_Name, setContractor_Name] = useState("");
  const [priority, setPriority] = useState("");
  const [Lot_type, setLot_type] = useState("");

  const today = new Date();

  const holiday = today.getDay();
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
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState("");

  //================================================ for Approved docs========>>>

  const mouseOver = () => {
    console.log("share");
  };

  //===============================================================================================================

  const toastrRef = useRef();
  const [count, setCount] = useState(0);

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
  //MAIN COLORS
  //STRUCTURE 1

  useEffect(async () => {
    try {
      await axios
        .get(
          "/api/userForm/process/s1-process/get-todays-documents-count?id=" +
            session?.user?.id
        )
        .then(async (response) => {
          if (response.data.success) {
            setToday_total_submission(response?.data?.todaysDocumentsCount);
            setTill_date_submission(response?.data?.tillDateDocumentssCount);
          } else {
          }
        });
    } catch (err) {
      toast("ERROR", err?.message);
    }
  }, []);

  const [showInput, setShowInput] = useState(false);
  var approved_images = [];
  const OpenInputField = (value) => {
    if (value == "Done") {
      setShowInput(false);
    } else {
      setShowInput(true);
    }
    setRemark(value);
  };
  const [justDial, setJustDial] = useState(false);
  const [brandSite, setBrandSite] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (standard_product_name || justDial || brandSite) {
      setRemark("Done");
      return;
    }
    if (!(standard_product_name || justDial || brandSite)) {
      setRemark("not found");
      return;
    }

    if (standard_product_name) {
      setRemark("duplicate");
      return;
    }
  }, [justDial, brandSite, notFound, standard_product_name]);
  //   Enable Disable

  async function addVarient(e) {
    e.preventDefault();

    if (
      jd_productLink === "" &&
      brandSite_productLink === "" &&
      standard_product_name === "" &&
      remark === ""
    ) {
      toast(
        "any one of theese(jd ,brandsite and standard product name,remark) is mindatory"
      );
      return;
    }
    if (holiday === 0) {
      toast("Today is Sunday You cant Submit data");
    }

    const sendData = async () => {
      const payload = {
        force_replace: checkbox[1],
        // name is agent id
        name: agent_id,

        date: date,
        //agentId is name field
        agentId: name,
        process_name: process_name,
        brand_name: brand_name,
        s_id: s_id,
        SID1: SID1,
        Lot_type: Lot_type,
        TestID: TestID,
        Contractor_Name: Contractor_Name,
        priority: priority,
        doc_id: doc_id,
        company_name: company_name,
        product_url: product_url,
        // found_on_jd:found_on_jd,
        found_on_jd: justDial == false ? "NO" : "Yes",
        jd_productLink: jd_productLink,
        found_on_brandSite: brandSite == false ? "No" : "Yes",
        brandSite_productLink: brandSite_productLink,
        standard_product_name: standard_product_name,
        remark: remark,
        today_total_submission: today_total_submission,
        till_date_submission: till_date_submission,
      };

      try {
        await axios
          .post("/api/userForm/process/s1-process/s1-addprocess", payload)
          .then(async (response) => {
            if (response.data.success) {
              setCount(count + 1);
              toast(response?.data?.data);
              setToday_total_submission(response?.data?.todaysDocumentsCount);
              setTill_date_submission(response?.data?.tillDateDocumentssCount);

              router.reload();
            } else {
              setCount(count + 1);
              toast(response?.data?.data);
            }
          });
      } catch (err) {
        setCount(count + 1);
        toast(err?.message);
      }
    };

    sendData();
  }

  useEffect(() => {
    function getUsers() {
      axios.get(`/api/admin/agency?search=${users?.date}`).then((response) => {
        setUsers(response.data.data);
        setServerPage(response.data.totalPages);
        setPage(page + 1);
      });
    }

    getUsers();
  }, []);

  //=============================test======
  const onSidChange = async (value) => {
    await axios
      .get(`/api/userForm/OmraDatas1/s1data?query=${value}`)
      .then((response) => {
        setSuggestions(response.data.data);
      });
  };
  useEffect(() => {
    setS_id(selectedSuggestion?.SID);
    setSID1(selectedSuggestion?.SID1);
    setContractor_Name(selectedSuggestion?.ContractorName);
    setPriority(selectedSuggestion?.Priority);

    setBrand_name(selectedSuggestion?.Brand);
    setCompany_name(selectedSuggestion?.companyname);
    setDoc_id(selectedSuggestion?.docid);
    setProduct_url(selectedSuggestion?.Product_URL);
    setLot_type(selectedSuggestion?.lot_type);
  }, [selectedSuggestion]);

  return (
    <>
      <UserLayout>
        <ToastContainer />

        {/* <Header /> */}
        <div className="bg-theme-clr pb-4 pt-4 pt-md-2">
          <Container
            className="DataListHeading"
            style={{ backgroundColor: "#ffcc99", marginTop: "80px" }}
          >
            <div className="col text-center text-white">
              <h1>Process Form S1</h1>
            </div>
          </Container>
        </div>

        <Container
          className="user-container"
          style={{
            marginTop: "0px",
            width: "100%",
            maxWidth: "100%",
            marginLeft: "-40px",
          }}
        >
          <Row>
            <div className="col ">
              <Card className="bg-secondary shadow">
                <CardHeader
                  className="border-0 "
                  style={{ backgroundColor: "#edd8c4" }}
                >
                  <CardBody>
                    <Container className="mt-4" fluid>
                      <Row>
                        <Form className="submission-form-field">
                          <div className="">
                            <Row>
                              <Col mb="2">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="date"
                                  >
                                    Date:
                                  </label>
                                </FormGroup>
                              </Col>
                              <Col mb="2">
                                <FormGroup>
                                  <Input
                                    className="form-control-alternative"
                                    id="date"
                                    placeholder="Enter Brand Name"
                                    type="text"
                                    value={date}
                                    disabled
                                    onChange={(e) => setDate(e.target.value)}
                                  />
                                </FormGroup>
                              </Col>

                              <Col lg="8"></Col>
                            </Row>
                            <Row>
                              <Col lg="2">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="brand-name"
                                  >
                                    Brand Name:
                                  </label>
                                </FormGroup>
                              </Col>
                              <Col lg="4">
                                <FormGroup>
                                  <Input
                                    className="form-control-alternative"
                                    id="brand-name"
                                    placeholder="Enter Brand Name"
                                    type="text"
                                    value={brand_name}
                                    onChange={(e) =>
                                      setBrand_name(e.target.value)
                                    }
                                  />
                                </FormGroup>
                              </Col>
                              <Col lg="2">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="sid"
                                  >
                                    SID:
                                  </label>
                                </FormGroup>
                              </Col>

                              <Col lg="4">
                                <FormGroup>
                                  <Autocomplete
                                    filterOptions={filterOptions}
                                    id="combo-box-demo"
                                    options={suggestions}
                                    getOptionLabel={(option) => option?.SID}
                                    sx={{ width: 300 }}
                                    onChange={(e, value) => {
                                      setSelectedSuggestion(value);
                                    }}
                                    onInputChange={(e, value) => {
                                      if (value) {
                                        onSidChange(value);
                                      }
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="SID"
                                        style={{ backgroundColor: "white" }}
                                        value={s_id}
                                        onChange={(e) =>
                                          setS_id(e.target.value)
                                        }
                                        required
                                      />
                                    )}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg="2">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="docid"
                                  >
                                    DOCID:
                                  </label>
                                </FormGroup>
                              </Col>
                              <Col lg="4">
                                <FormGroup>
                                  <Input
                                    className="form-control-alternative"
                                    id="docid"
                                    placeholder="5"
                                    type="text"
                                    value={doc_id}
                                    onChange={(e) => setDoc_id(e.target.value)}
                                    required
                                  />
                                </FormGroup>
                              </Col>
                              <Col lg="2">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="company-name"
                                  >
                                    Company Name:
                                  </label>
                                </FormGroup>
                              </Col>
                              <Col lg="4">
                                <FormGroup>
                                  <Input
                                    className="form-control-alternative"
                                    id="company-name"
                                    placeholder="company name"
                                    type="text"
                                    value={company_name}
                                    onChange={(e) =>
                                      setCompany_name(e.target.value)
                                    }
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg="2">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="product-url"
                                  >
                                    product Url:
                                  </label>
                                </FormGroup>
                              </Col>
                              <Col lg="4">
                                <FormGroup>
                                  <Input
                                    className="form-control-alternative"
                                    id="product-url"
                                    placeholder="product-url"
                                    type="text"
                                    value={product_url}
                                    onChange={(e) =>
                                      setProduct_url(e.target.value)
                                    }
                                    required
                                  />
                                </FormGroup>
                              </Col>
                              <Col lg="6"></Col>
                            </Row>

                            <hr />
                            <br />

                            <Row>
                              <Col lg="2">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="found-on-just-dial"
                                  >
                                    Found On Just Dial :
                                  </label>
                                </FormGroup>
                              </Col>

                              <Col lg="4">
                                <FormGroup>
                                  <input
                                    type="checkbox"
                                    checked={justDial}
                                    onChange={(e) =>
                                      setJustDial(e.target.checked)
                                    }
                                    required
                                  />
                                </FormGroup>
                              </Col>

                              <Col lg="2">
                                <FormGroup>
                                  <label
                                    style={{
                                      display: brandSite ? "none" : "block",
                                    }}
                                    className="form-control-label"
                                    htmlFor="just-dial-product-link"
                                  >
                                    Just Dial Product Link :
                                  </label>
                                </FormGroup>
                              </Col>
                              <Col lg="4">
                                <FormGroup>
                                  <Input
                                    style={{
                                      display: brandSite ? "none" : "block",
                                    }}
                                    className="form-control-alternative"
                                    id="found-on-just-dial"
                                    placeholder=""
                                    type="text"
                                    onChange={(e) =>
                                      setJd_productLink(e.target.value)
                                    }
                                    required
                                  />
                                </FormGroup>
                              </Col>
                            </Row>

                            <Row>
                              <Col lg="2">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="found-on-brand-site"
                                  >
                                    Found On Brand Site(Yes/No):
                                  </label>
                                </FormGroup>
                              </Col>
                              <Col lg="4">
                                <FormGroup>
                                  <input
                                    name="product-link"
                                    type="checkbox"
                                    checked={brandSite}
                                    onChange={(e) =>
                                      setBrandSite(e.target.checked)
                                    }
                                    required
                                  />
                                  {/* <select className="form-control-alternative"   id="found-on-brand-site"  onChange={(e) =>
                                    setFound_on_brandSite(e.target.value)
                                    
                                    
                                    
                                  }>
                                  <option value="Yes" width="40px">Yes</option>
                                  <option value="No">No</option>
                                 
                                  
                                </select> */}
                                </FormGroup>
                              </Col>

                              <Col lg="2">
                                <FormGroup>
                                  <label
                                    style={{
                                      display: justDial ? "none" : "block",
                                    }}
                                    className="form-control-label"
                                    htmlFor="brandsite-product-link"
                                  >
                                    BrandSite Product Link :
                                  </label>
                                </FormGroup>
                              </Col>
                              <Col lg="4">
                                <FormGroup>
                                  <Input
                                    style={{
                                      display: justDial ? "none" : "block",
                                    }}
                                    className="form-control-alternative"
                                    id="brandsite-product-link"
                                    placeholder=""
                                    type="text"
                                    onChange={(e) =>
                                      setBrandSite_productLink(e.target.value)
                                    }
                                    required
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg="2">
                                
                              </Col>
                              <Col lg="4">
                                
                              </Col>
                            </Row>

                            <Row>
                              <Col lg="2">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="standard-product-name"
                                  >
                                    Standard Product Name :
                                  </label>
                                </FormGroup>
                              </Col>
                              <Col lg="4">
                                <FormGroup>
                                  <Input
                                    className="form-control-alternative"
                                    id="standard-product-name"
                                    placeholder=""
                                    type="text"
                                    onChange={(e) =>
                                      setStandard_product_name(e.target.value)
                                    }
                                    required
                                  />
                                </FormGroup>
                              </Col>

                              <Col lg="2">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="remark"
                                  >
                                    Remark:
                                  </label>
                                </FormGroup>
                              </Col>
                              <Col lg="4">
                                <FormGroup>
                                 
                                  <select
                                    className="form-control-alternative"
                                    id="remark"
                                    onChange={(e) =>
                                      OpenInputField(e.target.value)
                                    }
                                  >
                                    <option value="Done">Done</option>
                                    <option value="not found" width="40px">
                                      Not Found
                                    </option>
                                    <option value="duplicate">Dublicate</option>
                                  </select>

                                  <div style={{ display: "flex" }}>
                                    <label
                                      className="form-control-label"
                                      htmlFor="remark"
                                      style={{
                                        display: showInput ? "block" : "none",
                                      }}
                                    >
                                      SID:
                                    </label>
                                    <input
                                      style={{
                                        display: showInput ? "block" : "none",
                                      }}
                                      onChange={(e) => setSid(e.target.value)}
                                    />
                                  </div>
                                </FormGroup>
                              </Col>
                            </Row>

                            <Row>
                              <Col lg="2">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="today-total-submission"
                                  >
                                    Today Total Submission :
                                  </label>
                                </FormGroup>
                              </Col>
                              <Col lg="4">
                                <FormGroup>
                                  <Input
                                    className="form-control-alternative"
                                    id="today-total-submission"
                                    placeholder=""
                                    type="number"
                                    value={today_total_submission}
                                    onChange={(e) =>
                                      setToday_total_submission(e.target.value)
                                    }
                                    required
                                  />
                                </FormGroup>
                              </Col>

                              <Col lg="2">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="till_date-submission"
                                  >
                                    Til Date Submission:
                                  </label>
                                </FormGroup>
                              </Col>
                              <Col lg="4">
                                <FormGroup>
                                  <Input
                                    className="form-control-alternative"
                                    id="till_date-submission"
                                    placeholder=""
                                    type="number"
                                    value={till_date_submission}
                                    disabled
                                    onChange={(e) =>
                                      setTill_date_submission(e.target.value)
                                    }
                                    required
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                          </div>
                          <hr className="my-4" />

                          <h6 className="heading-small text-muted text-center mb-4"></h6>

                          <div className="text-center">
                            <Button
                              color="warning"
                              type="button"
                              style={{
                                alignItems: "center",
                                justifyContent: "center",
                              }}
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

export default S1Process;

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
