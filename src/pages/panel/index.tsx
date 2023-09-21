import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { wrapperItems, wrapperStatus } from "./panel.style";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import Layout from "../../components/layout";

const Panel = () => {
  return (
    <Layout>
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
    </Layout>
  );
};

export default Panel;
