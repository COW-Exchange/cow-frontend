import "./Graph.css";
import logo from "../images/cow_logo_01.png";
import dot from "../images/cow512.png";

type graphProps = {
  baseCurrency: string;
  currency: string;
  dateRates: { date: string; rate: number }[];
  timeSelect: string;
};
export default function Graph({
  baseCurrency,
  currency,
  dateRates,
  timeSelect,
}: graphProps) {
  function findMedian(arr: number[]) {
    arr.sort((a, b) => a - b);
    const middleIndex = Math.floor(arr.length / 2);

    if (arr.length % 2 === 0) {
      return (arr[middleIndex - 1] + arr[middleIndex]) / 2;
    } else {
      return arr[middleIndex];
    }
  }
  function getBaseLog(x: number, y: number) {
    return Math.log(y) / Math.log(x);
  }
  let max: number = 0;
  let min: number = 100000;
  dateRates.forEach((day) => {
    if (day.rate > max) {
      max = day.rate;
    }
    if (day.rate < min) {
      min = day.rate;
    }
  });
  const median = findMedian(Object.values(dateRates.map((day) => day.rate)));
  const maxPercent = (max / median) * 100 - 100;
  const minPercent = ((min / median) * 100 - 100) * -1;
  const minFloor = (-1 * Math.floor(minPercent * 10)) / 10;
  const maxFloor = Math.floor(maxPercent * 10) / 10;
  return (
    <div className="graph-container">
      <h2>{currency}</h2>
      <div className="graph">
        {minFloor !== 0 ? (
          <div
            className="relative underline median"
            style={{
              bottom:
                (
                  5 +
                  ((median + (median * minFloor) / 100 - min) / (max - min)) *
                    90
                ).toString() + "%",
            }}
          >
            {minFloor}%
          </div>
        ) : (
          ""
        )}
        {maxFloor !== 0 ? (
          <div
            className="relative underline median"
            style={{
              bottom:
                (
                  5 +
                  ((median + (median * maxFloor) / 100 - min) / (max - min)) *
                    90
                ).toString() + "%",
            }}
          >
            {maxFloor}%
          </div>
        ) : (
          ""
        )}
        <div
          className="relative underline median"
          style={{
            bottom: (5 + ((median - min) / (max - min)) * 90).toString() + "%",
          }}
        >
          M
        </div>
        {dateRates.map((dayRate) => (
          <div className="column" key={currency + dayRate.date}>
            <div
              className="column-label"
              style={{
                height:
                  (
                    100 -
                    ((dayRate.rate - min) / (max - min)) * 100
                  ).toString() + "%",
              }}
            >
              <span className="value">
                {getBaseLog(10, dayRate.rate) < -2 ? (
                  <span>
                    {dayRate.rate.toExponential().toString().slice(0, 6)} · 10
                    <sup>
                      {dayRate.rate.toExponential().toString().slice(-2)}
                    </sup>
                  </span>
                ) : (
                  Math.round(dayRate.rate * 100000) / 100000
                )}{" "}
                {baseCurrency}
              </span>
              <img
                className={
                  timeSelect === "week" || timeSelect === "month"
                    ? "HQdot"
                    : "dot"
                }
                src={
                  timeSelect === "week" || timeSelect === "month" ? logo : dot
                }
                alt="*"
                key={currency + dayRate.date + "logo"}
              />
            </div>

            <div
              className="column-value"
              key={currency + dayRate.date + "value"}
              style={{
                height:
                  (((dayRate.rate - min) / (max - min)) * 100).toString() + "%",
              }}
            >
              <span className="date">{dayRate.date.slice(0, 10)}</span>
            </div>
          </div>
        ))}
        <div className="legend-container">
          <div className="relative-legend-container">
            <span className="legend">
              M={Math.round(median * 100000) / 100000}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
