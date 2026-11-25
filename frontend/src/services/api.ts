import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar token a las requests
api.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("sami_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth APIs
export const loginApi = (username: string, password: string) =>
  api.post("/login", { username, password });

export const getMeApi = () => api.get("/auth/me");

export const logoutApi = () => api.post("/logout");

// Patients APIs
export const getPatientsApi = () => api.get("/patients");
export const createPatientApi = (patient: any) => api.post("/patients", patient);
export const updatePatientApi = (id: string, patient: any) =>
  api.put(`/patients/${id}`, patient);

// Appointments APIs
export const getAppointmentsApi = () => api.get("/appointments");
export const createAppointmentApi = (appt: any) => api.post("/appointments", appt);
export const updateAppointmentApi = (id: string, appt: any) =>
  api.put(`/appointments/${id}`, appt);

// Users APIs
export const getUsersApi = () => api.get("/users");
export const createUserApi = (user: any) => api.post("/users", user);
export const updateUserApi = (id: string, user: any) => api.put(`/users/${id}`, user);
export const deleteUserApi = (id: string) => api.delete(`/users/${id}`);

// Roles APIs
export const getRolesApi = () => api.get("/roles");

// Clinical Record APIs
export const getClinicalRecordsApi = () => api.get("/clinicalrecords");

// Departments
export const getDepartmentsApi = () => api.get("/departments");