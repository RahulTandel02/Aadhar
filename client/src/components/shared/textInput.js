import React, { useState, useContext } from "react";
import Context from "../Context";

const TextInput = ({ placeholder, isPassword, readOnly }) => {
  const [userData, setUserData] = useContext(Context);
  const userProperty = placeholder.replace(/ /g, "_");
  return (
    <div className="textinput">
      <label htmlFor={userProperty}>{placeholder}</label>
      <input
        type={isPassword ? "password" : "text"}
        name={userProperty}
        id={userProperty}
        value={userData[userProperty]}
        required
        readOnly={readOnly}
        onChange={(e) =>
          setUserData({ ...userData, [userProperty]: e.target.value })
        }
      />
    </div>
  );
};

export default TextInput;
