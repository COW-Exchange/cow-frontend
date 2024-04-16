import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  const [number, setNumber] = useState(9);
  useEffect(() => {
    setTimeout(() => setNumber(number - 1), 1000);
    if (number === 0) {
      navigate("/");
    }
  }, [number, navigate]);

  return (
    <div className="register">
      <div className="formbox">
        <p>
          The page you navigated to does not exist. Redirecting to landing page
          in {number} seconds
        </p>
        <p>
          <a href="/">Take me there now!</a>
        </p>
      </div>
    </div>
  );
}
