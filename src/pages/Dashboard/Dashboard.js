import React from 'react'
import "./dashboard.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from './../../components/dashboardCard/CardDashboard';
import { useSelector } from "react-redux";
import {
  faCirclePlus,
  faEllipsisVertical,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {

  const { user } = useSelector((state) => ({ ...state.auth }));

  return (
    <div className='dashboard_container'>
    <div className="main-content">
    
    <main>
      <div className="page-header">
        <div>
          <h1>{`Welcome ${user?.result?.firstName} ${user?.result?.lastName}`}</h1>
        </div>

        <div className="header-actions">
          <div>
            <FontAwesomeIcon icon={faCirclePlus} className="plus_Icon" />
          </div>
        </div>
      </div>
      <div className="cards">
      <Card title={"Resume"} numbers={"17582"} status={"2% less Booking"}/>
      <Card title={"Resume"} numbers={"17582"} status={"2% less Booking"}/>
      <Card title={"Resume"} numbers={"17582"} status={"2% less Booking"}/>
      <Card title={"Resume"} numbers={"17582"} status={"2% less Booking"}/>
      </div>
      <div className="movies-grid">
        <div className="movie-booking-detail-card">
          <h2>
            Resume{" "}
            <small>
              See all ticketes{" "}
              <span>
                <FontAwesomeIcon icon={faArrowRight} />
              </span>
            </small>
          </h2>
          <div className="table-responsive">
            <table width="95%">
              <tbody>
                <tr>
                  <td>
                    <div>
                      <span className="indicator"></span>
                    </div>
                  </td>
                  <td>
                    <div>3 Resume for movie 123</div>
                  </td>
                  <td>
                    <div>Booked by akash Patel</div>
                  </td>
                  <td>
                    <div>
                      <button>3 Resume</button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>
                      <span className="indicator even"></span>
                    </div>
                  </td>
                  <td>
                    <div>3 Resume for movie 123</div>
                  </td>
                  <td>
                    <div>Booked by akash Patel</div>
                  </td>
                  <td>
                    <div>
                      <button>3 Resume</button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>
                      <span className="indicator"></span>
                    </div>
                  </td>
                  <td>
                    <div>3 Resume for movie 123</div>
                  </td>
                  <td>
                    <div>Booked by akash Patel</div>
                  </td>
                  <td>
                    <div>
                      <button>3 Resume</button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>
                      <span className="indicator even"></span>
                    </div>
                  </td>
                  <td>
                    <div>3 Resume for movie 123</div>
                  </td>
                  <td>
                    <div>Booked by akash Patel</div>
                  </td>
                  <td>
                    <div>
                      <button>3 Resume</button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>
                      <span className="indicator"></span>
                    </div>
                  </td>
                  <td>
                    <div>3 Resume for movie 123</div>
                  </td>
                  <td>
                    <div>Booked by akash Patel</div>
                  </td>
                  <td>
                    <div>
                      <button>3 Resume</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="analytics-card">
          <div className="analytics-head">
            <h2>Action nedded</h2>
            <span className="">
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </span>
          </div>

          <div className="analytics-chart">
            <div className="chart-circle">
              <h1>74%</h1>
            </div>
          </div>

          <div className="analytics-note">
            <small>
              Note : Current sprint requires stackholders meeting to reach
              conclusion
            </small>
          </div>

          <div className="analytics-btn">
            <button>Generate Report</button>
          </div>
        </div>
      </div>
    </main>
  </div>
    </div>
  )
}

export default Dashboard