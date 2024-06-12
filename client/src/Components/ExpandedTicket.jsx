import { Collapse, Container, ListGroup, Placeholder } from "react-bootstrap";
import { useAdditionalContents } from "../hooks/useAdditionalContents";

import AdditionalContent from "./AdditionalContent";

function ExpandedTicket({ isExpanded, ticket }) {
  const { additionalContents, isLoading } = useAdditionalContents(
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
          <ListGroup.Item as="button" className="text-center">
            +
          </ListGroup.Item>
        </ListGroup>
      </Container>
    </Collapse>
  );
}

export default ExpandedTicket;
