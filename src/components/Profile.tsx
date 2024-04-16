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
      .put(url + "/users/settings", { user: userData })
      .then((res) => {})
      .catch((e) => console.log(e));
  }, [url, userData]);
  return (
    <div className="formbox">
      <div className="dropdown">
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
    </div>
  );
}
