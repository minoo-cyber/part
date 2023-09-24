import { Box, Grid, TextField, Typography } from "@mui/material";
import { wrapperCompany, wrapperItems } from "./panel.style";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import ApartmentIcon from "@mui/icons-material/Apartment";
import SummarizeIcon from "@mui/icons-material/Summarize";
import Layout from "../../components/layout";
import { NavLink } from "react-router-dom";
import Card from "../../components/card";
import CustomAutocomplete from "../../components/autocomplete";

const Panel = () => {
  return (
    <Layout>
      <Grid container>
        <Grid mt={4} sx={wrapperCompany}>
          <Card>
            <Box>
              <img src="../assets/images/company.jpg" alt="trident" />
              <Typography>
                Select Company For Select Logo In Invoice Page
              </Typography>
              <CustomAutocomplete
                id="company"
                value=""
                options={[]}
                renderInput={(params) => <TextField {...params} />}
                sx={{ mt: 1.3 }}
              />
            </Box>
          </Card>
        </Grid>
        <Grid sx={wrapperItems}>
          <Card>
            <NavLink to="/invoices">
              <FactCheckIcon />
              Invoice Managment
            </NavLink>
          </Card>
          <Card>
            <NavLink to="/panel">
              <DirectionsBoatIcon />
              Vessel Details
            </NavLink>
          </Card>
          <Card>
            <NavLink to="/panel">
              <PriceChangeIcon />
              Item Prices+IMPA
            </NavLink>
          </Card>
          <Card>
            <NavLink to="/panel">
              <ApartmentIcon />
              Ships And Companies
            </NavLink>
          </Card>
          <Card>
            <NavLink to="/panel">
              <StopScreenShareIcon />
              Pendig Queris
            </NavLink>
          </Card>
          <Card>
            <NavLink to="/panel">
              <SummarizeIcon />
              Reports
            </NavLink>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Panel;
