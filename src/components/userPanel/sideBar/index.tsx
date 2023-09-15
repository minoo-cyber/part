import {
  Divider,
  Grid,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
} from "@mui/material";
import { sideBarBox } from "./sideBar.style";
import Dashboard from "@mui/icons-material/Dashboard";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <Grid sx={sideBarBox}>
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
            <NavLink to="/userPanel">Dashboard</NavLink>
          </ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <AssignmentIndIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            <NavLink to="/userPanel">Create/Modify Clients</NavLink>
          </ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <LibraryAddIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            <NavLink to="/userPanel">Add/Search Item</NavLink>
          </ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <FactCheckIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            <NavLink to="/userPanel">Invoices</NavLink>
          </ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <StopScreenShareIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            <NavLink to="/userPanel">Pending Queries</NavLink>
          </ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <AdminPanelSettingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            <NavLink to="/userPanel">Admin Panel</NavLink>
          </ListItemText>
        </MenuItem>
      </MenuList>
    </Grid>
  );
};
export default SideBar;
