import React from "react";
import { Link } from "react-router-dom";
import pic from "../../assets/images/christian-dubovan-Y_x747Yshlw-unsplash 2.png";
import "./about.css";
// import i18next from "i18next";
import { useTranslation } from "react-i18next";

const AboutUs = () => {
  const { t } = useTranslation();
  return (
    <div className="about" id="aboutus">
      <div className="container flex my-10 justify-between items-start bg-[#F6FFF9] p-10">
        <div className="content">
          <h1 className="text-[#3BAC62] my-8 text-4xl w-[90%] leading-10 font-semibold">
            {t("about_us")}
          </h1>
          <p className="text-[#6C7770] mb-6">{t("about_us_para")}</p>
          <Link to="/event" className="button">
            {t("moor")}
          </Link>
        </div>
        <div className="image">
          <img src={pic} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
