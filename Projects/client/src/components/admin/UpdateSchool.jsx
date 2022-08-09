import React, { Fragment, useEffect, useState } from "react";
import "./newSchool.css";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import Button from "@mui/material/Button";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import EmailIcon from "@mui/icons-material/Email";
import FlightClassIcon from "@mui/icons-material/FlightClass";
import PhoneIcon from "@mui/icons-material/Phone";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import { Country, State, City } from "country-state-city";
import FlagIcon from "@mui/icons-material/Flag";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Sidebar from "./Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import {
  clearEroors,
  getSchoolDetails,
  updateSchool,
} from "../../actions/schoolsActions";
import { UPDATE_SCHOOL_RESET } from "../../constants/schoolsConstants";
import Loader from "../../components/Loader/Loader";

const UpdateSchool = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.school);

  const { error, school } = useSelector((state) => state.schoolDetail);

  const [name, setName] = useState("");
  const [address, setAddress] = useState([]);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [maxStudent, setMaxStudent] = useState(0);
  const [image, setImage] = useState("");
  const [imagesPreview, setImagesPreview] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [type, setType] = useState("");
  const [oldImage, setOldImage] = useState("");
  const [oldAdress, setOldAdress] = useState();

  const types = ["Paid", "Free"];

  const { id } = useParams();

  useEffect(() => {
    if (school && school._id !== id) {
      dispatch(getSchoolDetails(id));
    } else {
      setOldAdress(school.address.split(","));
      setName(school.name);
      setCountry(oldAdress && oldAdress[0]);
      setState(oldAdress && oldAdress[1]);
      setCity(oldAdress && oldAdress[2]);
      setEmail(school.email);
      setPhone(school.phone);
      setMaxStudent(Number(school.maxStudent));
      setType(school.type);
      setOldImage(school.image);
    }

    if (error) {
      alert.error(error);
      dispatch(clearEroors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearEroors());
    }

    if (isUpdated) {
      alert.success("school Updated Successfully");
      navigate("/admin/schools");
      dispatch({ type: UPDATE_SCHOOL_RESET });
    }
  }, [dispatch, alert, error, isUpdated, school, updateError, navigate, id]);
  const createSchoolSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    setAddress((old) => [...old, country, state, city]);

    myForm.set("name", name);
    myForm.set("address", address);
    myForm.set("email", email);
    myForm.set("phone", phone);
    myForm.set("maxStudent", maxStudent);
    myForm.set("type", type);
    myForm.set("image", image);
    dispatch(updateSchool(id, myForm));
  };

  const createSchoolImagesChange = (e) => {
    if (e.target.name === "image") {
      const reader = new FileReader();
      setOldImage("");

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview(reader.result);
          setImage(reader.result);
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
                onSubmit={createSchoolSubmitHandler}
              >
                <h1>Create School</h1>
                <div>
                  <SpellcheckIcon />
                  <input
                    type="text"
                    placeholder="School Name"
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
                  <EmailIcon />

                  <input
                    placeholder="School Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <AccountTreeIcon />
                  <select
                    onChange={(e) => setType(e.target.value)}
                    value={type}
                  >
                    <option value="">Choose School Type</option>
                    {types.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <PhoneIcon />
                  <input
                    type="text"
                    placeholder="phone"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div>
                  <FlightClassIcon />
                  <input
                    type="number"
                    placeholder="Max student number"
                    required
                    value={maxStudent}
                    onChange={(e) => setMaxStudent(e.target.value)}
                  />
                </div>
                <div id="createSchoolFormFile">
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={createSchoolImagesChange}
                    multiple
                  />
                </div>
                <div id="createSchoolFormImage">
                  <img src={oldImage.url} alt="School Preview" />
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

export default UpdateSchool;
