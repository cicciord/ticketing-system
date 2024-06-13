import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useCreateAdditionalContent } from "../hooks/useCreateAdditionalContent";

function CreateACModal({ ticketId, show, handleClose, refetch }) {
  const {
    createAdditionalContent,
    isSuccess,
    isLoading,
    isError,
    setIsError,
    reset
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
    }
  }, [isSuccess]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const text = form.elements.formText.value;
    createAdditionalContent(ticketId, { text });
  };

  return (
    <Modal show={show} onHide={handleClose}>
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
            />
          </Form.Group>
          <Button
            variant={isError ? "danger" : "primary"}
            type="submit"
            disabled={isLoading}
          >
            Add
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CreateACModal;