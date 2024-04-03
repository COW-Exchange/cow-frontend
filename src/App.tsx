import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import NavBar from "./components/NavBar";
import Main from "./components/Main";
import Privacy from "./components/Privacy";
import Register from "./components/Register";
import LogIn from "./components/LogIn";

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
  const [currencies, setCurrencies] = useState<string[]>();
  const [timeframe, setTimeframe] = useState<{ from: string; to: string }>({
    from: convertDate(
      new Date(new Date().getTime() - 60 * 60 * 24 * 30 * 1000)
    ),
    to: convertDate(new Date()),
  });
  const [timeSelect, setTimeSelect] = useState("month");
  const [baseCurrency, setBaseCurrency] = useState("EUR");

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
            element={
              <Main
                timeframe={timeframe}
                timeSelect={timeSelect}
                baseCurrency={baseCurrency}
                setCurrencies={setCurrencies}
              />
            }
          />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
