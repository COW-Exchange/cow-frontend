import "./App.css";
import Graph from "./components/Graph";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = useState("");
  const url = "http://localhost:5000/exchange-rate/2023-11-17/2023-11-21/";
  useEffect(() => {
    axios
      .get(url)
      .then((result) => {
        console.log(result.data.rates);
        setDisplay(
          result.data.rates.map((item: { date: any; rates: any }) => (
            <div>
              <p>{item.date}</p>{" "}
              <p>
                {Object.keys(item.rates).map((key) => (
                  <p>
                    {key}:{item.rates[key]}
                  </p>
                ))}
              </p>
            </div>
          ))
        );
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
    setLoading(false);
  }, []);

  return (
    <div>
      COW Exchange
      <Graph />
      {loading}
      {display}
    </div>
  );
}

export default App;
