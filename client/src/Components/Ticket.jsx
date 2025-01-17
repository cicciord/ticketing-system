import { useState, useEffect } from "react";
import { Card, Badge, Form } from "react-bootstrap";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

import dayjs from "dayjs";

import {
  useCloseTicket,
  useOpenTicket,
  useUpdateCategory,
  useUser,
  useGetEstimation,
} from "../hooks";
import ExpandedTicket from "./ExpandedTicket";

function Ticket({ ticket, className, setTickets }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [category, setCategory] = useState(ticket.category);
  const [categoryChanged, setCategoryChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { user, isLoggedIn } = useUser();

  const {
    estimation,
    setEstimation,
    estimate,
    isLoading: isLoadingEstimation,
  } = useGetEstimation();

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
    isLoading: isUpdatingCategory,
    isSuccess: isUpdated,
    setIsSuccess: setIsUpdated,
  } = useUpdateCategory();

  // fetch estimation on ticket state change
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (ticket.state === "closed") {
      setEstimation(null);
    }
    if (user?.admin && ticket.state === "open") {
      estimate(ticket.title, ticket.category);
    }
  }, [ticket.title, ticket.category, ticket.state, setEstimation, user?.admin]);

  // group all loading states
  useEffect(() => {
    setIsLoading(isClosingTicket || isOpeningTicket || isUpdatingCategory);
  }, [isClosingTicket, isOpeningTicket, isUpdatingCategory]);

  // update local state on category change
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
  }, [isUpdated, category, setIsUpdated, setTickets, ticket?.ticket_id]);

  // update local state on ticket close
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
  }, [isClosed, setIsClosed, setTickets, ticket?.ticket_id]);

  // update local state on ticket open
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
  }, [isOpened, setIsOpened, setTickets, ticket?.ticket_id]);

  const handleTicketClose = () => {
    closeTicket(ticket.ticket_id);
  };

  const handleTicketOpen = () => {
    openTicket(ticket.ticket_id);
  };

  // handle catergory change in state (needed to show update button)
  const handleCategroyChange = (e) => {
    setCategory(e.target.value);
    setCategoryChanged(true);
  };

  // handle category update api
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
        {/* Admin view to change category */}
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
        {/* Admin view to change the sate of the ticket */}
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
          <>
            {/* Normal user owner of the ticket view to close the ticket */}
            <Badge
              as="button"
              bg="warning"
              text="dark"
              onClick={handleTicketClose}
              disabled={isLoading}
            >
              close ticket
            </Badge>
          </>
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
            <span className="fw-semibold">{ticket?.owner_username}</span>
            <span>
              {" "}
              on {dayjs.unix(ticket?.timestamp).format("DD/MM/YYYY HH:mm:ss")}
            </span>
          </footer>
        </blockquote>
      </Card.Body>
      {user?.admin && ticket?.state === "open" && (
        <Card.Body>
          <Card.Text className="text-muted">
            This ticket is estimated to be closed in{" "}
            {isLoadingEstimation
              ? "..."
              : `${Math.floor(estimation / 24)} days and ${estimation % 24} hours`}
          </Card.Text>
        </Card.Body>
      )}
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
