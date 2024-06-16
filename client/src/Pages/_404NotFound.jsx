import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function _404NotFound() {
  const navigate = useNavigate();
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div>
        <h1 className="text-danger">404 Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Button onClick={() => navigate("/")}>Go to Home</Button>
      </div>
    </div>
  );
}

export default _404NotFound;
