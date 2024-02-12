import { currencies, currencyDescriptions } from "../texts";

export default function Description({ currency }: { currency: string }) {
  return (
    <div>
      <h2>About the {currencies[currency as keyof typeof currencies]}</h2>
      <div className="description">
        {currencyDescriptions[currency as keyof typeof currencies]}
      </div>
    </div>
  );
}
