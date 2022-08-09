import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "./footer.css";
import { useTranslation } from "react-i18next";
const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer>
      <div className="container">
        <div className="content">
          <div className="subscribe">
            <div className="logo">
              <img src={logo} alt="logo" />
            </div>
            <h3>{t("sub_news_letter")}</h3>
            <p>{t("sub_news_letter_para")}</p>
            <form>
              <div className="input">
                <input
                  type="email"
                  name=""
                  id=""
                  placeholder={`${t("email")}`}
                />
                <input type="submit" value={`${t("subscribe")}`} />
              </div>
            </form>
          </div>
          <div className="links">
            <ul>
              <li>
                <Link to="/">{t("about_us")}</Link>
              </li>
              <li>
                <Link to="/">{t("contact_us")}</Link>
              </li>
              <li>
                <Link to="/">{t("license")}</Link>
              </li>
              <li>
                <Link to="/">{t("blogs")}</Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link to="/">{t("faq")}</Link>
              </li>
              <li>
                <Link to="/">{t("privacy")}</Link>
              </li>
              <li>
                <Link to="/">{t("sitemap")}</Link>
              </li>
              <li>
                <Link to="/">{t("members")}</Link>
              </li>
            </ul>
          </div>
        </div>
        <hr />
        <p className="copyright">{t("copy_rights")}</p>
      </div>
    </footer>
  );
};

export default Footer;
