import { useSearchParams } from "react-router-dom";
import { ReactElement, useState, useEffect, useRef } from "react";
import axios from "axios";

export default function Register() {
  const [query, setQuery] = useSearchParams();
  const [display, setDisplay] = useState<ReactElement>();
  const [message, setMessage] = useState<ReactElement>();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordAgainRef = useRef<HTMLInputElement>(null);
  const url = process.env.REACT_APP_URL;

  const validateEmail = (email: string) => {
    return email.toLowerCase().match(/\S+@\S+\.\S+/);
  };

  useEffect(() => {
    if (query.toString() !== "") {
      const token = query.get("token");
      const email = query.get("email");
      axios
        .get(`${url}/users/validate/${token}/${email}`)
        .then((res) => {
          if (res.statusText === "OK") {
            setDisplay(
              <div className="formbox">
                Your e-mail address is confirmed, choose a password if you wish!
                <input
                  type="password"
                  id="password"
                  className="inputfield"
                  ref={passwordRef}
                />
                <input
                  type="password"
                  id="passwordagain"
                  className="inputfield"
                  ref={passwordAgainRef}
                />
                <button
                  onClick={() => {
                    if (
                      passwordRef.current !== null &&
                      passwordAgainRef.current?.value ===
                        passwordRef.current?.value
                    ) {
                      axios
                        .post(
                          url + "/users/register/",
                          {
                            email: email,
                            password: passwordRef.current.value,
                          },
                          {
                            headers: { Authentication: token },
                          }
                        )
                        .then((res) => setMessage(<p>{res.data.message}</p>))
                        .catch((e) => {
                          setMessage(<p>{e.message}</p>);
                        });
                    }
                  }}
                >
                  Save password
                </button>
                <button
                  onClick={() =>
                    alert(
                      "You choose to not set a password. You will be able to log in with one-time login e-mails."
                    )
                  }
                >
                  Skip
                </button>
                {message}
              </div>
            );
          } else {
          }
        })
        .catch((error) => {
          setMessage(<p>Invalid link used, try registering again!</p>);
          setQuery("");
          console.log("Error:", error.message);
        });
    } else {
      setDisplay(
        <div className="formbox">
          <input
            type="email"
            id="email"
            className="inputfield"
            ref={emailRef}
            autoComplete="off"
          />
          <button
            onClick={() => {
              if (
                emailRef.current !== null &&
                validateEmail(emailRef.current.value)
              ) {
                axios({
                  method: "post",
                  url:
                    url +
                    "/users/register/" +
                    encodeURIComponent(emailRef.current.value),
                }).then((res) => {
                  setMessage(<p>{res.data}</p>);
                });
              } else {
                alert("The e-mail address is not valid");
              }
            }}
          >
            Send the registration e-mail
          </button>
          {message}
        </div>
      );
    }
  }, [query, setQuery, url, message]);
  return <div className="register">{display}</div>;
}
