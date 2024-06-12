import { Collapse, Container, ListGroup, Placeholder } from "react-bootstrap";
import { useAdditionalContents } from "../hooks/useAdditionalContents";

import AdditionalContent from "./AdditionalContent";
import CreateACModal from "./CreateACModal";
import { useState } from "react";

function ExpandedTicket({ isExpanded, ticket }) {
  const [showModal, setShowModal] = useState(false);

  const { additionalContents, isLoading, refetch } = useAdditionalContents(
    ticket.ticket_id,
  );

  const renderedAdditionalContent = additionalContents.map(
    (additionalContent) => (
      <AdditionalContent
        key={additionalContent.ac_id}
        additionalContent={additionalContent}
      />
    ),
  );

  return (
    <>
      <Collapse in={isExpanded} className="mt-2 mb-3">
        <Container>
          <ListGroup className="w-100 mb-3">
            <ListGroup.Item>{ticket?.text}</ListGroup.Item>
          </ListGroup>
          <ListGroup className="w-100">
            {isLoading ? (
              <Placeholder as={ListGroup.Item} animation="glow">
                <Placeholder className="w-75 rounded" />
              </Placeholder>
            ) : (
              renderedAdditionalContent
            )}
            {ticket?.state === "open" && (
              <ListGroup.Item
                as="button"
                className="text-center"
                onClick={() => setShowModal(true)}
              >
                +
              </ListGroup.Item>
            )}
          </ListGroup>
        </Container>
      </Collapse>
      <CreateACModal
        ticketId={ticket?.ticket_id}
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSubmit={() => setShowModal(false)}
        refetch={refetch}
      />
    </>
  );
}

export default ExpandedTicket;
