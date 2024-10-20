import React from 'react'

function SignUp() {
  return (
    <div className='bg-secondary mx-auto w-50 my-2 rounded p-3 '>
<h1  style={{fontFamily:"Bungee Tint"}}> SignUp</h1> 


<div className="input-group">
  <div className="input-group-prepend">
    <span className="input-group-text" id="">First and last name</span>
  </div>
  <input type="text" className="form-control"/>
  <input type="text" className="form-control"/>
</div>

<div className="input-group  my-2">
  <div className="input-group-prepend">
    <button className="btn btn-outline-light dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">India(+91)</button>
    <div className="dropdown-menu">
      <a className="dropdown-item" href="#">Action</a>
      <a className="dropdown-item" href="#">Another action</a>
      <a className="dropdown-item" href="#">Something else here</a>
      <div role="separator" className="dropdown-divider"></div>
      <a className="dropdown-item" href="#">Separated link</a>
    </div>
  </div>
  <input type="number" placeholder="Phone📱"className="form-control" aria-label="Text input with dropdown button"/>
</div>

<div className="input-group my-1">
  <div className="input-group-prepend">
    <span className="input-group-text" id="basic-addon1">Email</span>
  </div>
  <input type="email" className="form-control" placeholder="E-mail" aria-label="Username" aria-describedby="basic-addon1"/>
</div>

<div className="input-group my-2">
  <div className="input-group-prepend">
    <span className="input-group-text" id="basic-addon1">Password</span>
  </div>
  <input type="password" className="form-control" placeholder="Password" aria-label="Username" aria-describedby="basic-addon1"/>
</div>
<div className="input-group my-1 mb-3">
  <div className="input-group-prepend">
    <span className="input-group-text" id="basic-addon1">@</span>
  </div>
  <input type="text" className="form-control" placeholder="Create or Click @ to autoGenerate" aria-label="Username" aria-describedby="basic-addon1"/>
</div>

<button className="btn btn-outline-light my-3  w-100">Create Account</button>
    </div>
  )
}

export default SignUp;