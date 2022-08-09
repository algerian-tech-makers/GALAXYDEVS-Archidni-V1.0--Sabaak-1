import React, { Fragment, useEffect, useState } from "react";
import "./newSchool.css";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import Button from "@mui/material/Button";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import PhoneIcon from "@mui/icons-material/Phone";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import { Country, State, City } from "country-state-city";
import FlagIcon from "@mui/icons-material/Flag";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import { NEW_SCHOOL_RESET } from "../../constants/schoolsConstants";
import Loader from "../../components/Loader/Loader";
import PasswordIcon from "@mui/icons-material/Password";
import { clearErrors, register } from "../../actions/userActions";

const NewUser = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, loading, success } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState([]);
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");
  const [imagesPreview, setImagesPreview] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("user created successfully");
      navigate("/admin/users");
    }
  }, [dispatch, error, alert, navigate, success]);

  const createUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    setAddress((old) => [...old, country, state, city]);

    myForm.set("name", name);
    myForm.set("address", address);
    myForm.set("userId", userId);
    myForm.set("phone", phone);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };

  const createUserImagesChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="dashboard">
            <Sidebar />
            <div className="newSchoolContainer">
              <form
                className="createSchoolForm"
                encType="multipart/form-data"
                onSubmit={createUserSubmitHandler}
              >
                <h1>Create User</h1>
                <div>
                  <SpellcheckIcon />
                  <input
                    type="text"
                    placeholder="full Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <FlagIcon />
                  <select
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="">Country</option>
                    {Country &&
                      Country.getAllCountries().map((item, index) => (
                        <option key={index} value={item.isoCode}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
                {country && (
                  <div>
                    <LocationOnIcon />

                    <select
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    >
                      <option value="">State</option>
                      {State &&
                        State.getStatesOfCountry(country).map((item, index) => (
                          <option key={index} value={item.isoCode}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                )}
                {state && (
                  <div>
                    <LocationSearchingIcon />

                    <select
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    >
                      <option value="">City</option>
                      {City &&
                        City.getCitiesOfState(country, state).map(
                          (item, index) => (
                            <option key={index} value={item.id}>
                              {item.name}
                            </option>
                          )
                        )}
                    </select>
                  </div>
                )}
                <div>
                  <FingerprintIcon />

                  <input
                    placeholder="School Email"
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                  />
                </div>
                {/* <div>
                  <FingerprintIcon />

                  <input
                    placeholder="Used ID"
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                  />
                </div> */}
                <div>
                  <PasswordIcon />
                  <input
                    type="password"
                    placeholder="password"
                    required
                    // value={phone}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <PhoneIcon />
                  <input
                    type="number"
                    placeholder="phone number"
                    required
                    // value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div id="createSchoolFormFile">
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={createUserImagesChange}
                    multiple
                  />
                </div>
                <div id="createSchoolFormImage">
                  <img src={imagesPreview} alt="School Preview" />
                </div>

                <Button
                  id="createSchoolBtn"
                  type="submit"
                  //   disabled={loading ? true : false}
                >
                  Create
                </Button>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default NewUser;
