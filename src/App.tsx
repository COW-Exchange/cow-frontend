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
  const [exchangeRates, setExchangeRates] = useState<any>();
  const [currencies, setCurrencies] = useState<string[]>();
  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = useState<ReactElement>();
  const [timeframe, setTimeframe] = useState<{ from: string; to: string }>({
    from: convertDate(new Date(new Date().getTime() - 60 * 60 * 24 * 7 * 1000)),
    to: convertDate(new Date()),
  });
  const [timeSelect, setTimeSelect] = useState("week");
  const [baseCurrency, setBasyCurrency] = useState("EUR");

  useEffect(() => {
    axios
      .get(`${url}/exchange-rate/${timeframe.from}/${timeframe.to}/`)
      .then((result) => {
        setExchangeRates(result.data.rates);
      })
      .catch((error) => {
        console.error(error);
        throw error;
      })
      .finally(() => setLoading(false));
  }, [timeframe]);

  useEffect(() => {
    if (exchangeRates) {
      setCurrencies(
        Object.keys(exchangeRates[0].rates).filter(
          (currency) =>
            currency !== "_id" &&
            currency !== "HRK" &&
            currency !== "RUB" &&
            currency !== "BGN"
        )
      );
      setDisplay(
        <div>
          {Object.keys(exchangeRates[0].rates).map((key) =>
            key === "_id" ||
            key === "HRK" ||
            key === "RUB" ||
            key === "BGN" ||
            key === baseCurrency ? (
              <span key={key}></span>
            ) : (
              <div className="container" key={key}>
                <Graph
                  key={key}
                  baseCurrency={baseCurrency}
                  currency={key}
                  timeSelect={timeSelect}
                  dateRates={exchangeRates.map(
                    (item: { date: string; rates: {} }) => {
                      return {
                        date: item.date,
                        rate:
                          baseCurrency === "EUR"
                            ? 1 / item.rates[key as keyof typeof item.rates]
                            : item.rates[
                                baseCurrency as keyof typeof item.rates
                              ] / item.rates[key as keyof typeof item.rates],
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
    }
  }, [exchangeRates, baseCurrency, timeSelect]);

  return (
    <div className="tile" key={"tile"}>
      <div className="main" key={"main"}>
        <NavBar
          timeframe={timeframe}
          setTimeframe={setTimeframe}
          convertDate={convertDate}
          timeSelect={timeSelect}
          setTimeSelect={setTimeSelect}
          baseCurrency={baseCurrency}
          setBaseCurrency={setBasyCurrency}
          currencies={currencies}
        />
        {loading ? <p>loading</p> : display}
      </div>
    </div>
  );
}

export default App;
