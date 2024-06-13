import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useCreateAdditionalContent } from "../hooks/useCreateAdditionalContent";

function CreateACModal({ ticketId, show, handleClose, refetch }) {
  const [text, setText] = useState("");
  const {
    createAdditionalContent,
    isSuccess,
    isLoading,
    isError,
    setIsError,
    reset,
  } = useCreateAdditionalContent();

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
      refetch();
      handleClose();
      reset();
      setText("");
    }
  }, [isSuccess]);

  const handleSubmit = () => {
    createAdditionalContent(ticketId, { text });
  };

  return (
    <Modal show={show} onHide={handleClose} data-bs-theme="dark">
      <Modal.Header closeButton>
        <Modal.Title>Add Content</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          className={`w-100 p-4 ${isError ? "border border-danger" : ""} rounded`}
          onSubmit={handleSubmit}
        >
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
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant={isError ? "danger" : "primary"}
          disabled={isLoading}
          onClick={handleSubmit}
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateACModal;
