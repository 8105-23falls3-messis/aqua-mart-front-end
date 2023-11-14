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
import "../../components/ProfilePage/profile.css";
import { useStateValue } from "../StateProvider";
import { Link } from "react-router-dom";

function Profile() {
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

  const [{ user, response, details, userId }, dispatch] = useStateValue();

  const setUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `/user/updateUser`,
        JSON.stringify({
          firstName: fname,
          midName: mname,
          lastName: lname,
          email: email,
          dateOfBirth: dob,
          address: add,
          city: city,
          id: userId,
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
      dispatch({ type: "USER", details: response.data.content });

      console.log(response);
      navigate("/user");
    } catch (err) {
      console.log(err);
    }
  };

  var bDate = new Date(details.dateOfBirth).toLocalTimeString();
  // const getUser = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       "/user/userProfile",
  //       JSON.stringify({
  //         userId: response.userId
  //       }),
  //       {
  //         headers: { "Content-Type": "application/json" },
  //         withCredentials: true,
  //       }
  //     );

  //     console.log(response);
  //     navigate("/userDetails");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // const navigate = useNavigate();
  return (
    <>
      {/* <h1>
        USER PAGE
       </h1> */}
      <MDBContainer fluid className="register">
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <form className="d-flex justify-content-center align-items-center w-100" onSubmit={setUser}>
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
                            label={details.firstName}
                            // value={details.firstName}
                            // value={isEditMode ? fname : details.firstName}
                            size="lg"
                            id="form1"
                            type="text"
                            onChange={(e) => setFname(e.target.value)}
                            required
                            contentEditable
                          />
                        </MDBCol>

                        <MDBCol md="12">
                          <MDBInput
                            label={details.midName}
                            wrapperClass="mb-4"
                            // label="Middle Name"
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
                            // label="Last Name"
                            size="lg"
                            id="form2"
                            type="text"
                            label={details.lastName}
                            // value={response.lastName}
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
                            // label="Date of Birth"
                            
                            label={details.dateOfBirth}
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
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            // value={details.idRole}
                            onChange={(e) => setRole(e.target.value)}
                            label={details.idRole}>
                            <option selected>Choose a Role</option>

                            <option value="2">Buyer</option>
                            <option value="1">Seller</option>
                          </select>
                        </MDBCol>
                      </MDBRow>

                      <MDBInput
                        wrapperClass="mb-4"
                        labelClass="text-black"
                        label={details.email}
                        size="lg"
                        // value={details.email}
                        id="form8"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <MDBInput
                        wrapperClass="mb-4"
                        labelClass="text-black"
                        label="Enter Password to Update"
                        // value={details.password}
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
                        // label="Address Line 1"
                        label={details.address}
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
                            // label="Zip Code"
                            label={details.postalCode}
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
                            // label="City"
                            label={details.city}
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
                        // label="Country"
                        label={details.country}
                        // value={response.country}
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
                            // label="Province"
                            size="lg"
                            label={details.province}
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
                            label={details.province}
                            // value={response.province}
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
                  <div className="profileBtns">
                    {/* {isEditMode ? (
                      <button
                        className="register-btn"
                        onClick={updateUserProfile}>
                        Update
                      </button>
                    ) : null} */}
                    <button className="register-btn">Update</button>
                    <Link to={"/list"}>
                      <button className="register-btn">Cancel</button>
                    </Link>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </form>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export default Profile;
