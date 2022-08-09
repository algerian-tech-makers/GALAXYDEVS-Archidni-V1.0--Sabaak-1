import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearEroors, getSchools } from "../actions/schoolsActions";
import Loader from "../components/Loader/Loader";
import NavBar from "../components/NavBar";
import SchoolCard from "../components/school/SchoolCard";

const ExploreSchools = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, schools } = useSelector((state) => state.allSchools);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearEroors());
    }
    dispatch(getSchools());
  }, [alert, dispatch, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="explore">
          <NavBar />
          <div className="explore-content">
            <>
              {/* <div className='search mt-16'>
            <div className='container'>
              <form onSubmit={handleSearch} className='explore-form'>
                <div className='from-control search'>
                  <input
                    type='text'
                    placeholder='Search titles,...'
                    className='form-control explore-input'
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      handleSearch(title);
                    }}
                  />
                </div>
                <div className='from-control address'>
                  <select
                    className='form-select form-select-sm'
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      handleSearch(address);
                    }}>
                    <option defaultValue='' value=''>
                      All
                    </option>
                    {wilayas.map((wilaya, i) => (
                      <option value={wilaya.id} key={i}>
                        {wilaya.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='from-control fees'>
                  <select
                    className='form-select form-select-sm'
                    value={fee}
                    onChange={(e) => {
                      setFee(e.target.value);
                      handleSearch(fee);
                    }}>
                    <option defaultValue='' value=''>
                      All
                    </option>
                    <option value='Free'>Free</option>
                    <option value='Paid'>Paid</option>
                  </select>
                </div>
                <div className='from-control submit explore-btn'>
                  <button type='submit'>Filter</button>
                </div>
              </form>
            </div>
          </div> */}

              <div className="schools" id="schools">
                <div className="container">
                  <div className="content">
                    <h3>Explore all schools</h3>
                  </div>
                  <div className="schools-container">
                    {schools.map((school, i) => (
                      <SchoolCard school={school} key={i} />
                    ))}
                  </div>
                </div>
              </div>
            </>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ExploreSchools;
