import React from 'react'
import profilePicture from "../../../static/assets/images/contact/shop-hacker.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


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
          <h1>How to Contact Me</h1>
          <div className="contact-bullet-points">
            <div className="bullet-point-group">
              <div className="icon">
                <FontAwesomeIcon icon="gem" spin />
              </div>
              <div className="text">
                555-555-5555
              </div>
            </div>
          </div>

          <div className="contact-bullet-points">
            <div className="bullet-point-group">
              <div className="icon">
              <FontAwesomeIcon icon="meteor" spin />
              </div>
              <div className="text">
                555-555-5555
              </div>
            </div>
          </div>

          <div className="contact-bullet-points">
            <div className="bullet-point-group">
              <div className="icon">
              <FontAwesomeIcon icon="space-shuttle" spin />
              </div>
              <div className="text">
                555-555-5555
              </div>
            </div>
          </div>

        </div>
    </div>
  )
}