import React from "react";
import { FaHistory } from "react-icons/fa";
import { Link } from "react-router-dom";
function alert(props) {
  return (
    <div
      className={`alert alert-${
        props.alert.type
      } alert-dismissible mx-auto d-flex w-${
        props.size ? props.size : 50
      } justify-content-between rounded-4" role="alert`}
    >
      <div>
        <strong>
          {props.alert.type == "success" ? "Successfull" : "Unsuccessfull"}!
        </strong>{" "}
        {props.alert.message}
        <Link to="/shareHistory" className="btn btn-grey">
          <FaHistory size={25} />
        </Link>
      </div>
      <button
        type="button"
        className="close btn border border-primary mx-2"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
}

export default alert;
