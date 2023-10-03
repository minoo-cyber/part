import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import Card from "../../components/card";
import { getPendingService } from "../../services/pending.api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FormLabel, Grid, TextField } from "@mui/material";
import CustomAutocomplete from "../../components/autocomplete";
import { clientService, companyNameService } from "../../services/invoice.api";

const PendingQueris = () => {
  const getPendingQuery = useQuery({
    queryKey: ["getPending"],
    queryFn: getPendingService,
  });
  const companyQuery = useMutation(companyNameService);
  const clientQuery = useMutation(clientService);
  const [pendingData, setPendingData] = useState([]);
  const [companyName, setCompanyName] = useState<string | undefined>(
    getPendingQuery?.data?.data?.[0].companyName
  );
  const [companyData, setCompanyData] = useState<string[]>();
  const [clientName, setClientName] = useState<string>(
    getPendingQuery?.data?.data?.[0].clientName
  );
  const [clientData, setClientData] = useState<string[]>();

  useEffect(() => {
    if (getPendingQuery?.data?.data?.[0]) {
      setPendingData(getPendingQuery?.data?.data?.[0]);
    }
  }, []);
  useEffect(() => {
    if (companyName) {
      clientQuery.mutate(companyName, {
        onSuccess(data) {
          if (data.data) {
            setClientData(data.data);
          }
        },
      });
    }
  }, [companyName]);

  useEffect(() => {
    if (companyName && companyName.length >= 3) {
      companyQuery.mutate(companyName, {
        onSuccess(data) {
          if (data.data) {
            setCompanyData(data.data);
          }
        },
      });
    }
  }, [companyName]);

  return (
    <Layout>
      <Card>
        <Grid container component="form">
          <Grid item xs={12} sm={6} md={6} mb={1} px={2}>
            <FormLabel>Company</FormLabel>
            <CustomAutocomplete
              value={companyName}
              onInputChange={(event: object, value: string, reason: string) => {
                setCompanyName(value);
              }}
              options={
                companyData
                  ? companyData.map((item, index) => ({
                      label: item,
                      id: index,
                    }))
                  : []
              }
              renderInput={(params) => <TextField {...params} required />}
              sx={{ mt: 1.3 }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} mb={1} px={2}>
            <FormLabel>Client</FormLabel>
            <CustomAutocomplete
              value={clientName}
              onInputChange={(event: object, value: string, reason: string) => {
                setClientName(value);
              }}
              options={
                clientData
                  ? clientData.map((item, index) => ({
                      label: item,
                      id: index,
                    }))
                  : []
              }
              renderInput={(params) => <TextField {...params} required />}
              sx={{ mt: 1.3 }}
            />
          </Grid>
        </Grid>
      </Card>
    </Layout>
  );
};

export default PendingQueris;
