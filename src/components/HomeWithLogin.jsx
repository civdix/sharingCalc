import React from 'react'
// This will contains a part of section of Home which will appear if login is True;
function HomeWithLogin() {
  return (
    <div>
        <button className="btn btn-outline-primary" style={{marginLeft:"-52%"}}>
          Create a new Share
          {/* will open a modal where i can select my sharing buddies from my friends list which is present in my backend every user will have there unique username */}
        </button>
        <button className="btn btn-outline-primary mx-5"> Track Caring </button>
    </div>
  )
}

export default HomeWithLogin