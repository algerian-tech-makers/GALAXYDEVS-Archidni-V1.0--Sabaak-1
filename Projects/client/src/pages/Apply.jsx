import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearEroors, newStdReq } from "../actions/schoolsActions";
import Loader from "../components/Loader/Loader";
import NavBar from "../components/NavBar";
import "./apply.css";

const Apply = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { id } = useParams();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [stdReqImg, setStdReqImg] = useState("");

  const { loading, error, success } = useSelector((state) => state.stdReducer);

  const updateImgChange = (e) => {
    if (e.target.name === "stdReqImg") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setStdReqImg(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const OnSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("firstName", firstName);
    myForm.set("lastName", lastName);
    myForm.set("birthday", birthday);
    myForm.set("address", address);
    myForm.set("email", email);
    myForm.set("phone", phone);
    myForm.set("gender", gender);
    myForm.set("stdReqImg", stdReqImg);
    myForm.append("schoolId", id);
    dispatch(newStdReq(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearEroors());
    }
    if (success) {
      alert.success("request has been sent successfully");
      navigate("/");
    }
  }, [dispatch, alert, navigate, error, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <NavBar />
          <div className="apply">
            <div className="container">
              <div className="left-box">
                <h1>Apply Now</h1>
                <div className="desc">
                  <h3>That the prophet Mohamed peace be upon him said:</h3>
                  <p>
                    “Whoever takes a path upon which to obtain knowledge, Allah
                    makes the path to Paradise easy htmlFor him.”
                  </p>
                </div>
              </div>
              <div className="right-box">
                <h3>Who are you</h3>
                <form onSubmit={OnSubmit}>
                  <div className="input-group">
                    <div className="mb-3 ">
                      <label htmlFor="first-name" className="form-label">
                        First name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="first_name"
                        id="first-name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="last-name" className="form-label">
                        Last name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="last_name"
                        id="last-name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="input-group">
                    <div className="mb-3">
                      <label htmlFor="date" className="form-label">
                        Date of birth
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        name="date"
                        id="date"
                        onChange={(e) => setBirthday(e.target.value)}
                        value={birthday}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />
                    </div>
                  </div>

                  <label className="input-file" htmlFor="formFile1">
                    <div className="file-icon">
                      <i className="bx bx-file-blank"></i>
                    </div>
                    <div className="hint">
                      <p>Select an ID file to upload</p>
                      <h4>or drag and drop it here</h4>
                    </div>
                    <div className="line">
                      <hr />
                      <span>Or</span>
                      <hr />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="formFile1" className="custom-input">
                        Browse file
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        name="stdReqImg"
                        id="formFile1"
                        onChange={updateImgChange}
                      />
                    </div>
                  </label>

                  <div className="price">
                    <div className="checkbox">
                      <div className="mb-3" style={{ flex: "0.75" }}>
                        <label htmlFor="email" className="form-label">
                          Adress
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="address"
                          id="address"
                          onChange={(e) => setAddress(e.target.value)}
                          value={address}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="price">
                    <div className="checkbox">
                      <div className="mb-3" style={{ flex: "0.75" }}>
                        <label htmlFor="email" className="form-label">
                          Phone
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="phone"
                          id="phone"
                          onChange={(e) => setPhone(e.target.value)}
                          value={phone}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="suggest">
                    <h3>Where do you want to study?</h3>
                    <select
                      className="form-select form-select-lg mb-3"
                      name="suggest"
                      onChange={(e) => setGender(e.target.value)}
                      value={gender}
                    >
                      <option value="0"></option>
                      <option value="1">Male</option>
                      <option value="2">Female</option>
                    </select>
                  </div>
                  <div className="submit">
                    <input type="submit" value="Apply" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default Apply;
