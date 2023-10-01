import React from 'react'
import "./cardDashboard.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
const CardDashboard = ({title, numbers, status}) => {
  return (
    <>
    {}
    
    <div className="card_dashboard-single">
      <div className="card_dashboard-flex">
        <div className="card_dashboard-info">
          <div className="card_dashboard-head">
            <span>{title}</span>
            <h2>{numbers}</h2>
            <small>{status}</small>
          </div>
        </div>
        <div className="card_dashboard-chart">
          <span>
            <FontAwesomeIcon icon={faChartLine} />
          </span>
        </div>
      </div>
    </div>
    
    </>
  )
}

export default CardDashboard