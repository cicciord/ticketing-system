import React from "react";
import { Modal, Button, Card } from "react-bootstrap";
import { useUser } from "../hooks/useUser";

function ConfirmTicketModal({
  title,
  category,
  text,
  estimation,
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
    <Modal show={show} onHide={handleClose} data-bs-theme="dark" centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Confirm New Ticket</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card className="border-0">
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {category}
            </Card.Subtitle>
            <Card.Text>{textWithBreaks}</Card.Text>
            <Card.Text>
              Estimation: {Math.floor(estimation / 24)} days{" "}
              {user?.admin && `and ${estimation % 24} hours`}
            </Card.Text>
          </Card.Body>
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
