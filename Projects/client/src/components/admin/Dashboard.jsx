import React, { useEffect } from "react";
import "./dashboard.css";
import Sidebar from "./Sidebar.jsx";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "chart.js/auto";
import { Doughnut, Line } from "react-chartjs-2";
import { getAllUsers } from "../../actions/userActions";
import { getSchools, getSchoolsRequests } from "../../actions/schoolsActions";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { schools } = useSelector((state) => state.allSchools);

  const { schools: schoolsReq } = useSelector((state) => state.schoolsReq);

  const { users } = useSelector((state) => state.allUsers);

  useEffect(() => {
    dispatch(getSchools());
    dispatch(getSchoolsRequests());
    dispatch(getAllUsers());
  }, [dispatch]);

  const lineState = {
    labels: ["Initial Requests", "Total Requests"],
    datasets: [
      {
        label: "Total Requests",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, schoolsReq && schoolsReq.length],
      },
    ],
  };

  const doughnutState = {
    labels: ["Initial Schools", "Scools Accepted"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [0, schools && schools.length],
      },
    ],
  };
  const currentTime = new Date();
  const month = currentTime.getMonth() + 1;
  const day = currentTime.getDate();
  const year = currentTime.getFullYear();
  return (
    <div className="dashboard">
      {/* <MetaData title="Dashboard - Admin Panel" /> */}
      <Sidebar />
      <div className="dashboardContainer">
        <Typography component="h1">{t("dash")}</Typography>
        <div className="dashboardSummary">
          <div>
            <p>
              {t("data")} <br />{" "}
              {(month < 10 ? "0" + month : month) +
                "/" +
                (day < 10 ? "0" + day : day) +
                "/" +
                year}
              {/* Total Amount <br /> ${totalAmount} */}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/schools-requests">
              <p>{t("sql_req")}</p>
              <p>{schoolsReq && schoolsReq.length}</p>
              {/* <p>30</p> */}
            </Link>
            <Link to="/admin/schools">
              <p>{t("schools")}</p>
              <p>{schools && schools.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>{t("usr")}</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>
        <div className="lineChart">
          <Line data={lineState} />
        </div>
        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
