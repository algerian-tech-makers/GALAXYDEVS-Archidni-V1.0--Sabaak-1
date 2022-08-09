import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./SchoolsList.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "./Sidebar";
import {
  clearEroors,
  deleteSchoolRequest,
  getSchoolsRequests,
} from "../../actions/schoolsActions";
import { DELETE_DEMAND_SCHOOL_RESET } from "../../constants/schoolsConstants";
import { useTranslation } from "react-i18next";

const SchoolRequestList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const alert = useAlert();

  const { error, schools } = useSelector((state) => state.schoolsReq);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.school
  );

  const deleteSchoolHandler = (id) => {
    dispatch(deleteSchoolRequest(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearEroors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearEroors());
    }

    if (isDeleted) {
      alert.success("School Request Deleted Successfully");
      navigate("/dashboard");
      dispatch({ type: DELETE_DEMAND_SCHOOL_RESET });
    }

    dispatch(getSchoolsRequests());
  }, [dispatch, alert, error, navigate, deleteError, isDeleted]);

  const rows = [];

  schools &&
    schools.forEach((item) => {
      rows.push({
        id: item._id,
        phone: item.phone,
        email: item.email,
        name: item.name,
        address: item.address,
      });
    });

  const columns = [
    { field: "id", headerName: `${t("sql_id")}`, minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: `${t("sql_name")}`,
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "address",
      headerName: `${t("address")}`,
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "phone",
      headerName: `${t("phone")}`,
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "email",
      headerName: `${t("email")}`,
      type: "string",
      minWidth: 220,
      flex: 0.3,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: `${t("action")}`,
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        // let id = params.row;
        let id = params.row.id;
        return (
          <Fragment>
            <Link to={`/admin/school/${id}`}>
              <EditIcon />
            </Link>

            <Button onClick={() => deleteSchoolHandler(params.row.id)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  return (
    <Fragment>
      <div className="dashboard">
        <Sidebar />
        <div className="schoolListContainer">
          <h1 id="schoolListHeading">{t("all_sql_reqest")}</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            rowsPerPageOptions={[5, 10, 20]}
            pageSize={10}
            disableSelectionOnClick
            className="schoolListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default SchoolRequestList;
