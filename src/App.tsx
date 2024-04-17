import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

import "./App.css";

import NavBar from "./components/NavBar";
import Main from "./components/Main";
import Privacy from "./components/Privacy";
import Register from "./components/Register";
import LogIn from "./components/LogIn";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";

export const url =
  process.env.NODE_ENV === "development"
    ? ""
    : (process.env.REACT_APP_URL as string);

//this needs to be cleaned up, no need to double call currencies from backend
let exchangeSettings: { [key: string]: boolean } = {};
axios
  .get(url + "/exchange-rate/currencies")
  .then((res) =>
    res.data.currencies.forEach(
      (currency: string) => (exchangeSettings[currency] = false)
    )
  )
  .catch(() => console.log("error"));

export interface UserData {
  _id: string;
  id: string;
  selectedCurrencies: typeof exchangeSettings;
  ownCurrencies: typeof exchangeSettings;
  baseCurrency: string;
  timeFrame: number;
}
export function logOut() {
  axios
    .post(url + "/users/logout")
    .then((res) => console.log(res.data.message))
    .catch((e) => console.log(e));
}

function convertDate(date: Date) {
  const mm = date.getMonth() + 1; // getMonth() is zero-based
  const dd = date.getDate();
  return [
    date.getFullYear(),
    (mm > 9 ? "" : "0") + mm,
    (dd > 9 ? "" : "0") + dd,
  ].join("-");
}

function App() {
  const [userData, setUserData] = useState<Partial<UserData>>({});
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [timeframe, setTimeframe] = useState<{ from: string; to: string }>({
    from: convertDate(
      new Date(new Date().getTime() - 60 * 60 * 24 * 30 * 1000)
    ),
    to: convertDate(new Date()),
  });
  const [timeSelect, setTimeSelect] = useState("month");
  const [baseCurrency, setBaseCurrency] = useState("EUR");
  useEffect(() => {
    axios
      .get(url + "/exchange-rate/currencies")
      .then((res) => setCurrencies(res.data.currencies))
      .catch((e) => console.log(e));
  }, []);
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
          setBaseCurrency={setBaseCurrency}
          currencies={currencies}
        />
        <Routes>
          <Route
            path="/"
            index
            element={
              <Main
                timeframe={timeframe}
                timeSelect={timeSelect}
                baseCurrency={baseCurrency}
                setCurrencies={setCurrencies}
                currencies={currencies}
              />
            }
          />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LogIn url={url} />} />
          <Route
            path="/profile"
            element={
              Number(localStorage.logged) > Number(Date.now()) ? (
                <Profile
                  currencies={currencies}
                  userData={userData}
                  setUserData={setUserData}
                  url={url}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
