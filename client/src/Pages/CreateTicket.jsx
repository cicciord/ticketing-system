import { useEffect, useState } from "react";
import { useCreateTicket, useGetEstimation } from "../hooks";
import { Form, Button, Toast, ToastContainer } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ConfirmTicketModal from "../Components/ConfirmTicketModal";

function CreateTicket() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("inquiry");
  const [text, setText] = useState("");

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const { createTicket, isSuccess, isLoading, isError, error, setIsError } =
    useCreateTicket();
  const navigate = useNavigate();

  const { estimate, estimation } = useGetEstimation();

  useEffect(() => {
    document.title = "Create Ticket";
  }, []);

  useEffect(() => {
    if (isError) {
      setShowToast(true);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmModal(true);
    estimate(title, category);
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
          <Toast.Body>{error?.error}</Toast.Body>
        </Toast>
      </ToastContainer>
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
          disabled={isLoading}
          type="submit"
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
        estimation={estimation}
        handleSubmit={() => createTicket({ title, category, text })}
      />
    </>
  );
}

export default CreateTicket;
