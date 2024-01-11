import logo from "../images/cow_logo_01.png";

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
};

export default function NavBar({
  timeframe,
  setTimeframe,
  convertDate,
  timeSelect,
  setTimeSelect,
}: navProps) {
  return (
    <div id="navbar">
      <img src={logo} alt="COW Exchange" />
      <div className="dropdown">
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
            if (e.target.value === "custom") {
              setTimeframe({
                from: convertDate(
                  new Date(new Date().getTime() - 60 * 60 * 24 * 7 * 1000)
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
      </div>
    </div>
  );
}
