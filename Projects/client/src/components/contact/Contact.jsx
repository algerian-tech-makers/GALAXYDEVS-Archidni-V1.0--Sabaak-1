import React from "react";
import contact from "../../assets/images/contact-us.png";
import "./contact.css";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();
  return (
    <div className="contact-us sp">
      <div className="container">
        <div className="title">
          <h1 className="text-[#3BAC62] my-8 text-4xl w-[90%] leading-10 font-semibold">
            {t("contact_us")}
          </h1>
          <p className="text-[#6C7770] mb-6">{t("contact_para")}</p>
        </div>
      </div>
      <div className="container">
        <div className="image">
          <div className="trick">
            <img src={contact} alt="contact-us" />
          </div>
        </div>
        <div className="content">
          <div className="input-group mb-3 input-group-lg">
            <i className="bx bx-user btn btn-outline-secondary"></i>
            <input
              type="text"
              className="form-control"
              placeholder={`${t("ur_name")}`}
            />
          </div>
          <div className="input-group mb-3 input-group-lg">
            <i className="bx bx-envelope btn btn-outline-secondary"></i>
            <input
              type="email"
              className="form-control"
              placeholder={`${t("ur_mail")}`}
            />
          </div>
          <div className="input-group">
            <textarea
              className="form-control"
              placeholder={`${t("ur_msg")}`}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
