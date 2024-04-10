import { useRef, useState, ReactElement } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LogIn({ url }: { url: string }) {
  const navigate = useNavigate();
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<ReactElement>();

  return (
    <div className="register">
      <div className="formbox">
        <div className="form">
          <span>E-mail:</span>
          <input
            type="email"
            id="email"
            className="inputfield"
            ref={emailRef}
            autoComplete="off"
          />
        </div>
        <div className="form">
          <span>Password:</span>
          <input
            type="password"
            id="password"
            className="inputfield"
            ref={passwordRef}
          />
        </div>
        <button
          onClick={() =>
            axios
              .post(url + "/users/login", {
                email: emailRef.current?.value,
                password: passwordRef.current?.value,
                withCredentials: true,
              })
              .then((res) => {
                setMessage(<p>{res.data.message}</p>);
                navigate("/profile");
              })
              .catch((e) => {
                setMessage(<p>{e.message}</p>);
              })
          }
        >
          Log in
        </button>
        {message}
      </div>
    </div>
  );
}
