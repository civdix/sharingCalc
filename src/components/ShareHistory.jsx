import React, { useState, useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";

function ShareHistory() {
  const [section, setSection] = useState(true);
  const [share, setShare] = useState([]);
  async function deleteHistory(id, Username) {
    const response = await fetch(
      `http://localhost:5000/api/share/deleteShare/${Username}/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const json = await response.json();
    if (!response.ok) {
      alert(json.message);
    } else console.log("Successfully deleted\n", json.message);
    // That popdown or Line thing below navbar
  }
  async function getShares() {
    const response = await fetch(
      "http://localhost:5000/api/share/getShares/shivdix.cpp",
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const share = await response.json();
    setShare(share.share);
    // setShare([]);
  }
  useEffect(() => {
    getShares();
  }, [share]);
  return (
    <div className="blur my-2 rounded p-2 ">
      <div className="tools"></div>
      <div className="select d-flex p-1">
        <div
          className={`myshare w-50 ${
            section ? "bg-dark text-light " : ""
          } p-2 `}
          onClick={() => {
            setSection(true);
          }}
        >
          My Share
        </div>
        <div
          onClick={() => {
            setSection(false);
          }}
          className={`shareOnMe w-50 ${
            !section ? "bg-dark text-light " : ""
          } p-2`}
        >
          Share On Me
        </div>
      </div>
      <div className="mainView  bg-primary d-flex  flex-wrap p-1">
        {share.map((e, index) => {
          const prevIndex = index;
          return (
            <div
              key={index}
              className="card p-1 my-1 mx-1 position-relative"
              //   style={{ width: "16rem" }}
            >
              <MdDeleteForever
                className="deleteButton position-absolute left-0 z-index-2"
                onClick={() => deleteHistory(e._id, e.Username)}
              />
              <img
                className="card-img-top "
                src="https://th.bing.com/th/id/OIP.K7NwKlbwQo9WvIedWa-fYgHaE8?rs=1&pid=ImgDetMain"
                alt="Card image cap"
                width="90%"
              />
              <div className="card-body">
                <h5 className="card-title my-1">{e.title}</h5>
                <a href="#" className="btn btn-primary">
                  View
                </a>

                <div className="card-footer position-relative my-2">
                  <small className="text-muted  d-flex">
                    {e.person.map((contri, index) => {
                      return (
                        <div
                          onMouseOver={() => {
                            document.getElementById(
                              `${index} + ${prevIndex}`
                            ).style.display = "unset";
                          }}
                          onMouseOut={() => {
                            document.getElementById(
                              `${index} + ${prevIndex}`
                            ).style.display = "none";
                          }}
                        >
                          <span
                            className="position-absolute labelForUsername"
                            id={`${index} + ${prevIndex}`}
                            htmlFor={index + " image"}
                          >
                            {contri.Username}
                          </span>

                          <img
                            id={index + " image"}
                            key={index}
                            className="rounded-circle photoFooter"
                            src="https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg"
                            alt={contri.Username.slice(0, 1)}
                          />
                        </div>
                      );
                    })}
                  </small>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ShareHistory;
