import { FC } from "react";
import { FormLabel, Grid, TextField, Typography } from "@mui/material";
import CustomInput from "../../../../components/input";
import CustomAutocomplete from "../../../../components/autocomplete";

interface IProps {
  readOnly: boolean;
}

const InvoiceDetails: FC<IProps> = (readOnly) => {
  return (
    <>
      <Typography variant="h5" my={4}>
        Invoice Details
      </Typography>
      <Grid container mb={3}>
        <Grid item xs={4} px={2}>
          <FormLabel>Batch Number</FormLabel>
          <CustomInput value="" type="text" readOnly={readOnly.readOnly} />
        </Grid>
        <Grid item xs={4} px={2}>
          <FormLabel>InvoicedBy</FormLabel>
          <CustomAutocomplete
            value=""
            options={[]}
            renderInput={(params) => <TextField {...params} />}
            sx={{ mt: 1.3 }}
            readOnly={readOnly.readOnly}
          />
        </Grid>
        <Grid item xs={4} px={2}>
          <FormLabel>Port</FormLabel>
          <CustomAutocomplete
            value=""
            options={[]}
            renderInput={(params) => <TextField {...params} />}
            sx={{ mt: 1.3 }}
            readOnly={readOnly.readOnly}
          />
        </Grid>
      </Grid>
      <Grid container mb={3}>
        <Grid item xs={4} px={2}>
          <FormLabel>Order Number</FormLabel>
          <CustomInput value="" type="text" readOnly={readOnly.readOnly} />
        </Grid>
        <Grid item xs={4} px={2}>
          <FormLabel>Oepartment</FormLabel>
          <CustomInput value="" type="text" readOnly={readOnly.readOnly} />
        </Grid>
        <Grid item xs={4} px={2}>
          <FormLabel>Marking Number</FormLabel>
          <CustomInput value="" type="text" readOnly={readOnly.readOnly} />
        </Grid>
      </Grid>
      <Grid container mb={3}>
        <Grid item xs={4} px={2}>
          <FormLabel>Profit</FormLabel>
          <CustomInput value="" type="text" readOnly={readOnly.readOnly} />
        </Grid>
        <Grid item xs={4} px={2}>
          <FormLabel>Client</FormLabel>
          <CustomAutocomplete
            value=""
            options={[]}
            renderInput={(params) => <TextField {...params} />}
            sx={{ mt: 1.3 }}
            readOnly={readOnly.readOnly}
          />
        </Grid>
        <Grid item xs={4} px={2}>
          <FormLabel>T/A Company</FormLabel>
          <CustomAutocomplete
            value=""
            options={[]}
            renderInput={(params) => <TextField {...params} />}
            sx={{ mt: 1.3 }}
            readOnly={readOnly.readOnly}
          />
        </Grid>
      </Grid>
      <Grid container mb={3}>
        <Grid item xs={4} px={2}>
          <FormLabel>Company Name</FormLabel>
          <CustomAutocomplete
            value=""
            options={[]}
            renderInput={(params) => <TextField {...params} />}
            sx={{ mt: 1.3 }}
            readOnly={readOnly.readOnly}
          />
        </Grid>
        <Grid item xs={4} px={2}>
          <FormLabel>Agent</FormLabel>
          <CustomAutocomplete
            value=""
            options={[]}
            renderInput={(params) => <TextField {...params} />}
            sx={{ mt: 1.3 }}
            readOnly={readOnly.readOnly}
          />
        </Grid>
        <Grid item xs={4} px={2}>
          <FormLabel>Invoice Number</FormLabel>
          <CustomInput value="" type="text" readOnly={readOnly.readOnly} />
        </Grid>
      </Grid>
    </>
  );
};

export default InvoiceDetails;
