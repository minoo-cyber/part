import { Grid, Typography } from "@mui/material";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import PageviewIcon from "@mui/icons-material/Pageview";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Layout from "../../components/layout";
import { NavLink } from "react-router-dom";
import Card from "../../components/card";
import { wrapperItems, wrapperStatus } from "./panel.style";

const Panel = () => {
  return (
    <Layout>
      <Grid container sx={wrapperItems}>
        <Card>
          <NavLink to="/invoices">
            <FactCheckIcon />
            New Invoice
          </NavLink>
        </Card>
        <Card>
          <NavLink to="/">
            <AccountBoxIcon />
            Search By Client Name
          </NavLink>
        </Card>
        <Card>
          <NavLink to="/">
            <ApartmentIcon />
            Search By Company
          </NavLink>
        </Card>
        <Card>
          <NavLink to="/">
            <PageviewIcon />
            Search By Batch
          </NavLink>
        </Card>
      </Grid>
      <Grid container sx={wrapperStatus}>
        <Card>
          <Typography>Status</Typography>
          <Typography>Open Queries?</Typography>
        </Card>
      </Grid>
    </Layout>
  );
};

export default Panel;
