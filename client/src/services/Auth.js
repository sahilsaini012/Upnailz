import axios from "axios";

export const verifyToken = async (token) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/verify-token`,
      { token }
    );
    return response.data;
  } catch (error) {
    throw error?.response?.data || { message: "Error to get token" };
  }
};

export const login = async (params) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/login`,
      params
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { mesaage: "Login failed" };
  }
};

export const addUserAppointment = async (params) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/add-appointments`,
      params
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to Add Appointment" };
  }
};

export const getUsersAppointment = async (userid) => {
  //alert("dwkbke")
  // console.log("okkkkkk")
  try {
        // console.log("Calling API with userId:", userId);
    
    const params = userid ? { userid } : {}; // If userid is provided, it will be added as a query parameter

    const response = await axios.get(
      //  alert("okkkk")
      `${process.env.REACT_APP_API_URL}/appointments`,
      { params }
    );
    // alert("aimmmm")
    console.log("params",params)
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to get users" };
  }
};

export const getCustomerDetails = async (userid) => {
  //alert("dwkbke")
  // console.log("okkkkkk")
  try {
    const params = userid ? { userid } : {}; // If userid is provided, it will be added as a query parameter

    const response = await axios.get(
      // alert("okkkk")
      `${process.env.REACT_APP_API_URL}/customer`,
      { params }
    );
    // alert("aimmmm")
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to get users" };
  }
}


export const updateUsersAppointment = async (id, values) => {
  //alert("coming")
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/appointments`,
      {
        id,
        ...values,
      }
    );
    //alert("coming")
    return response.data;
  } catch (error) {
    console.error("Failed to update appointment:", error);
    throw error.response?.data || { message: "Failed to update appointment" };
  }
};

export const deleteAppointment = async (id) => {
  try {
    // alert(id); // For debugging, ensure the correct ID is being passed
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/appointments/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error.response);
    throw error.response?.data || { message: "Error deleting appointment." };
  }
};

export const forForgotPassword = async (params) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/forgot-password`,
      params
    );
    // alert("Okkkkkkkkkkkk")
    return response.data;
  } catch (error) {
    console.error("Error:", error.response);
    throw error.response?.data || { message: "Error to forgot password." };
  }
};

export const forResetPassword = async (params) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/reset-password`,
      params
    );
    // alert("Okkkkkkkkkkk")
    return response.data;
  } catch (error) {
    console.error("Error:", error.response);
    throw error.response?.data || { message: "Error to reset password." };
  }
};


export const addPromoties = async (params) => {
  try {
    // console.log(params)
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/promoties`,
      params
    );
 
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to send message" };
  }
};



export const getCustomerEmails = async (userIds) => {
  try {
    // userIds is an array and convert to a comma-separated string
    const params = userIds.length > 0 ? { user_id: userIds.join(",") } : {};

    console.log("Sending params:", params);

    // Send request to the backend API
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/getUserEmails`,
      { params } // This sends `user_id=1,2,3,4` as query parameters
    );

    return response.data; 
  } catch (error) {
    console.error("Error:", error); 
    throw error.response?.data || { message: "Failed to fetch customer emails" };
  }
};


