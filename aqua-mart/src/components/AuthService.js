// AuthService.js

// import { use } from "i18next";
import axios from "axios";
import axiosInstance from "../axios"; // Import your Axios instance

const AuthService = {
    
  login: async (email, password, idRole) => {
    try {
      const response = await axiosInstance.post("/user/login", {
        email,
        password,
        idRole,
      });
      axios.get('http://18.226.27.5:8081/test/tokenTest').then((response)=>{
        console.log('Response:', response.data);
      }).catch((error) => {
        // Handle any errors that occurred during the request
        console.error('Error:', error);
      });
    //   Get Method: http://18.226.27.5:8081/test/tokenTest >> GET
    //   console.log(response);
    //   console.log(response.data.msg);
    //   console.log(response.data.content.token);
    //   const token = response.data.content.token;
    //   const msg = response.data.msg;
      
      const user = response.data.content.user.firstName;
      const usermail = response.data.content.user.email;
      
      var resData = {
        success: true,
        token : response.data.content.token,
        msg : response.data.msg,
        user : response.data.content.user.firstName,
        usermail :  response.data.content.user.email
      }

      return { resData };
    } catch (error) {
      console.error("Login failed:", error);
      return { success: false, error: error };
    }
  },
};

export default AuthService;
