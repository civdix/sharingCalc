import React from 'react'
import { Link } from 'react-router-dom'


function Navbar() {


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
  <Link className="navbar-brand" to="/">Sharing & Caring Calculator</Link>
  <button className="navbar-toggler " type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"> TOggle me </span>
  </button>

  <div className="collapse navbar-collapse ms-auto" id="navbarSupportedContent">
    <ul className="navbar-nav ms-auto ">
      <li className="nav-item active">
        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/Pending">Pending</Link>
      </li>
      <li className="nav-item dropdown">
        <Link className="nav-link dropdown-toggle" to="/Notification" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Notification
        </Link>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link className="dropdown-item" to="https//www.google.com">Action</Link>
          <Link className="dropdown-item" to="https//www.google.com">Another action</Link>
          <div className="dropdown-divider"></div>
          <Link className="dropdown-item" to="https//www.google.com">Something else here</Link>
        </div>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/Analytics">Analysis</Link>
      </li>
    </ul>
    <form className="form-inline my-2 my-lg-0 float-end ms-auto">
      <input className="form-control mr-sm-2 d-inline-block w-auto bg-secondary text-dark" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>
  )
}

export default Navbar