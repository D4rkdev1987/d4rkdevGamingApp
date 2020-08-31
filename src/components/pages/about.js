import React from 'react'
import profilePicture from "../../../static/assets/images/bio/Untitled91.jpg"

export default function() {
  return (
      <div className="content-page-wrapper">
          <div 
            className="left-column"  
            style={{ 
              background: "url(" + profilePicture + ") no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          />

          <div className="right-column">
            <h1>skills</h1>
            <h3>Coding and Gaming</h3>
            <p>My name is Ben, but most people call me D4rkdev</p>
            <p>I am a software engineer during the day and Elite Gamer at night</p>
          </div>
      </div>
  )
}