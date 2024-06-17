import React from "react";
import { ListGroup } from "react-bootstrap";

import dayjs from "dayjs";

function AdditionalContent({ additionalContent }) {
  // Split the text by new line and add a break element after each line
  const textWithBreaks = additionalContent?.ac_text
    .split("\n")
    .map((text, index) => (
      <React.Fragment key={index}>
        {text}
        <br />
      </React.Fragment>
    ));

  return (
    <ListGroup.Item>
      <div className="mx-2 py-2">
        <div className="d-flex justify-content-between">
          <div className="fw-bold text-secondary">
            {additionalContent?.author_username}
          </div>
          <div className="text-secondary">
            {dayjs.unix(additionalContent?.ac_timestamp).format("DD/MM/YYYY HH:mm:ss")}
          </div>
        </div>
        {textWithBreaks}
      </div>
    </ListGroup.Item>
  );
}

export default AdditionalContent;
