import dayjs from "dayjs";
import { useState } from "react";
import { Card, Badge } from "react-bootstrap";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

import ExpandedTicket from "./ExpandedTicket";

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
            {ticket?.owner_username} on{" "}
            {dayjs(ticket?.timestamp).format("YY/MM/DD")}
          </footer>
        </blockquote>
      </Card.Body>
      {isLoggedIn && (
        <Card.Footer className="d-flex flex-column justify-content-center align-items-center">
          {isExpanded ? (
            <BsChevronUp
              type="button"
              onClick={() => setIsExpanded(false)}
              className="my-2"
            />
          ) : (
            <BsChevronDown
              type="button"
              onClick={() => setIsExpanded(true)}
              className="my-2"
            />
          )}
          <ExpandedTicket isExpanded={isExpanded} ticket={ticket} />
        </Card.Footer>
      )}
    </Card>
  );
}

export default Ticket;
