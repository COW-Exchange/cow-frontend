import axios from "axios";
import { useState, useEffect, ReactElement } from "react";

import Graph from "./Graph";
import Description from "./Description";
type mainProps = {
  timeframe: { from: string; to: string };
  timeSelect: string;
  baseCurrency: string;
  setCurrencies: React.Dispatch<React.SetStateAction<string[]>>;
  currencies: string[];
  url: string;
};

export default function Main({
  timeframe,
  timeSelect,
  baseCurrency,
  setCurrencies,
  currencies,
  url,
}: mainProps) {
  const [exchangeRates, setExchangeRates] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = useState<ReactElement>();

  useEffect(() => {
    try {
      axios
        .get(url + `/exchange-rate/${timeframe.from}/${timeframe.to}/`)
        .then((result) => {
          setExchangeRates(result.data.rates);
        })
        .catch((error) => {
          console.error(error);
          throw error;
        })
        .finally(() => setLoading(false));
    } catch (e) {
      console.log(e);
    }
  }, [timeframe, url]);

  useEffect(() => {
    if (exchangeRates) {
      setDisplay(
        <div>
          {currencies.map((key) =>
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
                            : key === "EUR"
                            ? item.rates[
                                baseCurrency as keyof typeof item.rates
                              ]
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
  }, [exchangeRates, baseCurrency, timeSelect, setCurrencies, currencies]);

  return <div> {loading ? <p>loading</p> : display}</div>;
}
