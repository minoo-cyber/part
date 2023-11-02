import { Grid, Typography } from "@mui/material";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import PageviewIcon from "@mui/icons-material/Pageview";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import Layout from "../../components/layout";
import { NavLink } from "react-router-dom";
import Card from "../../components/card";
import { wrapperItems, wrapperStatus } from "./panel.style";
import { useQuery } from "@tanstack/react-query";
import { getPendingService } from "../../services/pending.api";
import { useEffect, useState } from "react";

const Panel = () => {
  const [pendingLength, setPendingLength] = useState<number>();

  const getPendingQuery = useQuery({
    queryKey: ["getPending"],
    queryFn: getPendingService,
  });

  useEffect(() => {
    setPendingLength(getPendingQuery?.data?.data.length);
  }, [getPendingQuery?.data?.data.length]);

  return (
    <Layout>
      <Grid container sx={wrapperItems}>
        <Card>
          <NavLink to="/invoiceAdd">
            <FactCheckIcon />
            New Invoice
          </NavLink>
        </Card>
        <Card>
          <NavLink to="/invoicesSearch">
            <AccountBoxIcon />
            Search By Client Name
          </NavLink>
        </Card>
        <Card>
          <NavLink to="/invoicesSearch">
            <ApartmentIcon />
            Search By Company
          </NavLink>
        </Card>
        <Card>
          <NavLink to="/invoicesSearch">
            <PageviewIcon />
            Search By Batch
          </NavLink>
        </Card>
      </Grid>
      <Grid container sx={wrapperStatus}>
        <Card>
          <NavLink to="/pending">
            Total Pending Queries
            <p>{pendingLength}</p>
          </NavLink>
        </Card>
        <Card>
          <Typography>Status</Typography>
          <Typography>Open Queries?</Typography>
        </Card>
      </Grid>
    </Layout>
  );
};

export default Panel;
