import {
  Divider,
  Grid,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
} from "@mui/material";
import { hideSideBar, menuIcon, sideBarBox } from "./sideBar.style";
import Dashboard from "@mui/icons-material/Dashboard";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { NavLink } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";

const SideBar = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <MoreVertIcon sx={menuIcon} onClick={handleShowMenu} />
      <Grid sx={!showMenu ? sideBarBox : hideSideBar}>
        <MenuList
          sx={{
            "& a": {
              color: (theme) => theme.palette.primary.main,
            },
          }}
        >
          <MenuItem>
            <ListItemIcon>
              <Dashboard fontSize="small" />
            </ListItemIcon>
            <ListItemText>
              <NavLink to="/panel">Dashboard</NavLink>
            </ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <StopScreenShareIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>
              <NavLink to="/pending">Pending Queries</NavLink>
            </ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <FactCheckIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>
              <NavLink to="/invoices">Invoices</NavLink>
            </ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <AssignmentIndIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>
              <NavLink to="/panel">Create/Modify Clients</NavLink>
            </ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <LibraryAddIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>
              <NavLink to="/panel">Add/Search Item</NavLink>
            </ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <AdminPanelSettingsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>
              <NavLink to="/user">Admin Panel</NavLink>
            </ListItemText>
          </MenuItem>
        </MenuList>
      </Grid>
    </>
  );
};
export default SideBar;
