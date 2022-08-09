import React from "react";
import NavBar from "../NavBar";
import hero from "../../assets/images/hero.png";
import { Link } from "react-router-dom";
import "./home.css";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-[url(./assets/images/bg.png)] bg-no-repeat">
      <NavBar />
      <div className="landing">
        <div className="container">
          <div className="content">
            <h1>{t("banner_title")}</h1>
            <p>{t("banner_para")}</p>
            <div className="btns">
              {/* <Link className='button active' to='/apply'>
                Apply
              </Link> */}
              <Link className="button" to="/exploreSchools">
                {t("explore")}
              </Link>
            </div>
          </div>
          <div className="images">
            <img src={hero} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
