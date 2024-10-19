import React, { useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
function Calc() {
    const [person,setPerson] = useState([1]);
  return (
    <div className="w-50 mx-auto bg-secondary mx-auto my-2 rounded p-3">
      <div class="input-group input-group-sm mb-3 ">
        <span class="input-group-text" id="inputGroup-sizing-sm">
          Memory Title
        </span>
        <input
          type="text"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-sm"
        />
        <span class="input-group-text">Tag</span>
        <input
          type="text"
          class="form-control"
          placeholder="Tag(Ex:Food, Travel, Borrow)"
          aria-label="Server"
        />
      </div> 
      {
            person.map((elem)=>{
                return <div class="input-group mb-3 ">
       
                <input
                  type="text"
                  class="form-control"
                  placeholder={elem+": Username"}
                  aria-label="Username"
                />
                <span class="input-group-text">₹</span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="₹"
                  aria-label="Server"
                />
        <span class="input-group-text">Desc</span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Desc"
                  aria-label="Server"
                />
                <IoCloseCircleSharp size={30} className={person.length == elem && elem !=1 ?"d-unset text-dark mx-1 my-1":"d-none"} onClick={()=>{
                    setPerson(person.slice(0,person.length-1));
                }}/>
              </div>
            })
        }

      
        <div className="userNameRecomendation">
          {/* Display will only be non none when no input will be in focus and when there is no text in input so it suggest random friends or recent userName used by account holder */}
        </div>
      <button class="btn btn-primary w-100 my-1" type="button" onClick={()=>{
        setPerson([...person,person.length+1])
      }}>Add Friend</button>
      <div className="input-group my-1">
          <input
            type="file"
            class="form-control"
            id="inputGroupFile04"
            aria-describedby="inputGroupFileAddon04"
            aria-label="Upload"
          />
          <button
            class="btn btn-outline-light"
            type="button"
            id="inputGroupFileAddon04"
          >
            View
          </button>
        </div>
        <button class="btn btn-primary w-100 my-1" type="button">Create Share</button>
    </div>
  );
}

export default Calc;
