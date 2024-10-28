import axios from "axios";
import { useEffect } from "react";
import { UserData } from "../App";
import { logOut } from "../App";

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
      .get(url + "/users/profile", {
        withCredentials: true,
        // withXSRFToken: true,
      })
      .then((res) => setUserData(res.data.user))
      .catch((e) => console.log(e));
  }, [url, setUserData]);

  useEffect(() => {
    axios
      .put(
        url + "/users/settings",
        { user: userData },
        {
          withCredentials: true,

          // withXSRFToken: true,
        }
      )
      .then((res) => {})
      .catch((e) => console.log(e));
  }, [url, userData]);
  return (
    <div className="profile">
      <div id="base" className="formbox">
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
            {currencies?.map((currency) => (
              <option value={currency} key={currency} id={"dd" + currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div id="interest" className="formbox">
        <h3>Currencies you are interested in:</h3>
        <div className="grid">
          {currencies.map((currency) => (
            <div className="checkbox" key={"selected" + currency}>
              <span>{currency}</span>
              <input
                type="checkbox"
                value={currency}
                id={"select" + currency}
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
      <div id="own" className="formbox">
        <h3>Currencies you own:</h3>

        <div className="grid">
          {currencies.map((currency) => (
            <div className="checkbox" key={"own" + currency}>
              <span>{currency}</span>
              <input
                type="checkbox"
                value={currency}
                id={"own" + currency}
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
      <div id="foot" className="formbox">
        <button onClick={() => logOut()}>Log Out</button>
      </div>
    </div>
  );
}
