import logo from "../images/cow_logo_01.png";
import { sloganArray } from "../texts";
import { useMemo, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import Dropdowns from "./Dropdowns";
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
  const [menuOpen, setMenuOpen] = useState<Boolean>(false);
  const slogan = useMemo(
    () => sloganArray[Math.floor(Math.random() * sloganArray.length)],
    []
  );

  return (
    <div id="navbar">
      <a href="/">
        <img src={logo} alt="COW Exchange" />
      </a>
      {useLocation().pathname === "/" ? (
        <Dropdowns
          timeframe={timeframe}
          setTimeframe={setTimeframe}
          convertDate={convertDate}
          timeSelect={timeSelect}
          setTimeSelect={setTimeSelect}
          baseCurrency={baseCurrency}
          setBaseCurrency={setBaseCurrency}
          currencies={currencies}
        />
      ) : (
        ""
      )}

      <div id="slogan" key={"slogan"}>
        <span>{slogan}</span>
      </div>
      <div
        id="menu"
        onMouseOver={() => setMenuOpen(true)}
        onMouseLeave={() => setMenuOpen(false)}
      >
        <FiMoreVertical className="menuicon" />
        <div
          className="menudropdown"
          style={{ display: menuOpen ? "" : "none" }}
        >
          <a href="/">Home</a>
          <a href="/privacy">Privacy</a>
          <a href="/register">Register</a>
          <a href="/login">Log in</a>
        </div>
      </div>
    </div>
  );
}
