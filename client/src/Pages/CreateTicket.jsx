import { useEffect } from "react";

function CreateTicket() {
  useEffect(() => {
    document.title = "Create Ticket";
  }, []);

  return <div>CreateTicket</div>;
}

export default CreateTicket;
