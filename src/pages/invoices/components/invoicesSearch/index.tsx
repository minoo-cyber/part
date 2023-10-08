import { SyntheticEvent, useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import CustomAutocomplete from "../../../../components/autocomplete";
import CustomInput from "../../../../components/input";
import { useState } from "react";
import CustomButton from "../../../../components/button";
import {
  ISearchRes,
  clientService,
  companyNameService,
  invoiceSearchService,
} from "../../../../services/invoice.api";
import { useMutation } from "@tanstack/react-query";
import useAppDispatch from "../../../../hooks/useDispatch";
import { setToast } from "../../../../redux/slices/toastSlice";
import InvoiceDetails from "./components/details";
import InvoiceTable from "./components/table";

const InvoicesSearch = () => {
  const dispatch = useAppDispatch();
  const [batchId, setBatchId] = useState<string>("");
  const [companyName, setCompanyName] = useState<string | undefined>("");
  const [companyData, setCompanyData] = useState<string[]>();
  const [clientName, setClientName] = useState<string>("");
  const [clientData, setClientData] = useState<string[]>();
  const [data, setData] = useState<ISearchRes>();
  const [loading, setLoading] = useState<boolean>(false);
  const searchQuery = useMutation(invoiceSearchService);
  const [expanded, setExpanded] = useState<string | false>("panel1");
  const companyQuery = useMutation(companyNameService);
  const clientQuery = useMutation(clientService);

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

  const handleChange =
    (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const handleSearch = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    searchQuery.mutate(
      {
        batchId: Number(batchId),
        clientName: clientName,
        companyName: companyName,
      },
      {
        onSuccess(data) {
          if (data.data[0]) {
            setData(data.data[0]);
            setLoading(false);
          } else {
            setData(undefined);
            setLoading(false);
            dispatch(
              setToast({
                open: true,
                type: "error",
                text: "No Data For This BatchId",
              })
            );
          }
        },
      }
    );
  };

  return (
    <>
      <Grid container component="form" onSubmit={handleSearch}>
        <Grid item xs={12} sm={6} md={4} px={2} mb={1}>
          <FormLabel>Batch Id Search</FormLabel>
          <CustomInput
            value={batchId}
            handleChange={(e) => setBatchId(e.target.value)}
            type="text"
            placeholder="Please Enter BatchId"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} mb={1} px={2}>
          <FormLabel>Company Name Search</FormLabel>
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
            renderInput={(params) => <TextField {...params} />}
            sx={{ mt: 1.3 }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} mb={1} px={2}>
          <FormLabel>Client Name Search</FormLabel>
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
            renderInput={(params) => <TextField {...params} />}
            sx={{ mt: 1.3 }}
          />
        </Grid>
        <Grid container sx={{ justifyContent: "center" }}>
          <CustomButton
            type="submit"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.primary.main + "!important",
              mb: 2,
            }}
          >
            {loading ? <CircularProgress size="small" /> : null}
            Search
          </CustomButton>
        </Grid>
      </Grid>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography variant="h6">Invoice Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <InvoiceDetails data={data} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography variant="h6">Invoice Rows</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <InvoiceTable rows={data?.invoiceSubModels} />
        </AccordionDetails>
      </Accordion>
    </>
  );
};
export default InvoicesSearch;
