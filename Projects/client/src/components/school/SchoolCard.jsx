import React from "react";
import { useNavigate } from "react-router-dom";
import "./school.css";
import { Link } from "react-router-dom";
const SchoolCard = ({ school }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="school"
        onClick={() => navigate(`/schoolDetails/${school._id}`)}
      >
        <img src={school.image.url} alt="" />
        <div className="rate">
          <span>{school.name}</span>
          <span>
            {" "}
            {school.rating}
            <i className="bx bxs-star" style={{ color: "#FFCE31" }}></i>
          </span>
        </div>
        <h4>{school.address}</h4>
        <p>{school.status}</p>
        <Link to={`/schoolDetails/${school.id}`}>
          Read more <i className="bx bx-right-arrow-alt"></i>
        </Link>
      </div>
    </>
  );
};

export default SchoolCard;
