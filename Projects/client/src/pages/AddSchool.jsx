import React, { Fragment, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import "./AddSchool.css";
import NumberFormat from "react-number-format";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearEroors, createSchoolReq } from "../actions/schoolsActions";
import { ADD_SCHOOL_RESET } from "../constants/schoolsConstants";
import Loader from "../components/Loader/Loader";
import { useTranslation } from "react-i18next";

const AddScool = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector(
    (state) => state.newSchoolReq
  );

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [maxStudent, setMaxStudent] = useState(0);
  const [type, setType] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("address", address);
    myForm.set("email", email);
    myForm.set("phone", phone);
    myForm.set("maxStudent", maxStudent);
    myForm.set("type", type);
    myForm.set("image", image);

    dispatch(createSchoolReq(myForm));
  };

  const updateProfileDataChange = (e) => {
    if (e.target.name === "image") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearEroors());
    }

    if (success) {
      alert.success("school demand created Successfully");
      navigate("/");
      dispatch({ type: ADD_SCHOOL_RESET });
    }
  }, [dispatch, alert, error, navigate, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <NavBar />
          <div
            className="add_school"
            // style={{ display: "flex", justifyContent: "center" }}
          >
            <div className="container">
              <div className="row" style={{ justifyContent: "center" }}>
                <div className="col-md-7">
                  <div className="details">
                    <form onSubmit={handleSubmit} className="row g-3">
                      <div className="col-md-12">
                        <label htmlFor="Schoolname" className="form-label">
                          {t("sql_name")}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="Schoolname"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>

                      <div className="col-md-12">
                        <label htmlFor="inputState" className="form-label">
                          {t("address")}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="schoolAddress"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>

                      <div className="col-md-12">
                        <label htmlFor="email" className="form-label">
                          {t("email")}
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div className="col-md-12">
                        <label htmlFor="phone" className="form-label">
                          {t("phone")}
                        </label>
                        <NumberFormat
                          name="phoneNumber"
                          className="form-control"
                          thousandSeparator={true}
                          id="phoneNumber"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>

                      <div className="col-md-12">
                        <label htmlFor="avalible" className="form-label">
                          {t("places")}
                        </label>
                        <NumberFormat
                          name="places"
                          className="form-control"
                          thousandSeparator={true}
                          id="places"
                          value={maxStudent}
                          onChange={(e) => setMaxStudent(e.target.value)}
                        />
                      </div>

                      <div className="col-md-12">
                        <label htmlFor="fees" className="form-label">
                          {t("type")}
                        </label>
                        <input
                          className="form-control"
                          id="fees"
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                        />
                      </div>

                      <div className="col-md-12">
                        <label htmlFor="file" className="form-label">
                          {t("img")}
                        </label>
                        <input
                          className="form-control"
                          id="logo"
                          type="file"
                          name="image"
                          accept="image/*"
                          onChange={updateProfileDataChange}
                        />
                      </div>

                      <div className="col-12 btn">
                        <button
                          type="submit"
                          className=" button active cursor-pointer w-fit hover:border-1 hover:border-transparent"
                        >
                          {t("apply")}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default AddScool;
