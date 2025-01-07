import React, { useState, useEffect, useRef } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaPencilAlt, FaWhatsapp } from "react-icons/fa";
import Edit from "./Edit";
import Alert from "./Alert.jsx";
import { FaMessage } from "react-icons/fa6";
function ShareHistory() {
  const [edit, setEdit] = useState({});
  const [section, setSection] = useState(true);
  const [share, setShare] = useState([]);
  const launchView = useRef(null);
  const launchEdit = useRef(null);
  const [currShare, setCurrShare] = useState({ person: [{}] });
  const handleSendMessage = async (personData, message = "") => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/getData/${personData.Username}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let data = await response.json();
      if (!data.success) {
        let phone = prompt(
          `No User Found in Database\nAsk ${personData.Username} to Join SharingCalc Enter the Phone Number by yourself`
        );
        data.Phone = phone;
        data.Name = personData.Username;
      } else {
        data = data.data;
      }
      alert(
        data.Phone.toString().length <= 10
          ? "91" + data.Phone.toString()
          : data.Phone || "Nothing to print"
      );
      window.location.href = `https://wa.me/${
        data.Phone.toString().length <= 10
          ? "91" + data.Phone.toString()
          : data.Phone
      }?text=Hi%20${data.Name}%20${
        message == ""
          ? "%0AThere%20is%20some%20issues%20with%20my%20settlement%20for%20the%20month%20can%20you%20please%20clear%20your%20Past%20due%20on%20me%20i%20think%20you%20forget%20that%20but%20don't%20worry%20here%20i'm%20making%20you%20remember%20"
          : message + "%20"
      }%0A${"I%20think%20the%20amount%20is%20:" + personData.Rs}`;
    } catch (error) {
      console.error("Error fetching the user:", error.message);
    }
  };
  function credits() {
    var totalSpend = 0;
    var totalDept = 0;

    share.forEach((ent) => {
      ent.person.forEach((element) => {
        if (ent.author == localStorage.getItem("Username"))
          totalSpend += element.Rs;
        else if (element) {
          totalDept += element.Rs;
        }
      });
    });

    return ["Total Spend: ", totalSpend, "\n Total Dept: ", totalDept];
  }
  const launchEditClickByRef = (person, ShareId) => {
    console.log("The ShareId value is", ShareId);
    setEdit({ ...person, ShareId: ShareId });
    launchEdit.current.click();
    launchView.current.click();
  };

  const launchViewClickByRef = (share) => {
    launchView.current.click();
    setCurrShare(share);
  };
  const [alert, setAlert] = useState({
    display: false,
    message: "",
    type: "primary",
  });
  async function deleteHistory(id, Username, index) {
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
    } else {
      console.log("Successfully Deleted\n", json.message);
      share.slice(index, 1);
      const newShare = [...share.slice(0, index), ...share.slice(index + 1)];
      setShare(newShare);
      setAlert({
        display: true,
        type: "success",
        message: "Share Deleted Successfully",
      });
      setTimeout(() => {
        setAlert({
          display: false,
          type: "primary",
          message: "Share Deletion No Status",
        });
      }, 5000);
    }
    // That popdown or Line thing below navbar
  }
  async function getShares() {
    console.log("Now u willll");
    const response = await fetch(
      `http://localhost:5000/api/share/getShares/${localStorage.getItem(
        "Username"
      )}`,
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
  }, []);
  return (
    <div className="blur my-2 rounded p-2 ">
      {alert.display && <Alert alert={alert} size={100} />}
      {/* Button trigger  */}
      <button
        type="button"
        className="btn btn-primary d-none"
        data-toggle="modal"
        data-target="#exampleModal"
        ref={launchView}
      >
        Launch demo modal
      </button>

      <button
        type="button"
        className="btn btn-primary d-none"
        data-toggle="modal"
        data-target="#exampleModal2"
        ref={launchEdit}
      >
        Launch demo modal
      </button>
      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal2"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabe2"
        aria-hidden="false"
      >
        <Edit person={edit} />
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="false"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between">
              <h5 className="modal-title" id="exampleModalLabel">
                {currShare.title}
              </h5>
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <h4>
                {currShare.author == localStorage.getItem("Username") && section
                  ? "Created By You"
                  : "By " + currShare.author}
              </h4>
              <div className="noScroll">
                <h6>Contributors</h6>
                {currShare.person.map((contributor, index) => {
                  return (
                    <div className="d-flex flex-column" key={index}>
                      <div className="contributorProfile d-flex my-1">
                        <img
                          style={{ width: "15%" }}
                          src="https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg"
                          alt={contributor.Username}
                        />
                        <div className="mx-1 details d-flex flex-column">
                          <span>
                            Name: {contributor.Username} :{" "}
                            {
                              <FaWhatsapp
                                size={20}
                                onClick={() => {
                                  handleSendMessage(contributor);
                                  console.log("Onclicked");
                                }}
                                cursor="pointer"
                              />
                            }
                          </span>
                          <span>Contributed: {contributor.Rs + "₹"}</span>
                          <span>Description: {contributor.Desc}</span>
                        </div>
                        <div
                          className="edit"
                          onClick={() =>
                            launchEditClickByRef(contributor, currShare._id)
                          }
                        >
                          <FaPencilAlt cursor="pointer" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <h5>
                {currShare.date &&
                  currShare.date.slice(0, 10).split("-").reverse().join("-")}
              </h5>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="tools px-2">
        <h3>Status</h3>
        <h5>Money Details: {credits()}</h5>
      </div>
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
          if (
            (e.author == localStorage.getItem("Username") && section) ||
            (e.author != localStorage.getItem("Username") && !section)
          )
            return (
              <div
                key={index}
                className="card p-1 my-1 mx-1 position-relative"
                //   style={{ width: "16rem" }}
              >
                {localStorage.getItem("Username") == e.author ? (
                  <MdDeleteForever
                    className="deleteButton position-absolute left-0 z-index-2"
                    onClick={() => deleteHistory(e._id, e.Username, index)}
                  />
                ) : (
                  ""
                )}
                <img
                  className="card-img-top "
                  src="https://th.bing.com/th/id/OIP.K7NwKlbwQo9WvIedWa-fYgHaE8?rs=1&pid=ImgDetMain"
                  alt="Card image cap"
                  width="90%"
                />
                <div className="card-body">
                  <h5 className="card-title my-1">{e.title}</h5>
                  <a
                    href="#"
                    className="btn btn-primary"
                    onClick={() => launchViewClickByRef(e)}
                  >
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
                            key={index}
                          >
                            <span
                              className="position-absolute labelForUsername"
                              id={`${index} + ${prevIndex}`}
                              htmlFor={index + " image"}
                            >
                              {contri.Username + " : " + contri.Desc}
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
