import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate, Navigate } from "react-router-dom";

function LogEditForm() {
  let { index } = useParams();
  const navigate = useNavigate();

  const [log, setLog] = useState({
    captainName: "",
    title: "",
    post: "",
    mistakesWereMadeToday: false,
    daysSinceLastCrisis: 0,
  });

  const URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${URL}/logs/${index}`).then((response) => {
      console.log(response.data);
      setLog({
        captainName: response.data.captainName,
        title: response.data.title,
        post: response.data.post,
        mistakesWereMadeToday: response.data.mistakesWereMadeToday,
        daysSinceLastCrisis: response.data.daysSinceLastCrisis,
      });
    });
  }, []);

  const handleTextChange = (event) => {
    setLog({ ...log, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setLog({ ...log, mistakesWereMadeToday: !log.mistakesWereMadeToday });
  };

  useEffect(() => {}, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    //updates our state
    axios
      .put(`${URL}/logs/${index}`, log)
      .then(() => navigate(`/logs/${index}`));
  };

  return (
    <div className="Edit">
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
      <Link to={`/logs/${index}`}>
        <button>Nevermind!</button>
      </Link>
    </div>
  );
}

export default LogEditForm;
