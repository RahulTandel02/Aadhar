import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TextInput from "./shared/textInput";
import Vote from "./Vote";

// Error Handling

import Context from "./Context";
const User = () => {
  const navigate = useNavigate();
  const [user, setUser] = useContext(Context);

  useEffect(() => {
    if (!user.isLoggedin) {
      navigate("/");
    }
  }, []);

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
    if (password["password"].length === 0 || !password["password"]) {
      alert("Please Enter New Password");
    } else {
      try {
        await axios.put(`http://localhost:5000/user/${user?._id}`, password);
        alert("Password Updated");
      } catch (error) {
        alert("Something went wrong");
      }
      setPassword({
        password: "",
      });
      document.getElementById("id").style.display = "none";
      document.getElementById("main").style.display = "block";
    }
  };

  return (
    <>
      <div className="login-section" id="main">
        <h1>User</h1>
        <TextInput placeholder={"first name"} readOnly={true} />
        <TextInput placeholder={"last name"} readOnly={true} />
        <TextInput placeholder={"email"} readOnly={true} />
        <TextInput placeholder={"phone"} readOnly={true} />
        <TextInput placeholder={"address"} readOnly={true} />
        <TextInput placeholder={"aadhar"} readOnly={true} />
        {user.role === "minister" ? (
          <TextInput placeholder={"num of votes"} readOnly={true} />
        ) : (
          <>
            <Vote />
          </>
        )}
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
          onChange={(e) => setPassword({ password: e.target.value.trim() })}
        />
        <input type={"submit"} className="submit" onClick={updatePassword} />
      </div>
    </>
  );
};

export default User;
