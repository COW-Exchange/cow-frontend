import axios from "axios";
import { useEffect } from "react";
import { UserData } from "../App";

type profileProps = {
  currencies: string[];
  userData: Partial<UserData>;
  setUserData: React.Dispatch<React.SetStateAction<Partial<UserData>>>;
  url: string;
};

export default function Profile({
  currencies,
  userData,
  setUserData,
  url,
}: profileProps) {
  useEffect(() => {
    axios
      .get(url + "/users/profile", { withCredentials: true })
      .then((res) => setUserData(res.data.user))
      .catch((e) => console.log(e));
  }, [url, setUserData]);

  useEffect(() => {
    axios
      .put(url + "/users/settings", { withCredentials: true, user: userData })
      .then((res) => {})
      .catch((e) => console.log(e));
  }, [url, userData]);
  return (
    <div className="profile">
      <div className="formbox">
        <div className="dropdown">
          <h3>Base currency:</h3>
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
      </div>
      <div className="formbox">
        <h3>Currencies you are interested in:</h3>
        <div className="grid">
          {currencies.map((currency) => (
            <div className="checkbox" key={"selected" + currency}>
              <span>{currency}</span>
              <input
                type="checkbox"
                value={currency}
                defaultChecked={userData.selectedCurrencies?.[currency]}
                onChange={() =>
                  setUserData({
                    ...userData,
                    selectedCurrencies: {
                      ...userData.selectedCurrencies,
                      [currency as keyof typeof userData.selectedCurrencies]:
                        !userData.selectedCurrencies?.[currency],
                    },
                  })
                }
              />
            </div>
          ))}
        </div>
      </div>
      <div className="formbox">
        <h3>Currencies you own:</h3>

        <div className="grid">
          {currencies.map((currency) => (
            <div className="checkbox" key={"own" + currency}>
              <span>{currency}</span>
              <input
                type="checkbox"
                value={currency}
                defaultChecked={userData.ownCurrencies?.[currency]}
                onChange={() =>
                  setUserData({
                    ...userData,
                    ownCurrencies: {
                      ...userData.ownCurrencies,
                      [currency as keyof typeof userData.ownCurrencies]:
                        !userData.ownCurrencies?.[currency],
                    },
                  })
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
