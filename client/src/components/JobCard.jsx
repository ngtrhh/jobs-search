import React from "react";
import { Link } from "react-router-dom";

const JobCard = ({ item }) => {
  return (
    <Link to={{ pathname: `/${item.slug}` }} state={{ item }}>
      <div className="job-card">
        {item.thumbnail ? (
          <img src={item.thumbnail} />
        ) : (
          <div className="img">{item.company_name}</div>
        )}
        <div className="content">
          <div className="company-name">{item.company_name}</div>
          <div className="title">{item.title}</div>
          <div className="row">
            <div className="type-list">
              {item.schedule_type.map((item, index) => (
                <div key={index} className="schedule-type">
                  {item}
                </div>
              ))}
            </div>
            <div className="other">
              <div className="item">
                <span className="material-symbols-outlined">public</span>
                {item.location}
              </div>
              {item.detected_extensions.posted_at && (
                <div className="item">
                  <span className="material-symbols-outlined">schedule</span>
                  {item.detected_extensions.posted_at}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
