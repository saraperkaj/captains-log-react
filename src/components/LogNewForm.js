import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LogNewForm() {
  const URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const [log, setLog] = useState({
    captainName: "",
    title: "",
    post: "",
    mistakesWereMadeToday: false,
    daysSinceLastCrisis: 0,
  });

  const handleTextChange = (event) => {
    setLog({ ...log, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setLog({ ...log, mistakesWereMadeToday: !log.mistakesWereMadeToday });
  };

  //optional pt.1
  // const addlog = (newlog) => {
  //   axios
  //     .post(`${URL}/logs`, newlog)
  //     .then(() => navigate("/logs"));
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    //usually how it's done
    axios.post(`${URL}/logs`, log).then(() => navigate("/logs"));

    //optional pt.2
    // addlog(log);
  };
  return (
    <div className="New">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Captain's Name:</label>
        <input
          id="name"
          value={log.captainName}
          type="text"
          onChange={handleTextChange}
          placeholder="Name of Captain"
          required
        />
        <label htmlFor="category">Title:</label>
        <input
          id="category"
          type="text"
          name="category"
          value={log.title}
          placeholder="Whale, Courage, Vandal..."
          onChange={handleTextChange}
        />
        <label htmlFor="category">Days Since Last Crisis:</label>
        <input
          id="category"
          type="number"
          name="category"
          value={log.daysSinceLastCrisis}
          placeholder="Whale, Courage, Vandal..."
          onChange={handleTextChange}
        />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={log.post}
          onChange={handleTextChange}
          placeholder="Describe why you logged this"
        />
        <label htmlFor="mistakesWereMadeToday">Mistake?:</label>
        <input
          id="mistakesWereMadeToday"
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={log.mistakesWereMadeToday}
        />
        <br />

        <input type="submit" />
      </form>
    </div>
  );
}

export default LogNewForm;
