import { FormLabel, Grid, TextField } from "@mui/material";
import CustomAutocomplete from "../../../../components/autocomplete";
import CustomInput from "../../../../components/input";
import { useState } from "react";
import CustomButton from "../../../../components/button";
import InvoiceDetails from "../invoiceDetails";

const InvoicesSearch = () => {
  const [batchId, setBatchId] = useState<string>("");
  return (
    <Grid container component="form">
      <Grid xs={4} px={2}>
        <FormLabel htmlFor="batchId">Batch Id</FormLabel>
        <CustomInput
          value={batchId}
          handleChange={(e) => setBatchId(e.target.value)}
          type="text"
          id="batchId"
          placeholder="Please Enter BatchId"
        />
      </Grid>
      <Grid xs={4} px={2}>
        <FormLabel htmlFor="clientName">Client Name</FormLabel>
        <CustomAutocomplete
          id="clientName"
          value=""
          options={[]}
          renderInput={(params) => <TextField {...params} />}
          sx={{ mt: 1.3 }}
        />
      </Grid>
      <Grid xs={4} px={2}>
        <FormLabel htmlFor="company">Company</FormLabel>
        <CustomAutocomplete
          id="company"
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
          }}
        >
          Search
        </CustomButton>
      </Grid>
      <InvoiceDetails />
    </Grid>
  );
};
export default InvoicesSearch;
