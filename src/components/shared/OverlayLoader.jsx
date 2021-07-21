import React from "react";
import Spinner from "react-bootstrap/Spinner";

function OverlayLoader({ status }) {
  return (
    <div className="vw-100 vh-100 d-flex justify-content-center align-items-center">
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading</span>
        </Spinner>
        <p>{status}</p>
      </div>
    </div>
  );
}

export default OverlayLoader;
