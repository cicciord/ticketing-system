import { useEffect } from "react";
import { useCreateTicket } from "../hooks/useCreateTicket";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function CreateTicket() {
  const { createTicket, isSuccess, isLoading, isError, setIsError } =
    useCreateTicket();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Create Ticket";
  }, []);

  useEffect(() => {
    if (isError) {
      const timer = setTimeout(() => {
        setIsError(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const title = form.elements.formTitle.value;
    const category = form.elements.formCategory.value;
    const text = form.elements.formText.value;
    const ticketData = { title, category, text };
    createTicket(ticketData);
  };

  return (
    <Form
      className={`w-50 p-4 border border-${isError ? "danger" : "secondary"} rounded`}
      onSubmit={handleSubmit}
    >
      <Form.Group className="mb-3" controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Title"
          required
          disabled={isLoading}
          className={`${isError && "border-danger"}`}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formCategory">
        <Form.Label>Category</Form.Label>
        <Form.Select
          aria-label="Category select"
          disabled={isLoading}
          className={`${isError && "border-danger"}`}
        >
          <option value="inquiry">inquiry</option>
          <option value="maintenance">maintenance</option>
          <option value="new feature">new feature</option>
          <option value="administrative">administrative</option>
          <option value="payment">payment</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formText">
        <Form.Label>Text</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
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
        Create
      </Button>
    </Form>
  );
}

export default CreateTicket;
