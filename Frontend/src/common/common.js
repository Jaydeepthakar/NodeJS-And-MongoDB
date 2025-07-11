const UserData_url = "http://localhost:3000/userdata";

export const api = {
  create: {
    url: `${UserData_url}/create`,
    method: "POST",
  },
  getall: {
    url: `${UserData_url}/getAll`,
    method: "GET",
  },
  update: {
    url: `${UserData_url}/update`,
    method: "PUT",
  },
  delete: {
    url: `${UserData_url}/delete`,
    method: "DELETE",
  },
  getone: {
    url: `${UserData_url}/getone`,
    method: "GET",
  },
  login: {
    url: `${UserData_url}/login`,
    method: "POST",
  },
  // logout: {
  //   url: `${UserData_url}/logout`,
  //   method: "POST",
  // },
  resetPassword: {
    url: `${UserData_url}/resetPassword`,
    method: "POST",
  },
  forgotPassword: {
    url: `${UserData_url}/forgotPassword`,
    method: "POST",
  },
  // checkSession: {
  //   url: `${UserData_url}/checkSession`, // 🔁 ADD THIS
  //   method: "GET",
  // },
};

const Products_url = "http://localhost:3000/products";

export const productApi = {
  create: {
    url: `${Products_url}/create`,
    method: "POST",
  },
  getall: {
    url: `${Products_url}/getall`,
    method: "GET",
  },
  update: {
    url: `${Products_url}/update`,
    method: "PUT",
  },
  delete: {
    url: `${Products_url}/delete`,
    method: "DELETE",
  },
  getone: {
    url: `${Products_url}/getone`,
    method: "GET",
  },
};

const session = "http://localhost:3000/userdata";
export const sessionApi = {
  checkSession: {
    url: `${session}/checkSession`,
    method: "GET",  
  },
  logout: {
    url: `${session}/logout`,
    method: "POST",
  },
};
