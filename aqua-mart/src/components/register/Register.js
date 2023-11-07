import React, { useState } from "react";
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

function Register() {
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

  //   console.log(role);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/user/register",
        JSON.stringify({
          Name: "Random",
          firstName: fname,
          midName: mname,
          lastName: lname,
          email: email,
          dateOfBirth: dob,
          address: add,
          city: city,
          province: province,
          country: country,
          postalCode: postalCode,
          password: psw,
          idRole: role,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      //   console.log(response.data)
      //   console.log(response.accessToken);
      console.log(JSON.stringify(response));
      if (response.data.code === 200 && response.data.msg === "succeed") {
        // Registration was successful, you can redirect or show a success message.
        console.log("Registration successful");
      } else if (response.data.code === 200 && response.data.msg === "exist") {
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
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
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

                      <MDBCol md="12">
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

                      <MDBCol md="12">
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
                          type="text"
                          onChange={(e) => setDob(e.target.value)}
                          required
                        />
                      </MDBCol>

                      <MDBCol md="6">
                        <select
                          id="countries"
                          size="lg"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}>
                          <option selected>Choose a Role</option>

                          <option value="2">Buyer</option>
                          <option value="1">Seller</option>
                        </select>
                      </MDBCol>
                    </MDBRow>

                    <MDBInput
                      wrapperClass="mb-4"
                      labelClass="text-black"
                      label="Your Email"
                      size="lg"
                      id="form8"
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <MDBInput
                      wrapperClass="mb-4"
                      labelClass="text-black"
                      label="Password"
                      size="lg"
                      id="form6"
                      type="text"
                      onChange={(e) => setPsw(e.target.value)}
                      required
                    />
                  </MDBCol>

                  <MDBCol md="6" className="text-black">
                    {/* <h3
                      className="fw-normal mb-5 text-black"
                      style={{ color: "#4835d4" }}>
                      Contact Details
                    </h3> */}
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
                      <MDBCol md="5">
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

                      <MDBCol md="7">
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
                    </MDBRow>

                    <MDBInput
                      wrapperClass="mb-4"
                      labelClass="text-black"
                      label="Country"
                      size="lg"
                      id="form8"
                      type="text"
                      onChange={(e) => setCountry(e.target.value)}
                      required
                    />

                    <MDBRow>
                      <MDBCol md="5">
                        <MDBInput
                          wrapperClass="mb-4"
                          labelClass="text-black"
                          label="Province"
                          size="lg"
                          id="form9"
                          type="text"
                          onChange={(e) => setProvince(e.target.value)}
                          required
                        />
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

                    <MDBCheckbox
                      name="flexCheck"
                      id="flexCheckDefault"
                      labelClass="text-black mb-4 text-left"
                      label="I accept the terms and conditions."
                    />

                    {/* <MDBBtn className="register-btn">
                    </MDBBtn> */}
                  </MDBCol>
                </MDBRow>
                <button className="register-btn">Register</button>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </form>
      </MDBRow>
    </MDBContainer>
  );
}

export default Register;
