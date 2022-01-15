import { useState, useEffect } from "react";
import axios from "axios";
import Log from "./Log";

function Logs() {
  const [logs, setLogs] = useState([]);
  const URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios
      .get(`${URL}/logs`)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        setLogs(response.data);
      })
      .catch((e) => console.log("catch", e));
  }, []);

  if (!logs) {
    return null;
  }

  return (
    <div className="Logs">
      <section>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Take me there</th>
              <th>See this log</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => {
              return <Log key={index} log={log} index={index} />;
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Logs;
