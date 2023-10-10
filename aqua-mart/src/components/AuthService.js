// AuthService.js

import axiosInstance from "../axios"; // Import your Axios instance

const AuthService = {
  login: async (email, password, idRole) => {
    try {
      const response = await axiosInstance.post("/user/login", {
        email,
        password,
        idRole,
      });

      // Assuming your backend returns a JWT token upon successful login
      const jwtToken = response.data.token;
      const user = response.data.user;

      return { success: true, token: jwtToken, user };
    } catch (error) {
      console.error("Login failed:", error);
      return { success: false, error: error.response.data.msg };
    }
  },
};

export default AuthService;
