import React from "react";
import { Modal, Button, Card } from "react-bootstrap";

import { useUser } from "../hooks";

function ConfirmTicketModal({
  title,
  category,
  text,
  estimation,
  isLoading,
  show,
  handleClose,
  handleSubmit,
}) {
  const { user } = useUser();
  const textWithBreaks = text.split("\n").map((t, index) => (
    <React.Fragment key={index}>
      {t}
      <br />
    </React.Fragment>
  ));

  return (
    <Modal
      show={show}
      onHide={handleClose}
      data-bs-theme="dark"
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Confirm New Ticket</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card className="border border-secondary">
          <Card.Header>
            <Card.Title>{title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {category}
            </Card.Subtitle>
          </Card.Header>
          <Card.Body>
            <Card.Text>{textWithBreaks}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <Card.Text className="text-muted">
              This ticket is expected to be closed in{" "}
              {isLoading
                ? "..."
                : `${Math.floor(estimation / 24)} days${user?.admin ? ` and ${estimation % 24} hours` : ""}`}
            </Card.Text>
          </Card.Footer>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="info" onClick={handleClose}>
          Edit
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Create Ticekt
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmTicketModal;
