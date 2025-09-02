import axios from "axios";

const USER_URI = "http://localhost:8084/user";

function AuthService() {
  const loginValidate = async (login) => {
    return await axios.post(`${USER_URI}/login`, login);
  };

  return Object.freeze({ loginValidate });
}

export default AuthService;
