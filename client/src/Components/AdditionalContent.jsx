import dayjs from "dayjs";
import { ListGroup } from "react-bootstrap";

function AdditionalContent({ additionalContent }) {
  return (
    <ListGroup.Item>
      <div className="mx-2">
        <div className="d-flex justify-content-between">
          <div className="fw-bold text-secondary">
            {additionalContent?.author_username}
          </div>
          <div className="text-secondary">{dayjs.unix(additionalContent?.ac_timestamp).format("DD/MM/YYYY")}</div>
        </div>
        {additionalContent?.ac_text}
      </div>
    </ListGroup.Item>
  );
}

export default AdditionalContent;
