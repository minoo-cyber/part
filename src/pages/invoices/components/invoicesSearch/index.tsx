import { FC } from "react";
import { FormLabel, Grid, TextField } from "@mui/material";
import CustomAutocomplete from "../../../../components/autocomplete";
import CustomInput from "../../../../components/input";
import { useState } from "react";
import CustomButton from "../../../../components/button";
import InvoiceDetails from "../invoiceDetails";
import InvoiceTable from "../invoiceTable";

interface IProps {
  readOnly: boolean;
}

const InvoicesSearch: FC<IProps> = (readOnly) => {
  const [batchId, setBatchId] = useState<string>("");
  return (
    <>
      <Grid container component="form">
        <Grid item xs={4} px={2}>
          <FormLabel>Batch Id</FormLabel>
          <CustomInput
            value={batchId}
            handleChange={(e) => setBatchId(e.target.value)}
            type="text"
            placeholder="Please Enter BatchId"
          />
        </Grid>
        <Grid item xs={4} px={2}>
          <FormLabel>Client Name</FormLabel>
          <CustomAutocomplete
            value=""
            options={[]}
            renderInput={(params) => <TextField {...params} />}
            sx={{ mt: 1.3 }}
          />
        </Grid>
        <Grid item xs={4} px={2}>
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
            }}
          >
            Search
          </CustomButton>
        </Grid>
      </Grid>
      <InvoiceDetails readOnly={readOnly.readOnly} />
      <InvoiceTable readOnly={readOnly.readOnly} />
    </>
  );
};
export default InvoicesSearch;
