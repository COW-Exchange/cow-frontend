import axios from "axios";

export default function Profile() {
  const url = process.env.REACT_APP_URL;
  const settings = axios
    .get("/users/profile", { withCredentials: true })
    .then((res) => res.data);
  console.log(settings);
  return <div>Profile</div>;
}
