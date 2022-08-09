import React from "react";
import "./Sidebar.css";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const { t } = useTranslation();
  return (
    <div className="sidebar">
      <Link to="/">
        <img src={logo} alt="Ecommerce" />
      </Link>
      <Link to="/dashboard">
        <p>
          <DashboardIcon /> {t("dash")}
        </p>
      </Link>
      <div className="anchor">
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId="1" label={`${t("schools")}`}>
            <Link to="/admin/schools">
              <TreeItem
                nodeId="2"
                label={`${t("all_sql")}`}
                icon={<PostAddIcon />}
              />
            </Link>

            <Link to="/admin/schools-requests">
              <TreeItem
                nodeId="3"
                label={`${t("all_sql_req")}`}
                icon={<AddIcon />}
              />
            </Link>
            <Link to="/admin/schools/create">
              <TreeItem
                nodeId="4"
                label={`${t("add_sql")}`}
                icon={<AddIcon />}
              />
            </Link>
          </TreeItem>
        </TreeView>
      </div>

      {/* <Link to="/admin/orders">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link> */}
      <div className="anchor">
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId="1" label={`${t("usr")}`}>
            <Link to="/admin/users">
              <TreeItem
                nodeId="2"
                label={`${t("all_usr")}`}
                icon={<PostAddIcon />}
              />
            </Link>

            <Link to="/admin/users/new">
              <TreeItem
                nodeId="3"
                label={`${t("create_usr")}`}
                icon={<AddIcon />}
              />
            </Link>
          </TreeItem>
        </TreeView>
      </div>
      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon />
          {`${t("rvws")}`}
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
