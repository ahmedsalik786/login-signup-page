import { Button } from "antd";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

function Dashboard() {
  const [user] = useAuthState(auth);
  console.log("user", user);
  const navigate = useNavigate();

  function Logout() {
    if (user) {
      try {
        signOut(auth)
          .then(() => {
            navigate("/");
          })
          .catch((e) => {});
      } catch (error) {}
    }
  }
  return (
    <div>
      <h3>User Dashboard</h3>

      <p>Email :{user.email}</p>
      <p>UID :{user.uid}</p>

      <Button onClick={Logout}>Logout</Button>
    </div>
  );
}

export default Dashboard;
