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
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Profile() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  
  const storedUserDataString = localStorage.getItem("user");
  const userInfo = JSON.parse(storedUserDataString);
  const navigate = useNavigate();

  const [{ details, userId, storedUser, setToken }, dispatch] = useStateValue();
  // console.log("S", storedUser);
  const [fname, setFname] = useState(userInfo.firstName || "");
  const [mname, setMname] = useState(userInfo.midName || "");
  const [lname, setLname] = useState(userInfo.lastName || "");
  const [email, setEmail] = useState(userInfo.email || "");
  const [phone, setPhone] = useState(userInfo.phoneNum || "");
  const [psw, setPsw] = useState(userInfo.password || "");
  const [role, setRole] = useState(userInfo.idRole || "");
  const [dob, setDob] = useState(userInfo.dateOfBirth || "");
  const [add, setAdd] = useState(userInfo.address || "");
  const [city, setCity] = useState(userInfo.city || "");
  const [postalCode, setPostalCode] = useState(userInfo.postalCode || "");
  const [province, setProvince] = useState(userInfo.province || "");
  const [country, setCountry] = useState(userInfo.country || "");
  const [compName, setCompName] = useState(userInfo.companyName || "");

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  
  // formatDate(details.dateOfBirth);

  const setUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/user/updateUser",
        JSON.stringify({
          firstName: fname,
          midName: mname,
          lastName: lname,
          email: email,
          dateOfBirth: dob,
          address: add,
          phoneNum: phone,
          city: city,
          id: userId,
          province: province,
          country: country,
          postalCode: postalCode,
          password: psw,
          idRole: role,
        }),
        {
          headers: { "Content-Type": "application/json", token: cookies.token },
          withCredentials: true,
        }
      );
      dispatch({ type: "LOGIN", details: response.data.content.user });
      // details: resData.response.data.content.user,
      console.log("Details", response.data.content.user);
      localStorage.setItem("user", JSON.stringify(response.data.content));

      console.log(response);
      navigate("/list");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <MDBContainer fluid className="register">
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <form
            className="d-flex justify-content-center align-items-center w-100"
            onSubmit={setUser}>
            <MDBCol col="" className="">
              <MDBCard className="" style={{ borderRadius: "" }}>
                <MDBCardBody className="text-center">
                  {/* <h2 className="register-title">Register</h2> */}
                  <MDBRow>
                    <MDBCol md="6" className="bg-blue">
                      <MDBRow>
                        <MDBCol md="12">
                          <MDBInput
                            wrapperClass="mb-4"
                            label={userInfo.firstName}
                            // value={details.firstName}
                            // value={isEditMode ? fname : details.firstName}
                            size="lg"
                            id="form1"
                            type="text"
                            onChange={(e) => setFname(e.target.value)}
                            contentEditable
                          />
                        </MDBCol>

                        <MDBCol md="6">
                          <MDBInput
                            label={userInfo.midName}
                            wrapperClass="mb-4"
                            // label="Middle Name"
                            size="lg"
                            id="form1"
                            type="text"
                            onChange={(e) => setMname(e.target.value)}
                          />
                        </MDBCol>

                        <MDBCol md="6">
                          <MDBInput
                            wrapperClass="mb-4"
                            // label="Last Name"
                            size="lg"
                            id="form2"
                            type="text"
                            label={userInfo.lastName}
                            // value={response.lastName}
                            onChange={(e) => setLname(e.target.value)}
                          />
                        </MDBCol>
                      </MDBRow>

                      <MDBRow>
                        <MDBCol md="6">
                          <MDBInput
                            wrapperClass="mb-4"
                            // label="Date of Birth"

                            label={formatDate(userInfo.dateOfBirth)}
                            size="lg"
                            id="form4"
                            type="date"
                            
                            onChange={(e) => setDob(e.target.value)}
                          />
                        </MDBCol>

                        <MDBCol md="6">
                          <select
                            id="roles"
                            size="lg"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={userInfo.idRole}
                            onChange={(e) => setRole(e.target.value)}
                            label={userInfo.idRole}>
                            <option selected>Choose a Role</option>

                            <option value="2">Buyer</option>
                            <option value="1">Seller</option>
                          </select>
                        </MDBCol>
                      </MDBRow>

                      <MDBInput
                        wrapperClass="mb-4"
                        labelClass="text-black"
                        label={userInfo.email}
                        size="lg"
                        // value={details.email}
                        id="form8"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
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
                      />
                    </MDBCol>

                    <MDBCol md="6" className="text-black">
                      <MDBInput
                        wrapperClass="mb-4"
                        labelClass="text-black"
                        // label="Address Line 1"
                        label={userInfo.companyName}
                        size="lg"
                        id="form5"
                        type="text"
                        onChange={(e) => setCompName(e.target.value)}
                      />
                      <MDBInput
                        wrapperClass="mb-4"
                        labelClass="text-black"
                        // label="Address Line 1"
                        label={userInfo.address}
                        size="lg"
                        id="form5"
                        type="text"
                        onChange={(e) => setAdd(e.target.value)}
                      />

                      <MDBRow>
                        <MDBCol md="4">
                          <MDBInput
                            wrapperClass="mb-3"
                            labelClass="text-black"
                            // label="Zip Code"
                            label={userInfo.postalCode}
                            size="lg"
                            id="form6"
                            type="text"
                            onChange={(e) => setPostalCode(e.target.value)}
                          />
                        </MDBCol>

                        <MDBCol md="4">
                          <MDBInput
                            wrapperClass="mb-4"
                            labelClass="text-black"
                            // label="City"
                            label={userInfo.city}
                            size="lg"
                            id="form7"
                            type="text"
                            onChange={(e) => setCity(e.target.value)}
                          />
                        </MDBCol>
                        <MDBCol md="4">
                          <MDBInput
                            wrapperClass="mb-4"
                            labelClass="text-black"
                            // label="Country"
                            label={userInfo.country}
                            // value={response.country}
                            size="lg"
                            id="form8"
                            type="text"
                            onChange={(e) => setCountry(e.target.value)}
                          />
                        </MDBCol>
                      </MDBRow>

                      <MDBRow>
                        <MDBCol md="5">
                          <MDBInput
                            wrapperClass="mb-4"
                            labelClass="text-black"
                            // label="Province"
                            size="lg"
                            label={userInfo.province}
                            id="form9"
                            type="text"
                            onChange={(e) => setProvince(e.target.value)}
                          />
                        </MDBCol>

                        <MDBCol md="7">
                          <MDBInput
                            wrapperClass="mb-4"
                            labelClass="text-black"
                            label={userInfo.phoneNum}
                            // value={response.province}
                            size="lg"
                            id="form10"
                            type="text"
                            onChange={(e) => setPhone(e.target.value)}
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
