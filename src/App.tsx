import "./App.css";
import Graph from "./components/Graph";
import axios from "axios";
import { useState, useEffect, ReactElement } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = useState<ReactElement>();
  const url = "http://localhost:5000/exchange-rate/2023-11-12/2023-11-21/";
  useEffect(() => {
    axios
      .get(url)
      .then(
        (result) => {
          setDisplay(
            <div>
              {Object.keys(result.data.rates[0].rates).map((key) =>
                key !== "_id" ? (
                  <Graph
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
                ) : (
                  <span></span>
                )
              )}
            </div>
          );
        }
        // result.data.rates.map((item: { date: any; rates: any }) => (
        //   <div>
        //     <p>{item.date}</p>

        //     {Object.keys(item.rates).map((key) => (
        //       <p>
        //         {key}:{item.rates[key]}
        //       </p>
        //     ))}
        //   </div>
        // ))
      )
      .catch((error) => {
        console.error(error);
        throw error;
      });
    setLoading(false);
  }, []);

  return (
    <div>
      COW Exchange
      {loading}
      {display}
    </div>
  );
}

export default App;
