import axios from "axios";

const EMP_URI = "http://localhost:8084";

function EmployeeService() {
  const addEmployee = (emp) => axios.post(`${EMP_URI}/addemployee`, emp);
  const getEmployeeById = (id) => axios.get(`${EMP_URI}/getemployeebyid/${id}`);
  const getAllEmployees = () => axios.get(`${EMP_URI}/all`);
  return Object.freeze({ addEmployee, getEmployeeById, getAllEmployees });
}

export default EmployeeService;
