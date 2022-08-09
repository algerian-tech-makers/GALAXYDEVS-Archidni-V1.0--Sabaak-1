import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import "./home/home.css";
import { useTranslation } from "react-i18next";
import Dropdown from "react-bootstrap/Dropdown";
import Cookies from "js-cookie";
import i18next from "i18next";
import { US, DZ } from "country-flag-icons/react/3x2";

const TranslateIcon = ({ width = 24, height = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="currentColor"
    className="bi bi-translate"
    viewBox="0 0 16 16"
  >
    <path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286H4.545zm1.634-.736L5.5 3.956h-.049l-.679 2.022H6.18z" />
    <path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2zm7.138 9.995c.193.301.402.583.63.846-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6.066 6.066 0 0 1-.415-.492 1.988 1.988 0 0 1-.94.31z" />
  </svg>
);

const languages = [
  {
    code: "en",
    name: "English",
    country_code: "gb",
    icon: <US title="United States" className="flag" />,
  },
  {
    code: "ar",
    name: "العربية",
    dir: "rtl",
    country_code: "sa",
    icon: <DZ title="Algeria" className="flag" />,
  },
];

const NavBar = () => {
  const currentLanguageCode = Cookies.get("i18next") || "en";
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);

  const { isAuthenticated } = useSelector((state) => state.user);
  const { t } = useTranslation();

  useEffect(() => {
    document.body.dir = currentLanguage.dir || "ltr";
    // console.log(document.body.dir);
  }, [currentLanguage]);

  const [state, setState] = useState(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", function () {
      if (this.scrollY > 0) {
        setState("active");
      } else {
        setState(null);
      }
    });
  }, []);

  const navigate = useNavigate();
  return (
    <nav className={state && "active"}>
      <div className="container">
        <div className=" logo">
          <Link to="/">
            <img src={logo} alt="Archidni" />
          </Link>
        </div>
        <div className="mobile">
          <FaBars onClick={() => setShow(!show)} />
        </div>
        <ul className={`${show ? "nav-bar active" : "nav-bar"}`}>
          <Link
            key={Math.floor(Math.random() * 1000000)}
            to={`/`}
            className={`navColor ${({ isActive }) =>
              isActive ? "active" : ""}`}
          >
            {t("home")}
          </Link>
          <Link
            key={Math.floor(Math.random() * 1000000)}
            to={`/#schools`}
            className={`navColor ${({ isActive }) =>
              isActive ? "active" : ""}`}
          >
            {t("schools")}
          </Link>
          <Link
            key={Math.floor(Math.random() * 1000000)}
            to={`/#news`}
            className={`navColor ${({ isActive }) =>
              isActive ? "active" : ""}`}
          >
            {t("news")}
          </Link>
          <Link
            key={Math.floor(Math.random() * 1000000)}
            to={`/#contactus`}
            className={`navColor ${({ isActive }) =>
              isActive ? "active" : ""}`}
          >
            {t("contact_us")}
          </Link>
          <Link
            key={Math.floor(Math.random() * 1000000)}
            to={`/#aboutus`}
            className={`navColor ${({ isActive }) =>
              isActive ? "active" : ""}`}
          >
            {t("about_us")}
          </Link>
          {isAuthenticated && (
            <>
              <Link
                key={Math.floor(Math.random() * 1000000)}
                to={`/dashboard`}
                className={`navColor ${({ isActive }) =>
                  isActive ? "active" : ""} login`}
              >
                {t("dash")}
              </Link>
              <Link
                key={Math.floor(Math.random() * 1000000)}
                to={`/`}
                className={`navColor ${({ isActive }) =>
                  isActive ? "active" : ""} login`}
              >
                {t("logout")}
              </Link>
            </>
          )}
          {!isAuthenticated && (
            <Link
              key={Math.floor(Math.random() * 1000000)}
              to={`/login`}
              className={`navColor ${({ isActive }) =>
                isActive ? "active" : ""} login`}
            >
              {t("login")}
            </Link>
          )}
        </ul>

        <Dropdown>
          <Dropdown.Toggle variant="link" id="dropdown-basic">
            <TranslateIcon />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {languages.map(({ code, name, country_code, icon }) => {
              return (
                <Dropdown.Item
                  // elementType={Button}
                  style={{ display: "flex", justifyContent: "start" }}
                  key={country_code}
                  onClick={() => i18next.changeLanguage(code)}
                  disabled={code === currentLanguageCode}
                >
                  <span
                    className={`flag-icon flag-icon-${country_code} `}
                    style={{
                      opacity: code === currentLanguageCode ? 0.3 : 1,
                    }}
                  ></span>

                  {icon}
                  {name}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>

        <button onClick={() => navigate("/addschool")}>
          {t("add_school")}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
