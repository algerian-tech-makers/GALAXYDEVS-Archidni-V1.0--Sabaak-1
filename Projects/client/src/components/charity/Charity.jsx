import React from "react";
import { Link } from "react-router-dom";
import charity from "../../assets/images/christian-dubovan-Y_x747Yshlw-unsplash 2.png";
import "./charity.css";
import { useTranslation } from "react-i18next";
const Charity = () => {
  const { t } = useTranslation();
  return (
    <div className="charity space">
      <div className="container">
        <div className="image">
          <div className="trick">
            <img src={charity} alt="charity" />
          </div>
        </div>
        <div className="content">
          <h3>{t("third_sec_title")}</h3>
          <p>{t("third_sec_para")}</p>
          <Link to="/" className="button active">
            {t("donate")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Charity;
