import { Grid, TextField } from "@mui/material";
import CustomAutocomplete from "../../../../components/autocomplete";

const InvoicesSearch = () => {
  return (
    <Grid container>
      <Grid xs={4}></Grid>
      <Grid xs={4}>
        <CustomAutocomplete
          value=""
          options={[]}
          // onChange={(_, value) => {
          //   if (value && typeof value != "string" && !Array.isArray(value)) {
          //     setPaymentPeriod(value);
          //     setPaymentPeriodLookupId(value.id);
          //   } else {
          //     setPaymentPeriod(undefined);
          //   }
          // }}
          renderInput={(params) => <TextField {...params} label="ClientName" />}
        />
      </Grid>
      <Grid xs={4}>
        <CustomAutocomplete
          value=""
          options={[]}
          // onChange={(_, value) => {
          //   if (value && typeof value != "string" && !Array.isArray(value)) {
          //     setPaymentPeriod(value);
          //     setPaymentPeriodLookupId(value.id);
          //   } else {
          //     setPaymentPeriod(undefined);
          //   }
          // }}
          renderInput={(params) => <TextField {...params} label="Company" />}
        />
      </Grid>
    </Grid>
  );
};
export default InvoicesSearch;
