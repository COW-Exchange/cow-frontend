import "./App.css";
import Graph from "./components/Graph";
import axios from "axios";
import { useState, useEffect, ReactElement } from "react";
import NavBar from "./components/NavBar";
import Description from "./components/Description";

function convertDate(date: Date) {
  const mm = date.getMonth() + 1; // getMonth() is zero-based
  const dd = date.getDate();
  return [
    date.getFullYear(),
    (mm > 9 ? "" : "0") + mm,
    (dd > 9 ? "" : "0") + dd,
  ].join("-");
}
const url = process.env.REACT_APP_URL;

function App() {
  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = useState<ReactElement>();
  const [timeframe, setTimeframe] = useState<{ from: string; to: string }>({
    from: convertDate(new Date(new Date().getTime() - 60 * 60 * 24 * 7 * 1000)),
    to: convertDate(new Date()),
  });
  const [timeSelect, setTimeSelect] = useState("week");

  useEffect(() => {
    axios
      .get(`${url}/exchange-rate/${timeframe.from}/${timeframe.to}/`)
      .then((result) => {
        setDisplay(
          <div>
            {Object.keys(result.data.rates[0].rates).map((key) =>
              key === "_id" ||
              key === "HRK" ||
              key === "RUB" ||
              key === "BGN" ? (
                <span key={key}></span>
              ) : (
                <div className="container" key={key}>
                  <Graph
                    key={key}
                    currency={key}
                    timeSelect={timeSelect}
                    dateRates={result.data.rates.map(
                      (item: { date: string; rates: {} }) => {
                        return {
                          date: item.date,
                          rate: item.rates[key as keyof typeof item.rates],
                        };
                      }
                    )}
                  />
                  <Description currency={key} />
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
  }, [timeframe, timeSelect]);

  return (
    <div className="tile">
      <div className="main">
        <NavBar
          timeframe={timeframe}
          setTimeframe={setTimeframe}
          convertDate={convertDate}
          timeSelect={timeSelect}
          setTimeSelect={setTimeSelect}
        />
        {loading ? "loading" : display}
      </div>
    </div>
  );
}

export default App;
