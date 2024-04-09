import axios from "axios";
import { useState, useEffect } from "react";

type profileProps = { currencies: string[] };

export default function Profile({ currencies }: profileProps) {
  const url =
    process.env.NODE_ENV === "development" ? "" : process.env.REACT_APP_URL;
  const [userData, setUserData] = useState({
    _id: "",
    id: "",
    selectedCurrencies: {},
    ownCurrencies: {},
    baseCurrency: "EUR",
  });
  useEffect(() => {
    try {
      axios
        .get(url + "/users/profile", { withCredentials: true })
        .then((res) => setUserData(res.data.user));
    } catch (e) {
      console.log(e);
    }
  }, [url, setUserData]);

  return (
    <div>
      Base currency:{" "}
      <select
        name="baseSelect"
        id="base-select"
        value={userData.baseCurrency}
        onChange={(e) => {
          setUserData({ ...userData, baseCurrency: e.target.value });
        }}
      >
        <option value="EUR">EUR</option>

        {currencies?.map((currency) => (
          <option value={currency} key={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
}
