import logo from "../images/cow_logo_01.png";
import { sloganArray } from "../texts";
import { useMemo } from "react";

type navProps = {
  timeframe: { from: string; to: string };
  setTimeframe: React.Dispatch<
    React.SetStateAction<{
      from: string;
      to: string;
    }>
  >;
  convertDate: Function;
  timeSelect: string;
  setTimeSelect: React.Dispatch<React.SetStateAction<string>>;
  baseCurrency: string;
  setBaseCurrency: React.Dispatch<React.SetStateAction<string>>;
  currencies: string[] | undefined;
};

export default function NavBar({
  timeframe,
  setTimeframe,
  convertDate,
  timeSelect,
  setTimeSelect,
  baseCurrency,
  setBaseCurrency,
  currencies,
}: navProps) {
  const slogan = useMemo(
    () => sloganArray[Math.floor(Math.random() * sloganArray.length)],
    []
  );

  return (
    <div id="navbar">
      <img src={logo} alt="COW Exchange" />
      <div className="dropdown" key={"timeframe"}>
        <span>Grazing time:</span>
        <select
          name="timeSelect"
          id="time-select"
          value={timeSelect}
          onChange={(e) => {
            setTimeSelect(e.target.value);
            if (e.target.value === "week") {
              setTimeframe({
                from: convertDate(
                  new Date(new Date().getTime() - 60 * 60 * 24 * 7 * 1000)
                ),
                to: convertDate(new Date()),
              });
            }
            if (e.target.value === "month") {
              setTimeframe({
                from: convertDate(
                  new Date(new Date().getTime() - 60 * 60 * 24 * 30 * 1000)
                ),
                to: convertDate(new Date()),
              });
            }
            if (e.target.value === "year") {
              setTimeframe({
                from: convertDate(
                  new Date(new Date().getTime() - 60 * 60 * 24 * 365 * 1000)
                ),
                to: convertDate(new Date()),
              });
            }
          }}
        >
          <option value="week">week</option>
          <option value="month">month</option>
          <option value="year">year</option>
          <option value="custom">custom</option>
        </select>
        {timeSelect === "custom" ? (
          <div>
            <p>
              from:{" "}
              <input
                type="date"
                value={timeframe.from}
                onChange={(e) => {
                  if (new Date(e.target.value) < new Date(timeframe.to)) {
                    setTimeframe({
                      ...timeframe,
                      from: e.target.value.toString(),
                    });
                  } else {
                    alert("Beginnings are ment to be before endings.");
                  }
                }}
              ></input>
            </p>
            <p>
              to:{" "}
              <input
                type="date"
                value={timeframe.to}
                onChange={(e) => {
                  if (new Date(e.target.value) < new Date()) {
                    setTimeframe({
                      ...timeframe,
                      to: e.target.value.toString(),
                    });
                  } else {
                    alert(
                      "Although we would very much like to, we can't see into the future."
                    );
                  }
                }}
              ></input>
            </p>
          </div>
        ) : (
          <span></span>
        )}
      </div>
      <div className="dropdown" key={"currency"}>
        <span key={"base"}>Base currency: </span>
        <select
          name="baseSelect"
          id="base-select"
          value={baseCurrency}
          onChange={(e) => {
            setBaseCurrency(e.target.value);
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
      <div id="slogan" key={"slogan"}>
        <span>{slogan}</span>
      </div>
    </div>
  );
}
