import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/NavBar";
import "./login.css";
import googleImg from "../../assets/images/google.png";
import { clearErrors, login } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

const Login = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userId, loginPassword));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, error, alert, isAuthenticated, navigate]);
  return (
    <Fragment>
      {loading ? (
        "loding"
      ) : (
        <Fragment>
          <Navbar />
          <div className="login-container">
            <div className="container">
              <div className="left-box">
                <h1>Log in</h1>
                <form onSubmit={loginSubmit}>
                  <Link to="/" className="google">
                    <img src={googleImg} alt="" /> Log in with Google
                  </Link>
                  <p>Or</p>
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                  />
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                  <p>
                    Forget your password? <Link to="/">Click here</Link>
                  </p>
                  <input
                    type="submit"
                    value="Log in"
                    className="button active"
                  />
                </form>
              </div>

              <div className="right-box">
                <h3>Welcome to Archidni.</h3>
                <p>
                  Build skills for today, tomorrow, and beyond. Education to
                  future-proof your career and build a great MERN developers
                  community not only in the arab world but worldwide.
                </p>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
