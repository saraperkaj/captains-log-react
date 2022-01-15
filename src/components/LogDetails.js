import axios from "axios";
import { useState, useEffect } from "react";
import { Link, Navigate, useParams, useNavigate } from "react-router-dom";

function LogDetails() {
  const [log, setLog] = useState([]);
  let { index } = useParams();
  const URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${URL}/logs/${index}`).then((response) => {
      setLog(response.data);
    });
  }, []);

  const handleDelete = () => {
    axios.delete(`${URL}/logs/${index}`).then(() => navigate("/logs"));
  };

  return (
    <article>
      <h3>
        {log.mistakesWereMadeToday ? <span>⭐️</span> : null} {log.name}
      </h3>
      <h5>
        <span>
          <p>{log.captainName}</p>
        </span>{" "}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {log.captainName}
      </h5>
      <h6>{log.title}</h6>
      <p>{log.post}</p>
      <p>{log.daysSinceLastCrisis}</p>
      <div className="showNavigation">
        <div>
          {" "}
          <Link to={`/logs`}>
            <button>Back</button>
          </Link>
        </div>
        <div>
          {" "}
          <Link to={`/logs/${index}/edit`}>
            <button>Edit</button>
          </Link>
        </div>
        <div>
          {" "}
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </article>
  );
}

export default LogDetails;
