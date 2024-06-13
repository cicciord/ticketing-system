import { Modal, Button, Card } from "react-bootstrap";

function ConfirmTicketModal({
  title,
  category,
  text,
  show,
  handleClose,
  handleSubmit,
}) {
  return (
    <Modal show={show} onHide={handleClose}>
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
            <Card.Text>{text}</Card.Text>
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
