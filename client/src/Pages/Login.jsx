import { useState, useEffect } from "react";
import { Form, Button, Toast, ToastContainer } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useUser } from "../hooks";

function Login() {
  const [showToast, setShowToast] = useState(false);
  const { login, isLoading, isLoggedIn, isError, error, setIsError } =
    useUser();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Log In";
  }, []);

  // Redirect to previous page if user is logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate(-1);
    }
  }, [isLoggedIn, navigate]);

  // timeout for error toast and border color
  useEffect(() => {
    if (isError) {
      setShowToast(true);
      const timer = setTimeout(() => {
        setIsError(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isError, setIsError]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const username = form.elements.formUsername.value;
    const password = form.elements.formPassword.value;
    login(username, password);
  };

  return (
    <>
      <ToastContainer position="top-end" className="m-4">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          bg="danger"
          autohide
          delay={5000}
        >
          <Toast.Header>Error</Toast.Header>
          <Toast.Body>{error?.error?.message}</Toast.Body>
        </Toast>
      </ToastContainer>
      <Form
        className={`w-50 p-4 border border-${isError ? "danger" : "secondary"} rounded`}
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            required
            disabled={isLoading}
            className={`${isError && "border-danger"}`}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required
            disabled={isLoading}
            className={`${isError && "border-danger"}`}
          />
        </Form.Group>
        <Button
          variant={isError ? "danger" : "primary"}
          type="submit"
          disabled={isLoading}
        >
          Log In
        </Button>
      </Form>
    </>
  );
}

export default Login;
