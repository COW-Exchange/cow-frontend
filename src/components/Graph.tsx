import "./Graph.css";

type graphProps = {
  currency: string;
  dateRates: { date: string; rate: number }[];
};
export default function Graph({ currency, dateRates }: graphProps) {
  let max: number = 0;
  let min: number = 100000;
  dateRates.forEach((day) => {
    day.rate > max ? (max = day.rate) : (max = max);
    day.rate < min ? (min = day.rate) : (min = min);
  });
  console.log(min, max);
  return (
    <div>
      <h2>{currency}</h2>
      <div className="graph">
        {dateRates.map((dayRate) => (
          <div
            key={currency + dayRate.date}
            style={{
              height:
                (
                  ((dayRate.rate - min * 0.99) / (max - min * 0.99)) *
                  100
                ).toString() + "%",
            }}
          >
            <span>{dayRate.date.slice(0, 10) + " : " + dayRate.rate}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
