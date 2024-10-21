import React, { useState } from "react";

function SignUp() {
  const [data, setData] = useState({});
  const updateData = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const createAccount = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: data.Email,
          Password: data.Password,
          Name: data.Name,
          Username: data.Username,
          Phone: parseInt(data.Phone, 10), // Base 10 for proper conversion
        }),
      });

      if (!response.ok) {
        console.error(
          "Error occured as Response Ok is not true\n Error:",
          await response.json()
        );
      }
      const json = await response.json();
      if (json.success) {
        console.log(json.msg);
        localStorage.setItem("token", json.token);
      } else {
        console.log("!!!!Error found ", json.msg);
      }
    } catch (error) {
      console.log("Create Account error");
    }
  };
  return (
    <div className="bg-secondary mx-auto w-50 my-2 rounded p-3 ">
      <h1 style={{ fontFamily: "Bungee Tint" }}> SignUp</h1>

      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text" id="">
            First and last name
          </span>
        </div>
        <input
          type="text"
          autoComplete="new-password"
          name="Name"
          required
          className="form-control"
          onChange={(event) => {
            try {
              const lastName = data.Name.split(",")[1];
              const value = event.target.value + "," + lastName;
              updateData({
                target: {
                  value,
                  name: "Name",
                },
              });
            } catch (error) {
              setData({ ...data, Name: " , " });
            }
          }}
        />
        <input
          type="text"
          name="Name"
          required
          autoComplete="new-password"
          className="form-control"
          onChange={(event) => {
            try {
              const firstName = data.Name.split(",")[0];
              const value = firstName + "," + event.target.value;

              updateData({
                target: {
                  value,
                  name: "Name",
                },
              });
            } catch (error) {
              setData({ ...data, Name: " , " });
            }
          }}
        />
      </div>

      <div className="input-group  my-2">
        <div className="input-group-prepend">
          <button
            className="btn btn-outline-light dropdown-toggle"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            India(+91)
          </button>
          <div className="dropdown-menu">
            <span className="dropdown-item">Action</span>
            <span className="dropdown-item">Another action</span>
            <span className="dropdown-item">Something else here</span>
            <div role="separator" className="dropdown-divider"></div>
            <span className="dropdown-item">Separated link</span>
          </div>
        </div>
        <input
          type="number"
          placeholder="Phone📱"
          name="Phone"
          required
          className="form-control"
          aria-label="Text input with dropdown button"
          autoComplete="new-password"
          onChange={updateData}
        />
      </div>

      <div className="input-group my-1">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            Email
          </span>
        </div>
        <input
          type="email"
          className="form-control"
          name="Email"
          required
          placeholder="E-mail"
          aria-label="Username"
          aria-describedby="basic-addon1"
          autoComplete="new-password"
          onChange={updateData}
        />
      </div>

      <div className="input-group my-2">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            Password
          </span>
        </div>
        <input
          type="password"
          name="Password"
          required
          className="form-control"
          placeholder="Password"
          aria-label="Username"
          aria-describedby="basic-addon1"
          autoComplete="new-password"
          onChange={updateData}
        />
      </div>
      <div className="input-group my-1 mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            @
          </span>
        </div>
        <input
          type="text"
          name="Username"
          className="form-control"
          placeholder="Create or Click @ to autoGenerate"
          aria-label="Username"
          required
          aria-describedby="basic-addon1"
          autoComplete="new-password"
          onChange={updateData}
        />
      </div>

      <button
        className="btn btn-outline-light my-3  w-100"
        onClick={() => {
          createAccount();
        }}
      >
        Create Account
      </button>
      {Object.keys(data).map((elem, index) => {
        return <h1 key={index}>{elem + ":" + data[elem]}</h1>;
      })}
    </div>
  );
}

export default SignUp;
