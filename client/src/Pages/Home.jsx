import { useEffect } from "react";
import { useUser } from "../hooks/useUser";
import { useTickets } from "../hooks/useTickets";

import Ticket from "../Components/Ticket";

function Home() {
  const { isLoggedIn, user } = useUser();
  const { tickets } = useTickets();

  const renderTickets = tickets.map((ticket) => {
    return (
      <Ticket
        key={ticket.ticket_id}
        ticket={ticket}
        isLoggedIn={isLoggedIn}
        username={user?.username}
        className="mb-4"
      />
    );
  });

  useEffect(() => {
    document.title = "Ticketing System";
  }, []);

  return <>{renderTickets}</>;
}

export default Home;
