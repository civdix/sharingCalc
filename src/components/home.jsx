import React from "react";
import { FaGripLinesVertical } from "react-icons/fa";
import { AiOutlineQuestion,AiOutlineMinus } from "react-icons/ai";
import { GiStraightPipe } from "react-icons/gi";

function Home() {
  const login = true;
  if (login) {
    return (
      <div className="bg-dark text-light blur my-2 rounded p-2 d-flex">
        <div className="float-start my-auto">
       <  FaGripLinesVertical className="position-absolute  clip " size={40}/>
       <GiStraightPipe size={50} className="position-absolute  lfty" color="#414546" />
       <GiStraightPipe size={50} className="position-absolute  " color="#414546"  style={{top:'8%',rotate:"315deg",left:'78.9%'
       }}/>
       <img src={require("../resources/Image/handshake.png")} alt="handshake" width="25%" className="position-absolute" style={{top:'11%',rotate:"315deg",left:'4.9%'
       }}/>
          <div className="fun position-absolute my-2">
            <h1>
              <span className="one">f</span>
              <span className="two">u</span>
              <span className="three">n</span>
              {/* <span className="four">e</span>
               <span className="five">u</span>
              <span className="six">p</span> */}
            </h1>
          </div>
          <div className="fun2 position-absolute my-2  lfty">
            <h1>
              <span className="one">f</span>
              <span className="two">r</span>
              <span className="three">i</span>
              <span className="four">e</span>
               <span className="five">n</span>
              <span className="six">d</span>
              <span className="seven">s</span>

            </h1>
          </div>
          <img
            src={require("../resources/Image/arow.png")}
            alt="arrow"
            width="11%"
            className="position-absolute pa"
          />
          <img
            src={require("../resources/Image/da.png")}
            alt="dataAnalysis"
            width="25%"
            className="mx-2 "
          />
          <h2 className="text-start " style={{fontFamily:"Bungee Tint"}}>Sharing & Caring Calculator</h2>
          <p className="text-start w-75 mx-2" >
            We provide multi problem solution with this app where you can easily
            track your expenses and other financials activities along with the
            high visulalize Data analysis that will help you to make your
            decision on your health and Money
          </p>
          <div className="loginSignup position-absolute my-5" style={{left:'42.9%',zIndex:2
       }}>
            <button className="btn btn-outline-primary">Login</button>
            <button className="btn btn-outline-primary mx-5">Sign-Up</button>
          </div>
        </div>
          <AiOutlineQuestion size={55} />
        <div className="float-end my-auto">
          {/* */}
          <img
            src={require("D:/Reactproject/sharingCalc/sharingCalc/src/resources/Image/friends.png")}
            width="400px"
            alt="friends"
            className="nothing"
          />
        <img src={require("../resources/Image/pagePush.png")} alt="page push" className="position-absolute" width="50%" style={{top:"64%",left:"24.5%",zIndex:1}}/>
        </div>
      </div>
    );
  }

  // Other wise
  return <div>When user is logged in</div>;
}

export default Home;
