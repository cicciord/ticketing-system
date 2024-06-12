import { useState } from "react";
import { Card, Badge, Collapse, ListGroup } from "react-bootstrap";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

function Ticket({ ticket, isLoggedIn, username, className }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      border={username === ticket.owner_username ? "warning" : "secondary"}
      className={`w-50 ${className}`}
    >
      <Card.Header className="d-flex justify-content-between align-items-center">
        <p className="m-1">{ticket?.category}</p>
        <Badge bg={ticket?.state === "open" ? "success" : "danger"} text="dark">
          {ticket?.state}
        </Badge>
      </Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>{ticket?.title}</p>
          <footer className="blockquote-footer">
            {ticket?.owner_username} on {ticket?.timestamp}
          </footer>
        </blockquote>
      </Card.Body>
      {isLoggedIn && (
        <Card.Footer className="d-flex flex-column justify-content-center align-items-center">
          {isExpanded ? (
            <BsChevronUp onClick={() => setIsExpanded(false)} />
          ) : (
            <BsChevronDown onClick={() => setIsExpanded(true)} />
          )}
          <Collapse in={isExpanded} className="mt-2">
            <ListGroup className="w-100">
              <ListGroup.Item>Cras justo odio</ListGroup.Item>
              <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
              <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
              <ListGroup.Item as="button" className="text-center">
                +
              </ListGroup.Item>
            </ListGroup>
          </Collapse>
        </Card.Footer>
      )}
    </Card>
  );
}

export default Ticket;
