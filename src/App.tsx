import "./App.css";
import Graph from "./components/Graph";
import axios from "axios";
import { useState, useEffect, ReactElement } from "react";
import NavBar from "./components/NavBar";
import Description from "./components/Description";

function App() {
  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = useState<ReactElement>();
  const url = "http://localhost:5000/exchange-rate/2023-11-12/2023-11-21/";
  useEffect(() => {
    axios
      .get(url)
      .then((result) => {
        setDisplay(
          <div>
            {Object.keys(result.data.rates[0].rates).map((key) =>
              key === "_id" || key === "HRK" || key === "RUB" ? (
                <span key={key}></span>
              ) : (
                <div className="container" key={key}>
                  <Graph
                    key={key}
                    currency={key}
                    dateRates={result.data.rates.map(
                      (item: { date: string; rates: {} }) => {
                        return {
                          date: item.date,
                          rate: item.rates[key as keyof typeof item.rates],
                        };
                      }
                    )}
                  />
                  <Description />
                </div>
              )
            )}
          </div>
        );
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
    setLoading(false);
  }, []);

  return (
    <div className="tile">
      <div className="main">
        <NavBar />
        {loading ? "loading" : display}
      </div>
    </div>
  );
}

export default App;
