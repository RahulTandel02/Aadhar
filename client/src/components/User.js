import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Context from "./Context";
const User = () => {
  const navigate = useNavigate();
  const [user, setUser] = useContext(Context);
  const [password, setPassword] = useState({
    password: "",
  });
  const handleLogout = () => {
    setUser({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      address: "",
      phone: "",
      isAdmin: false,
      isLoggedin: false,
    });
    navigate("/");
  };

  const handleUpdate = () => {
    document.getElementById("id").style.display = "block";
    document.getElementById("main").style.display = "none";
  };

  const updatePassword = async () => {
    if (!password) {
      alert("Please Enter New Password");
    } else {
      try {
        await axios.put(`http://localhost:5000/user/${user?._id}`, password);
        alert("Password Updated");
      } catch (error) {
        alert("Something went wrong");
      }
      document.getElementById("id").style.display = "none";
      document.getElementById("main").style.display = "block";
    }
  };

  return (
    <>
      <div className="login-section" id="main">
        <h1>User</h1>
        <div className="textinput">
          <label>Name </label>
          <input
            type={"text"}
            value={user?.first_name + " " + user?.last_name}
            readOnly
          />
        </div>
        <div className="textinput">
          <label>Email </label>
          <input type={"text"} value={user?.email} readOnly />
        </div>
        <div className="textinput">
          <label>Phone </label>
          <input type={"text"} value={user?.phone} readOnly />
        </div>
        <div className="textinput">
          <label>Address </label>
          <input type={"text"} value={user?.address} readOnly />
        </div>
        <div className="textinput">
          <label>Aadhar Number </label>
          <input type={"text"} value={user?.aadhar} readOnly />
        </div>
        <button className="submit" onClick={handleLogout}>
          Logout
        </button>
        <button className="submit" onClick={handleUpdate}>
          Update Password
        </button>
      </div>
      <div className="login-section update textinput" id="id">
        <h2>Update Password</h2>
        <input
          type={"password"}
          placeholder="New Password"
          value={password["password"]}
          onChange={(e) => setPassword({ password: e.target.value })}
        />
        <input type={"submit"} className="submit" onClick={updatePassword} />
      </div>
    </>
  );
};

export default User;
