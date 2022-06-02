import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Context from "./Context";
import { useNavigate } from "react-router-dom";

const GenerateAadhar = () => {
  const [user, setUser] = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user.isAdmin) {
      navigate("/");
    }
  }, []);

  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
    address: "",
  });

  const handleLogout = () => {
    setUser({ ...user, isLoggedin: false, isAdmin: false });
    navigate("/");
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/user", userData);
      alert("user created");
    } catch (error) {
      alert(error.response.data.message);
    }
    setUserData({
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      password: "",
      address: "",
    });
  };
  return (
    <div className="generate-section">
      <h2>Generate Aadhar</h2>
      <form>
        <div className="textinput">
          <label htmlFor="first_name">First Name</label>
          <input
            type={"text"}
            name="first_name"
            id="f_name"
            required
            onChange={(e) =>
              setUserData({ ...userData, first_name: e.target.value })
            }
          />
        </div>
        <div className="textinput">
          <label htmlFor="last_name">Last Name</label>
          <input
            type={"text"}
            name="last_name"
            id="l_name"
            required
            onChange={(e) =>
              setUserData({ ...userData, last_name: e.target.value })
            }
          />
        </div>
        <div className="textinput">
          <label htmlFor="phone">Phone</label>
          <input
            type={"text"}
            name="phone"
            id="phone"
            required
            onChange={(e) =>
              setUserData({ ...userData, phone: e.target.value })
            }
          />
        </div>
        <div className="textinput">
          <label htmlFor="email">Email</label>
          <input
            type={"email"}
            name="email"
            id="email"
            required
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
        </div>
        <div className="textinput">
          <label htmlFor="password">Password</label>
          <input
            type={"password"}
            name="password"
            id="password"
            required
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
        </div>
        <div className="textinput ">
          <label htmlFor="address">Address</label>
          <textarea
            cols={20}
            rows={3}
            name="address"
            id="address"
            required
            onChange={(e) =>
              setUserData({ ...userData, address: e.target.value })
            }
          />
        </div>
        <input
          type={"submit"}
          value="Create"
          onClick={handelSubmit}
          className="submit"
        />
      </form>
      <button className="submit" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default GenerateAadhar;
