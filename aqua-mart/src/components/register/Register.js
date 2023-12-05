import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBSelect,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import axios from "../../axios";
// import axiosInstance from "../../axios";
import "../register/register.css";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../StateProvider";

function Register() {
  
  const [{provinces, countries}, dispatch] = useStateValue();
  const navigate = useNavigate();


  const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-99_]{3,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const PHONE_REGEX =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [showPsw, setShowPsw] = useState(false);

  const [validEmail, setValidEmail] = useState(true);

  const [fname, setFname] = useState("");
  const [mname, setMname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [psw, setPsw] = useState("");
  const [role, setRole] = useState("");
  const [dob, setDob] = useState("");
  const [add, setAdd] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [compName, setCompName] = useState("");

  useEffect(() => {
    const result = PWD_REGEX.test(psw);
    console.log(result);
    console.log(psw);
    setValidPwd(result);
  }, [psw]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    console.log(result);
    setValidEmail(result);
    console.log(email);
  }, [email]);

  //password hide and show
  const toggleShowPassword = () => {
    setShowPsw(!showPsw);
  };
  //   console.log(role);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/user/register",
        JSON.stringify({
          firstName: fname,
          midName: mname,
          lastName: lname,
          email: email,
          dateOfBirth: dob,
          address: add,
          phoneNum: phone,
          city: city,
          province: province,
          country: country,
          postalCode: postalCode,
          password: psw,
          idRole: role,
          companyName :compName
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      //   console.log(response.data)
      //   console.log(response.accessToken);
      console.log(JSON.stringify(response));
      if (response.data.status === 200) {
        navigate("/login");
        // Registration was successful, you can redirect or show a success message.
        console.log("Registration successful");
      } else if (
        response.data.status === 200 &&
        response.data.msg === "Account exist!"
      ) {
        // User already exists
        console.log("User with the same email already exists");
      } else {
        // Handle other scenarios
        console.log("Registration failed for an unknown reason");
      }
      //clear the input field
    } catch (err) {
      console.log("Registration failed:", err);
    }
  };

  return (
    <MDBContainer fluid className="register">
      <MDBRow className="d-flex justify-content-center align-items-center h-100 pt-5">
        <form
          onSubmit={handleSubmit}
          className="d-flex justify-content-center align-items-center w-100">
          <MDBCol col="" className="">
            <MDBCard className="" style={{ borderRadius: "" }}>
              <MDBCardBody className="text-center">
                {/* <h2 className="register-title">Register</h2> */}
                <MDBRow>
                  <MDBCol md="6" className="bg-blue">
                    {/* <h3
                      className="fw-normal mb-5 text-black"
                      style={{ color: "#4835d4" }}>
                      General Infomation
                    </h3> */}

                    {/* <MDBSelect
                    className="mb-4"
                    size="lg"
                    data={[
                      { text: "Titile", value: 1 },
                      { text: "Two", value: 2 },
                      { text: "Three", value: 3 },
                      { text: "Four", value: 4 },
                    ]}
                  /> */}

                    <MDBRow>
                      <MDBCol md="12">
                        <MDBInput
                          wrapperClass="mb-4"
                          label="First Name"
                          size="lg"
                          id="form1"
                          type="text"
                          onChange={(e) => setFname(e.target.value)}
                          required
                        />
                      </MDBCol>

                      <MDBCol md="6">
                        <MDBInput
                          wrapperClass="mb-4"
                          label="Middle Name"
                          size="lg"
                          id="form1"
                          type="text"
                          onChange={(e) => setMname(e.target.value)}
                          required
                        />
                      </MDBCol>

                      <MDBCol md="6">
                        <MDBInput
                          wrapperClass="mb-4"
                          label="Last Name"
                          size="lg"
                          id="form2"
                          type="text"
                          onChange={(e) => setLname(e.target.value)}
                          required
                        />
                      </MDBCol>
                     
                    </MDBRow>

                    {/* <MDBSelect
                    className="mb-4"
                    size="lg"
                    data={[
                      { text: "Position", value: 1 },
                      { text: "Two", value: 2 },
                      { text: "Three", value: 3 },
                      { text: "Four", value: 4 },
                    ]}
                  /> */}
                    {/* <MDBInput
                    wrapperClass="mb-4"
                    label="email"
                    size="lg"
                    id="form3"
                    type="email"
                  /> */}

                    <MDBRow>
                      <MDBCol md="6">
                        <MDBInput
                          wrapperClass="mb-4"
                          label="Date of Birth"
                          size="lg"
                          id="form4"
                          type="date"
                          onChange={(e) => setDob(e.target.value)}
                          required
                        />
                      </MDBCol>

                      <MDBCol md="6">
                        <select
                          id="roles"
                          size="lg"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}>
                          <option value="" disabled hidden>
                            Choose a Role
                          </option>
                          <option value="2">Buyer</option>
                          <option value="1">Seller</option>
                        </select>
                      </MDBCol>
                    </MDBRow>

                    <MDBInput
                      wrapperClass={!validEmail ? "mb-4 invalid" : "mb-4"}
                      labelClass="text-black"
                      label="Your Email"
                      size="lg"
                      id="form8"
                      type="email"
                      
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <MDBCol
                      md="col-2"
                      className="d-flex justify-start align-items-start gap-2">
                      <MDBInput
                        wrapperClass={validPwd ? "mb-4 valid" : "mb-4 invalid"}
                        labelClass="text-black"
                        label="Password"
                        size="lg"
                        id="form6"
                        type={showPsw ? "text" : "password"}
                        aria-invalid={!validPwd ? "true" : "false"}
                        onChange={(e) => setPsw(e.target.value)}
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                        required
                      />
                      <button
                        onClick={toggleShowPassword}
                        className="show-password-button">
                        <i
                          className={
                            showPsw ? "fas fa-eye-slash" : "fas fa-eye"
                          }></i>
                      </button>
                    </MDBCol>
                  </MDBCol>

                  <MDBCol md="6" className="text-black">
                    {/* <h3
                      className="fw-normal mb-5 text-black"
                      style={{ color: "#4835d4" }}>
                      Contact Details
                    </h3> */}
                     
                        <MDBInput
                          wrapperClass="mb-4"
                          label="Company Name"
                          size="lg"
                          id="form2"
                          type="text"
                          onChange={(e) => setCompName(e.target.value)}
                        />
                      
                    <MDBInput
                      wrapperClass="mb-4"
                      labelClass="text-black"
                      label="Address Line 1"
                      size="lg"
                      id="form5"
                      type="text"
                      onChange={(e) => setAdd(e.target.value)}
                      required
                    />

                    <MDBRow>
                      <MDBCol md="3">
                        <MDBInput
                          wrapperClass="mb-4"
                          labelClass="text-black"
                          label="Zip Code"
                          size="lg"
                          id="form6"
                          type="text"
                          onChange={(e) => setPostalCode(e.target.value)}
                          required
                        />
                      </MDBCol>

                      <MDBCol md="4">
                        <MDBInput
                          wrapperClass="mb-4"
                          labelClass="text-black"
                          label="City"
                          size="lg"
                          id="form7"
                          type="text"
                          onChange={(e) => setCity(e.target.value)}
                          required
                        />
                      </MDBCol>
                      <MDBCol md="5">
                      <select className="w-100 mb-3" required>
                          <option value="" disabled selected>Select Countries</option>
                          {countries.map((c)=>
                          <option key={c.id} value={c.id}> {c.name} </option>
                          )}
                        </select>
                      {/* <MDBInput
                      wrapperClass="mb-4"
                      labelClass="text-black"
                      label="Country"
                      size="lg"
                      id="form8"
                      type="text"
                      onChange={(e) => setCountry(e.target.value)}
                      required
                    /> */}
                      </MDBCol>
                    </MDBRow>

                   

                    <MDBRow>
                      <MDBCol md="5">
                        <select className="w-100 mb-3" required>
                          <option value="" disabled selected>Select Province</option>
                          {provinces.map((p)=>
                          <option key={p.id} value={p.id} >{p.name}</option>
                          )}
                        </select>
                     
                        {/* <MDBInput
                          wrapperClass="mb-4"
                          labelClass="text-black"
                          label="Province"
                          size="lg"
                          id="form9"
                          type="text"
                          onChange={(e) => setProvince(e.target.value)}
                          required
                        /> */}
                      </MDBCol>

                      <MDBCol md="7">
                        <MDBInput
                          wrapperClass="mb-4"
                          labelClass="text-black"
                          label="Phone Number"
                          size="lg"
                          id="form10"
                          type="text"
                          onChange={(e) => setPhone(e.target.value)}
                          required
                        />
                      </MDBCol>
                    </MDBRow>

                    {/* <MDBCheckbox
                      name="flexCheck"
                      id="flexCheckDefault"
                      labelClass="text-black mb-4 text-left"
                      label="I accept the terms and conditions."
                    /> */}

                    {/* <MDBBtn className="register-btn">
                    </MDBBtn> */}
                  </MDBCol>
                </MDBRow>
                <button disabled={!validPwd} className="register-btn">
                  Register
                </button>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </form>
      </MDBRow>
    </MDBContainer>
  );
}

export default Register;
