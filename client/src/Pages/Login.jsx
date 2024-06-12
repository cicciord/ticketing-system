import { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login, isLoading, isLoggedIn, isError, setIsError } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Log In";
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (isError) {
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
  );
}

export default Login;
