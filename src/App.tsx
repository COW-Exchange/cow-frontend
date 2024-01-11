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
// Milk your investments
// The grass is greener in other currencies
// Teach a man to COW and you financed him for a lifetime
// Move your "live"stock for sustainability
// Have you heard about the tragedy of the commons? Protect our pastures!
// MUUsic to your wallet
// Money is not just in THAT type of grass.
// Money doesn't grow on trees it grows on lush green fields.
// I don't see you smile. You need some cheeese!
// We are the MOOsicians of finances.
// Those rates are MOOving!
// Why don’t cows have any money? Because farmers milk them dry!
// How did the beef make its fortune? It “brisket” all!
// What do you call a cow that can solve complex math problems? A “steak”holder!
// We wish us all a bullish market!
// Make loud noises by yelling, banging pots and pans to keep the bear market away!
// If the bear market comes don't play dead, buy!

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
