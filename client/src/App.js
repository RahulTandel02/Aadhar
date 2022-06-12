import Login from "./components/Login";
import GenerateAadhar from "./components/GenerateAadhar";
import User from "./components/User";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Context from "./components/Context";
import { useState } from "react";

function App() {
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    isAdmin: false,
    isLoggedin: false,
    role: "user",
  });
  return (
    <div className="App">
      <Context.Provider value={[userData, setUserData]}>
        <Router>
          <Routes>
            <Route exact path="/" element={<Login />}></Route>
            <Route path="/generate" element={<GenerateAadhar />}></Route>
            <Route path="/user" element={<User />}></Route>
          </Routes>
        </Router>
      </Context.Provider>
    </div>
  );
}

export default App;
