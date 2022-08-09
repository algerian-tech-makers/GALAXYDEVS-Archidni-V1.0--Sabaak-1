import React from "react";
import { Link } from "react-router-dom";
import events from "../../assets/images/events.png";
import "./event.css";
import { useTranslation } from "react-i18next";

const Events = () => {
  const { t } = useTranslation();
  return (
    <div className="events-news sp">
      <div className="container">
        <div className="content">
          <p>{t("ev_and_news")}</p>
          <h3>{t("second_sec_title")}</h3>
          <p>{t("second_sec_para")}</p>
          <Link to="/event" className="button">
            {t("moor")}
          </Link>
        </div>
        <div className="image">
          <img src={events} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Events;
