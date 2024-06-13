import { useEffect, useState } from "react";
import { useCreateTicket } from "../hooks/useCreateTicket";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ConfirmTicketModal from "../Components/ConfirmTicketModal";

function CreateTicket() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("inquiry");
  const [text, setText] = useState("");

  const [showConfirmModal, setShowConfirmModal] = useState(false);

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
    setShowConfirmModal(true);
  };

  return (
    <>
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCategory">
          <Form.Label>Category</Form.Label>
          <Form.Select
            aria-label="Category select"
            disabled={isLoading}
            className={`${isError && "border-danger"}`}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
            value={text}
            onChange={(e) => setText(e.target.value)}
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
      <ConfirmTicketModal
        show={showConfirmModal}
        handleClose={() => setShowConfirmModal(false)}
        title={title}
        category={category}
        text={text}
        handleSubmit={() => createTicket({ title, category, text })}
      />
    </>
  );
}

export default CreateTicket;
