import axios from "axios";

const LEAVE_URI = "http://localhost:8084";

function LeaveService() {
  const applyLeave = async (leave) => {
    return await axios.post(`${LEAVE_URI}/applyleaverequest`, leave);
  };

  const verifyLeave = async (leaveId, status, remarks) => {
    return await axios.put(
      `${LEAVE_URI}/verifyleaverequest?leaveId=${leaveId}&status=${status}&remarks=${remarks}`
    );
  };

  const getLeaveHistory = async (empId) => {
    return await axios.get(`${LEAVE_URI}/viewleavehistory?empId=${empId}`);
  };

  const getAllLeaves = async () => {
    return await axios.get(`${LEAVE_URI}/viewallleaves`);
  };

  const getPendingLeaves = async (managerId) => {
    console.log("Fetching pending leaves for manager:", managerId);
    return await axios.get(`${LEAVE_URI}/verifyleaverequests?managerId=${managerId}`);
  };

  return Object.freeze({
    applyLeave,
    verifyLeave,
    getLeaveHistory,
    getAllLeaves,
    getPendingLeaves
  });
}

export default LeaveService;
