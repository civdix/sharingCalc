import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  function handleLabel() {
    document.querySelector(".label1").style.top = "8.9%";
    document.querySelector(".label2").style.top = "16.9%";
    document.querySelector(".label2").style.left = "43%";
    document.querySelector(".label1").style.left = "43%";
  }
  const [credentials, setCredentials] = useState({});

  const updateCredentials = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const loginMe = async () => {
    console.log(credentials);
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Username: credentials.Username,
        Password: credentials.Password,
      }),
    });
    if (response.ok) {
      const json = await response.json();
      localStorage.setItem("token", json.token);
      localStorage.setItem("Username", credentials.Username);
      navigate("/Calc");
    } else {
      console.log(await response.json());
      alert("Wrong Credentials");
    }
  };
  return (
    <div className="blur ">
      <center>
        <form className="form-inline my-2 my-lg-0  ">
          <label
            htmlFor="username"
            className="label1 position-absolute rounded text-dark"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="Username"
            autoComplete="new-password"
            className="form-control mr-sm-2 my-3 w-auto  text-dark d-block"
            onChange={updateCredentials}
            onFocus={handleLabel}
          />
          <label htmlFor="pass" className="label2  position-absolute  rounded ">
            Password
          </label>
          <input
            type="password"
            name="Password"
            autoComplete="new-password"
            id="pass"
            className="form-control mr-sm-2  w-auto  text-dark"
            onChange={updateCredentials}
            onFocus={handleLabel}
          />
        </form>
        <button
          className={`btn btn-outline-danger my-2 my-lg-2 btn-lg ${
            Object.keys(credentials).length === 2 ? "" : "disabled"
          }`}
          onClick={loginMe}
        >
          Login
        </button>
      </center>
    </div>
  );
}

export default Login;
