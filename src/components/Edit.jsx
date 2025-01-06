// import { count } from "d3";
import React, { useContext, useState } from "react";
import CalcContext from "./calcContext/calcContext";

function Edit(props) {
  const [person, setPerson] = useState(props.person);
  if (person._id != props.person._id) {
    setPerson(props.person);
  }
  const { updateShare } = useContext(CalcContext);
  const [updating, setUpdate] = useState({});
  const handleChange = (e) => {
    setPerson({ ...person, [e.target.name]: e.target.value });

    setUpdate({ ...updating, [e.target.name]: e.target.value });
  };
  console.log(props.person.Rs);

  const handleSubmit = (id) => {
    console.log(updating);

    updateShare(id, updating);
  };
  return (
    <div className="modal-dialog edit" role="document">
      <div className="modal-content">
        <div className="modal-header d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-primary"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body ">
          <div className="fieldInput">
            <label htmlFor="Username">Name:</label>
            <input
              type="text"
              name="Username"
              id="name"
              placeholder="Name"
              onChange={handleChange}
              value={person["Username"]}
            />{" "}
          </div>
          <div className="fieldInput">
            <label htmlFor="name">Contribution:</label>
            <input
              type="number"
              name="Rs"
              id="Contribution"
              onChange={handleChange}
              placeholder="Contribution(Rs)"
              value={person.Rs}
            />{" "}
          </div>
          <div className="fieldInput">
            <label htmlFor="name">Description:</label>
            <input
              type="text"
              onChange={handleChange}
              name="Desc"
              id="Description"
              placeholder="Description"
              value={person.Desc}
            />{" "}
          </div>
        </div>
        <div className="modal-footer">
          <button
            data-dismiss="modal"
            aria-label="Close"
            className="btn btn-primary"
            onClick={() => {
              handleSubmit(person._id);
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Edit;
