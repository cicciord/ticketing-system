import React from "react";
import dayjs from "dayjs";
import { ListGroup } from "react-bootstrap";

function AdditionalContent({ additionalContent }) {
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
      <div className="mx-2">
        <div className="d-flex justify-content-between">
          <div className="fw-bold text-secondary">
            {additionalContent?.author_username}
          </div>
          <div className="text-secondary">
            {dayjs.unix(additionalContent?.ac_timestamp).format("DD/MM/YYYY")}
          </div>
        </div>
        {textWithBreaks}
      </div>
    </ListGroup.Item>
  );
}

export default AdditionalContent;
