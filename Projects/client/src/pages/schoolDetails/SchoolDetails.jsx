import React, { Fragment, useEffect } from "react";
import "./SchoolDetails.css";
import events from "../../assets/images/events.png";
import contact from "../../assets/images/contact-us.png";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsCurrencyDollar } from "react-icons/bs";
import { FaChair } from "react-icons/fa";
import charity from "../../assets/images/christian-dubovan-Y_x747Yshlw-unsplash 2.png";
import Slider from "react-slick";
import NavBar from "../../components/NavBar";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearEroors, getSchoolDetails } from "../../actions/schoolsActions";
import { useAlert } from "react-alert";
import Loader from "../../components/Loader/Loader";

const SchoolDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, school } = useSelector((state) => state.schoolDetail);

  const { id } = useParams();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearEroors());
    }

    dispatch(getSchoolDetails(id));
  }, [alert, dispatch, error, id]);

  const settings = {
    centerMode: true,
    centerPadding: "230px",
    slidesToShow: 1,
    speed: 500,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <NavBar />
          <div className="review">
            <div className="container">
              <div className="row slid">
                <div className="slider">
                  <Slider {...settings}>
                    <div className="kiw">
                      <img src={events} alt="slide" />
                    </div>
                    <div className="kiw">
                      <img src={contact} alt="slide" />
                    </div>
                    <div className="kiw">
                      <img src={charity} alt="slide" />
                    </div>
                    <div className="kiw">
                      <img src={charity} alt="slide" />
                    </div>
                  </Slider>
                </div>
              </div>
              <div className="row information">
                <div className="col-md-5 desc">
                  <h1>{school.name}</h1>
                  <p>
                    Located in Mila, 500 meters from Olympic Swimming Pool. Is a
                    full time school operated by the Islamic Association of
                    Raleigh (IAR) and specializes in Quran memorization and the
                    preparation of future Muslim scholars in the Algeria.
                  </p>
                  <div className="location">
                    <span>
                      <i className="bx bx-current-location"></i>
                    </span>
                    <span>See Location</span>
                  </div>
                </div>
                <div className="col-md-5 info">
                  <div className="box">
                    <span>
                      <i className="bx bx-current-location"></i>
                    </span>
                    <span>{school.address} </span>
                  </div>
                  <div className="box">
                    <span>
                      <BsCurrencyDollar />
                    </span>
                    <span>{school.type}</span>
                  </div>
                  <div className="box">
                    <span>
                      <HiOutlineUserGroup />
                    </span>
                    <span>{school.address} </span>
                  </div>
                  <div className="box">
                    <span>
                      <FaChair />
                    </span>
                    <span>{school.maxStudent} / year</span>
                  </div>
                  <div className="box">
                    <span></span>
                    <span>5 Available seats left</span>
                  </div>
                </div>
              </div>
              <div className="row mybtn">
                <div className="col-md-12">
                  <Link to="/" className="button ">
                    GO BACK
                  </Link>
                  <Link to={`/apply/${id}`} className="button active">
                    APPLY
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default SchoolDetails;
