import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { Card, Badge, Form } from "react-bootstrap";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useCloseTicket } from "../hooks/useCloseTicket";
import { useOpenTicket } from "../hooks/useOpenTicket";
import { useUpdateCategory } from "../hooks/useUpdateCategory";

import ExpandedTicket from "./ExpandedTicket";
import { useUser } from "../hooks/useUser";

function Ticket({ ticket, className, setTickets }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [category, setCategory] = useState(ticket.category);
  const [categoryChanged, setCategoryChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { user, isLoggedIn } = useUser();
  const {
    closeTicket,
    isLoading: isClosingTicket,
    isSuccess: isClosed,
    setIsSuccess: setIsClosed,
  } = useCloseTicket();
  const {
    openTicket,
    isLoading: isOpeningTicket,
    isSuccess: isOpened,
    setIsSuccess: setIsOpened,
  } = useOpenTicket();
  const {
    updateCategory,
    isUpdatingCategory,
    isSuccess: isUpdated,
    setIsSuccess: setIsUpdated,
  } = useUpdateCategory();

  useEffect(() => {
    setIsLoading(isClosingTicket || isOpeningTicket || isUpdatingCategory);
  }, [isClosingTicket, isOpeningTicket, isUpdatingCategory]);

  useEffect(() => {
    if (isUpdated) {
      setTickets((tickets) => {
        return tickets.map((t) => {
          if (t.ticket_id === ticket.ticket_id) {
            return { ...t, category };
          }
          return t;
        });
      });
    }

    setIsUpdated(false);
  }, [isUpdated]);

  useEffect(() => {
    if (isClosed) {
      setTickets((tickets) => {
        return tickets.map((t) => {
          if (t.ticket_id === ticket.ticket_id) {
            return { ...t, state: "closed" };
          }
          return t;
        });
      });
    }

    setIsClosed(false);
  }, [isClosed]);

  useEffect(() => {
    if (isOpened) {
      setTickets((tickets) => {
        return tickets.map((t) => {
          if (t.ticket_id === ticket.ticket_id) {
            return { ...t, state: "open" };
          }
          return t;
        });
      });
    }

    setIsOpened(false);
  }, [isOpened]);

  const handleTicketClose = () => {
    closeTicket(ticket.ticket_id);
  };

  const handleTicketOpen = () => {
    openTicket(ticket.ticket_id);
  };

  const handleCategroyChange = (e) => {
    setCategory(e.target.value);
    setCategoryChanged(true);
  };

  const handleUpdateCategory = () => {
    updateCategory(ticket.ticket_id, category);
    setCategoryChanged(false);
  };

  return (
    <Card
      border={
        user?.username === ticket.owner_username ? "warning" : "secondary"
      }
      className={`w-50 ${className}`}
    >
      <Card.Header className="d-flex justify-content-between align-items-center">
        {user?.admin ? (
          <div className="d-flex">
            <Form.Select
              size="sm"
              value={category}
              onChange={handleCategroyChange}
              disabled={isLoading}
            >
              <option value="inquiry">inquiry</option>
              <option value="maintenance">maintenance</option>
              <option value="new feature">new feature</option>
              <option value="administrative">administrative</option>
              <option value="payment">payment</option>
            </Form.Select>
            {categoryChanged && (
              <Badge
                as="button"
                bg="warning"
                text="dark"
                className="ms-2"
                onClick={handleUpdateCategory}
                disabled={isLoading}
              >
                update category
              </Badge>
            )}
          </div>
        ) : (
          <p className="m-1">{ticket?.category}</p>
        )}
        {user?.admin ? (
          <div>
            <Badge
              as="button"
              bg="warning"
              text="dark"
              className="me-2"
              onClick={
                ticket?.state === "open" ? handleTicketClose : handleTicketOpen
              }
              disabled={isLoading}
            >
              {ticket?.state === "open" ? "close ticket" : "reopen ticket"}
            </Badge>
            <Badge
              bg={ticket?.state === "open" ? "success" : "danger"}
              text="dark"
            >
              {ticket?.state}
            </Badge>
          </div>
        ) : user?.username === ticket?.owner_username &&
          !user?.admin &&
          ticket?.state === "open" ? (
          <Badge
            as="button"
            bg="warning"
            text="dark"
            onClick={handleTicketClose}
            disabled={isLoading}
          >
            close ticket
          </Badge>
        ) : (
          <Badge
            bg={ticket?.state === "open" ? "success" : "danger"}
            text="dark"
          >
            {ticket?.state}
          </Badge>
        )}
      </Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>{ticket?.title}</p>
          <footer className="blockquote-footer">
            {ticket?.owner_username} on{" "}
            {dayjs.unix(ticket?.timestamp).format("DD/MM/YYYY")}
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
