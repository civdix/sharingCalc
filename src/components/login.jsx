import React from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    function handleLabel(){
            document.querySelector(".label1").style.top = "8.9%";
            document.querySelector(".label2").style.top = "16.9%";
            document.querySelector(".label2").style.left = "43%";
            document.querySelector(".label1").style.left = "43%";
    }

  return (
   
    <div className='blur '>
        
        <center>
        <form className="form-inline my-2 my-lg-0  ">
        <label for="username" className='label1 position-absolute rounded text-dark'>Username</label>
        <input type="text" id="username" name="username" className='form-control mr-sm-2 my-3 w-auto  text-white d-block' 
        onLoad={handleLabel}
        onFocus={handleLabel}/>
        <label for="pass" className='label2  position-absolute  rounded ' >Password</label>
        <input type="password" name="password" id="pass" className='form-control mr-sm-2  w-auto  text-white' onFocus={handleLabel}/>
    </form>
        <button className="btn btn-outline-danger my-2 my-lg-2 btn-lg" onClick={()=>navigate("/Calc")} >Login</button>
        </center>

     

    </div>
  )
}

export default Login