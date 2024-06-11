import React from "react";
import { useUser } from "../hooks/useUser";
import { Button } from "react-bootstrap";

function Home() {
  const { user, login } = useUser();
  return (
    <>
    <div>
      Username: {user?.username}, admin: {user?.admin ? "true" : "false"}
    </div>
      <Button onClick={() => login("admin1", "passwd1")}>Login</Button>
    </>
  );
}

export default Home;
