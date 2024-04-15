import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Details = () => {
  const { state } = useLocation();
  const { item } = state || {};
  const navigate = useNavigate();

  const type = item.detected_extensions.schedule_type.split(" and ");

  return (
    <div className="details">
      <div className="details__right">
        <div className="back" onClick={() => navigate(-1)}>
          <span className="material-symbols-outlined">arrow_left_alt</span>
          Back to search
        </div>
        <div className="label">How to Apply</div>
        <div className="infor">
          Please email a copy of your resume and online portfolio to
          <span> wes@kasisto.com</span> & CC<span> eric@kasisto.com</span>
        </div>
      </div>

      <div className="details__content">
        <div className="title">
          <div className="position">{item.title}</div>
          {type.map((item, index) => (
            <div key={index} className="schedule-type">
              {item}
            </div>
          ))}
        </div>

        {item.detected_extensions.posted_at && (
          <div className="time-post">
            <span className="material-symbols-outlined">schedule</span>
            {item.detected_extensions.posted_at}
          </div>
        )}

        <div className="company">
          {item.thumbnail ? (
            <img src={item.thumbnail} />
          ) : (
            <div className="img">{item.company_name}</div>
          )}

          <div className="company__information">
            <div className="company-name">{item.company_name}</div>
            <div className="address">
              <span className="material-symbols-outlined">public</span>
              {item.location}
            </div>
          </div>
        </div>

        <div className="description">{item.description}</div>
      </div>
    </div>
  );
};

export default Details;
