import React from "react";
import { Button } from "react-bootstrap";
import authStore from "./../stores/authStore";

function SignoutButton() {
  const handleClick = (event) => {
    event.preventDefault();
    authStore.signout();
  };
  return (
    <Button variant="outline-light mx-3" onClick={handleClick}>
      Signout
    </Button>
  );
}

export default SignoutButton;
