import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useAxiosFetch from "../../hooks/useFetch";
import ReviewCard from "./ReviewCard";
import "./reviews.css";
import { useTranslation } from "react-i18next";

const Reviews = () => {
  const { t } = useTranslation();
  const { data: Reviewers } = useAxiosFetch("http://localhost:8000/reviewers");
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
  };
  return (
    <div className="">
      <div className="container bg-[#F6FFF9] p-10">
        <h1 className="review-title">{t("take_look_visitor")}</h1>

        <div className="">
          <Slider {...settings}>
            {Reviewers.map((reviewer, i) => (
              <ReviewCard reviewer={reviewer} key={i} />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
