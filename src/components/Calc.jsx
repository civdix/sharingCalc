import React, { useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
function Calc() {
  const [person, setPerson] = useState([]);
  const [data, setData] = useState({});

  const addShare = async () => {
    console.log(data);
    const response = await fetch(
      "http://localhost:5000/api/share/createShare",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          tag: data.tag.split(","),
          person: person,
        }),
      }
    );
    if (response.ok) {
      const json = response.json();
      console.log(json);
    }
    console.log();
  };

  const updatePerson = (event, elem, index) => {
    try {
      const personData = { ...elem, [event.target.name]: event.target.value };
      const newPerson = [...person];
      newPerson[index] = personData;
      setPerson(newPerson);
    } catch (e) {
      console.log({ e });
    }
  };
  const updateData = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  return (
    <div className="w-50 mx-auto bg-secondary mx-auto my-2 rounded p-3">
      <div className="input-group input-group-sm mb-3 ">
        <span className="input-group-text" id="inputGroup-sizing-sm">
          Memory Title
        </span>
        <input
          name="title"
          onChange={updateData}
          type="text"
          className="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-sm"
        />
        <span className="input-group-text">Tag</span>
        <input
          name="tag"
          onChange={updateData}
          type="text"
          className="form-control"
          placeholder="Tag(Ex:Food, Travel, Borrow)"
          aria-label="Server"
        />
      </div>
      {person.map((elem, index) => {
        return (
          <div className="input-group mb-3 " key={index}>
            <input
              name="Username"
              onChange={(event) => {
                updatePerson(event, elem, index);
              }}
              type="text"
              className="form-control"
              placeholder={index + 1 + ": Username"}
              aria-label="Username"
            />
            <span className="input-group-text">₹</span>
            <input
              name="Rs"
              onChange={(event) => {
                updatePerson(event, elem, index);
              }}
              type="text"
              className="form-control"
              placeholder="₹"
              aria-label="Server"
            />
            <span className="input-group-text">Desc</span>
            <input
              name="Desc"
              onChange={(event) => {
                updatePerson(event, elem, index);
              }}
              type="text"
              className="form-control"
              placeholder="Desc"
              aria-label="Server"
            />
            <IoCloseCircleSharp
              size={30}
              className={
                person.length === index + 1 && index + 1 !== 1
                  ? "d-unset text-dark mx-1 my-1"
                  : "d-none"
              }
              onClick={() => {
                setPerson(person.slice(0, person.length - 1));
              }}
            />
          </div>
        );
      })}

      <div className="userNameRecomendation">
        {/* Display will only be non none when no input will be in focus and when there is no text in input so it suggest random friends or recent userName used by account holder */}
      </div>
      <button
        className="btn btn-primary w-100 my-1"
        type="button"
        onClick={() => {
          setPerson([...person, { Username: "", Rs: 0, Desc: "" }]);
        }}
      >
        Add Friend
      </button>
      <div className="input-group my-1">
        <input
          type="file"
          className="form-control"
          id="inputGroupFile04"
          aria-describedby="inputGroupFileAddon04"
          aria-label="Upload"
        />
        <button
          className="btn btn-outline-light"
          type="button"
          id="inputGroupFileAddon04"
        >
          View
        </button>
      </div>
      <button
        className="btn btn-primary w-100 my-1"
        type="button"
        onClick={addShare}
      >
        Create Share
      </button>
    </div>
  );
}

export default Calc;
