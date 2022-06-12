import React, { useState, useContext, useEffect } from "react";
import Context from "./Context";
import axios from "axios";

const Vote = () => {
  const [user, setUser] = useContext(Context);
  const [id, setId] = useState("default");
  const [minister, setMinisters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get("http://localhost:5000/users/ministers");
      setMinisters(data["data"]["data"]);
    };

    fetchData();
  }, []);

  const handleVoting = async () => {
    if (id !== "default") {
      if (!user.hasVoted) {
        try {
          await axios.put(`http://localhost:5000/users/ministers/${id}`, {
            Uid: user._id,
          });
          alert("Thank You for Your Vote");
          setUser({ ...user, hasVoted: true });
        } catch (error) {
          alert("Something went wrong");
        }
      } else {
        alert("You have already voted");
      }
    } else {
      alert("Please Select the Candidate First");
    }
  };

  return (
    <div>
      {!user.hasVoted && (
        <div className="textinput">
          <label htmlFor="vote">Vote</label>
          <select
            name="vote"
            id="vote"
            value={id}
            onChange={(e) => {
              setId(e.target.value);
            }}
          >
            <option value={"default"} disabled>
              Please Select the Candidate
            </option>
            {minister?.map((i, key) => (
              <option value={i._id} key={key}>
                {i["first_name"] + " " + i["last_name"]}
              </option>
            ))}
          </select>
          <button className="submit vote" onClick={handleVoting}>
            Vote
          </button>
        </div>
      )}
    </div>
  );
};

export default Vote;
