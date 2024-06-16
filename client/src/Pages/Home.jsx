import { useEffect } from "react";
import { Button, Card, Placeholder } from "react-bootstrap";
import { BsPlusLg } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import Ticket from "../Components/Ticket";
import { useUser, useTickets } from "../hooks";

function Home() {
  const { isLoggedIn } = useUser();
  const { tickets, setTickets, isLoading, refetch } = useTickets();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Ticketing System";
  }, []);

  const renderTickets = tickets.map((ticket) => {
    return (
      <Ticket
        key={ticket.ticket_id}
        ticket={ticket}
        refetch={refetch}
        setTickets={setTickets}
        className="mb-4"
      />
    );
  });

  const handleCreateTicket = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate("/create-ticket");
    }
  };

  return (
    <>
      {isLoading ? (
        <Card className="w-50">
          <Placeholder as={Card.Header} animation="glow">
            <Placeholder className="w-25 rounded" />
          </Placeholder>
          <Placeholder as={Card.Body} animation="glow">
            <Placeholder className="w-75 rounded" />
          </Placeholder>
          <Placeholder as={Card.Footer} animation="glow">
            <Placeholder className="w-25 rounded" />
          </Placeholder>
        </Card>
      ) : (
        renderTickets
      )}
      <Button
        className="position-fixed bottom-0 end-0 m-5 py-2 px-4"
        disabled={isLoading}
        onClick={handleCreateTicket}
      >
        <BsPlusLg />
      </Button>
    </>
  );
}

export default Home;
