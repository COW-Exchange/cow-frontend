import React from "react";

type graphProps = {
  currency: string;
  dateRates: { date: string; rate: number }[];
};
export default function Graph({ currency, dateRates }: graphProps) {
  console.log(dateRates);

  return (
    <div>
      {currency}
      <br />
      {dateRates.map((dayRate) => (
        <div>
          {dayRate.date}:{dayRate.rate}
        </div>
      ))}
    </div>
  );
}
