// import axios from 'axios';

// const API_URL = 'http://localhost:5000/api';

// export const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // api.interceptors.request.use((config) => {
// //   const token = localStorage.getItem('token');
// //   if (token) {
// //     config.headers.Authorization = `Bearer ${token}`;
// //   }
// //   return config;
// // });

// export const registerUser = async (credentials: { email: string; password: string }) => {
//   const response = await api.post('/auth/register', credentials);
//   return response.data;
// };

// export const loginUser = async (credentials: { email: string; password: string }) => {
//   const response = await api.post('/auth/login', credentials);
//   return response.data;
// };

// export const registerEmployee = async (employeeData: any) => {
//   const response = await api.post('/employees', employeeData);
//   return response.data;
// };

// export const getEmployees = async () => {
//   const response = await api.get('/employees');
//   return response.data;
// };


import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const registerUser = async (credentials: { email: string; password: string }) => {
  const response = await api.post('/auth/register', credentials);
  return response.data;
};

export const loginUser = async (credentials: { email: string; password: string }) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const registerEmployee = async (employeeData: any) => {
  const response = await api.post('/employees', employeeData);
  return response.data;
};

export const getEmployees = async (employeeData: any) => {
  const response = await api.get('/employees');
  return response.data;
};
