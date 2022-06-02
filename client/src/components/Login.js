import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Context from "./Context";
import "./style.css";

const Login = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [user, setUser] = useContext(Context);

  useEffect(() => {
    if (user.isLoggedin && !user.isAdmin) {
      navigate("/user");
    }
    if (user.isLoggedin && user.isAdmin) {
      navigate("/generate");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (userData.email === "admin" && userData.password === "admin") {
      setUser({ ...user, isAdmin: true, isLoggedin: true });
      navigate("/generate");
    } else {
      try {
        const user = await axios.post(
          "http://localhost:5000/user/login",
          userData
        );
        const { ...u } = user.data.user;
        u.isLoggedin = true;
        u.isAdmin = false;
        await setUser(u);
        clear();
        navigate("/user");
      } catch (error) {
        alert(error.response.data.message);
      }
    }
  };

  const clear = () => {
    setUserData({ ...userData, password: "", email: "" });
  };

  return (
    <div className="login-section">
      <h1>Login</h1>
      <form>
        <div className="textinput">
          <label htmlFor="email">Email</label>
          <input
            type={"text"}
            name="email"
            id="email"
            value={userData["email"]}
            onChange={(e) => {
              setUserData({ ...userData, email: e.target.value });
            }}
            placeholder="Email"
          />
        </div>
        <div className="textinput">
          <label htmlFor="password">Password</label>
          <input
            type={"password"}
            name="password"
            id="password"
            value={userData["password"]}
            onChange={(e) => {
              setUserData({ ...userData, password: e.target.value });
            }}
            placeholder="Password"
          />
        </div>
        <div className="btn">
          <input
            type={"submit"}
            value="login"
            onClick={handleLogin}
            className="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
