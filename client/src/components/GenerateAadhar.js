import React, { useEffect, useContext } from "react";
import axios from "axios";
import Context from "./Context";
import { useNavigate } from "react-router-dom";
import TextInput from "./shared/textInput";

const GenerateAadhar = () => {
  const [userData, setUserData] = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userData.isAdmin) {
      navigate("/");
    }
  }, []);

  const handleLogout = () => {
    setUserData({ ...userData, isLoggedin: false, isAdmin: false });
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
      role: "user",
    });
  };

  return (
    <div className="generate-section">
      <h2>Generate Aadhar</h2>
      <form>
        <TextInput placeholder={"first name"} />
        <TextInput placeholder={"last name"} />
        <TextInput placeholder={"phone"} />
        <TextInput placeholder={"email"} />
        <TextInput placeholder={"password"} isPassword={true} />
        <div className="textinput ">
          <label htmlFor="address">Address</label>
          <textarea
            cols={20}
            rows={3}
            name="address"
            id="address"
            value={userData["address"]}
            required
            onChange={(e) =>
              setUserData({ ...userData, address: e.target.value })
            }
          />
        </div>
        <div className="textinput">
          <label htmlFor="role">Role</label>
          <select
            name="role"
            id="role"
            value={userData.role}
            onChange={(e) => {
              setUserData({ ...userData, role: e.target.value });
            }}
          >
            <option value={"user"}>User</option>
            <option value={"minister"}>Minister</option>
          </select>
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
