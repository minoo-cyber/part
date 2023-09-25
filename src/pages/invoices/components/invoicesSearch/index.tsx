import { FC, SyntheticEvent } from "react";
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
import InvoiceDetails from "../invoiceDetails";
import InvoiceTable from "../invoiceTable";
import ClipboardPaste from "../../../../components/copy";
import {
  ISearchRes,
  invoiceSearchService,
} from "../../../../services/invoice.api";
import { useMutation } from "@tanstack/react-query";
import useAppDispatch from "../../../../hooks/useDispatch";
import { setToast } from "../../../../redux/slices/toastSlice";

interface IProps {
  readOnly: boolean;
}

const InvoicesSearch: FC<IProps> = (readOnly) => {
  const dispatch = useAppDispatch();
  const [batchId, setBatchId] = useState<string>("");
  const [data, setData] = useState<ISearchRes>();
  const [loading, setLoading] = useState<boolean>(false);
  const searchQuery = useMutation(invoiceSearchService);
  const [expanded, setExpanded] = useState<string | false>("panel1");
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
        clientName: "",
        companyName: "",
      },
      {
        onSuccess(data) {
          if (data.data[0]) {
            setData(data.data[0]);
            setLoading(false);
          } else {
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
          <FormLabel>Batch Id</FormLabel>
          <CustomInput
            value={batchId}
            handleChange={(e) => setBatchId(e.target.value)}
            type="text"
            placeholder="Please Enter BatchId"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} px={2} mb={1}>
          <FormLabel>Client Name</FormLabel>
          <CustomAutocomplete
            value=""
            options={[]}
            renderInput={(params) => <TextField {...params} />}
            sx={{ mt: 1.3 }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} px={2} mb={1}>
          <FormLabel>Company</FormLabel>
          <CustomAutocomplete
            value=""
            options={[]}
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
          <InvoiceDetails readOnly={readOnly.readOnly} data={data} />
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
          <InvoiceTable
            readOnly={readOnly.readOnly}
            rows={data?.invoiceSubModels}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
};
export default InvoicesSearch;
