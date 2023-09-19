import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import SideBar from "../../components/userPanel/sideBar";
import TopBar from "../../components/userPanel/topBar";
import {
  wrapperBox,
  wrapperContent,
  wrapperItems,
  wrapperStatus,
} from "./userPanelstyle";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";

const UserPanel = () => {
  return (
    <Grid>
      <TopBar />
      <Grid sx={wrapperBox}>
        <SideBar />
        <Grid sx={wrapperContent}>
          <Grid sx={wrapperItems}>
            <Box>
              <AssignmentIndIcon />
              Clients
            </Box>
            <Box>
              <LibraryAddIcon />
              Search Item
            </Box>
            <Box>
              <FactCheckIcon />
              Invoices
            </Box>
            <Box>
              <StopScreenShareIcon />
              Queries
            </Box>
          </Grid>
          <Grid sx={wrapperStatus}>status</Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserPanel;
