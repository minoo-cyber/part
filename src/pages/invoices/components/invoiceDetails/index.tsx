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
          <FormLabel htmlFor="batchNumber">Batch Number</FormLabel>
          <CustomInput
            value=""
            type="text"
            id="batchNumber"
            readOnly={readOnly.readOnly}
          />
        </Grid>
        <Grid item xs={4} px={2}>
          <FormLabel htmlFor="invoicedBy">InvoicedBy</FormLabel>
          <CustomAutocomplete
            id="invoicedBy"
            value=""
            options={[]}
            renderInput={(params) => <TextField {...params} />}
            sx={{ mt: 1.3 }}
            readOnly={readOnly.readOnly}
          />
        </Grid>
        <Grid item xs={4} px={2}>
          <FormLabel htmlFor="port">Port</FormLabel>
          <CustomAutocomplete
            id="port"
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
          <FormLabel htmlFor="orderNumber">Order Number</FormLabel>
          <CustomInput
            value=""
            type="text"
            id="orderNumber"
            readOnly={readOnly.readOnly}
          />
        </Grid>
        <Grid item xs={4} px={2}>
          <FormLabel htmlFor="oepartment">Oepartment</FormLabel>
          <CustomInput
            value=""
            type="text"
            id="oepartment"
            readOnly={readOnly.readOnly}
          />
        </Grid>
        <Grid item xs={4} px={2}>
          <FormLabel htmlFor="markingNumber">Marking Number</FormLabel>
          <CustomInput
            value=""
            type="text"
            id="markingNumber"
            readOnly={readOnly.readOnly}
          />
        </Grid>
      </Grid>
      <Grid container mb={3}>
        <Grid item xs={4} px={2}>
          <FormLabel htmlFor="profit">Profit</FormLabel>
          <CustomInput
            value=""
            type="text"
            id="profit"
            readOnly={readOnly.readOnly}
          />
        </Grid>
        <Grid item xs={4} px={2}>
          <FormLabel htmlFor="client">Client</FormLabel>
          <CustomAutocomplete
            id="client"
            value=""
            options={[]}
            renderInput={(params) => <TextField {...params} />}
            sx={{ mt: 1.3 }}
            readOnly={readOnly.readOnly}
          />
        </Grid>
        <Grid item xs={4} px={2}>
          <FormLabel htmlFor="company">T/A Company</FormLabel>
          <CustomAutocomplete
            id="company"
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
          <FormLabel htmlFor="companyName">Company Name</FormLabel>
          <CustomAutocomplete
            id="companyName"
            value=""
            options={[]}
            renderInput={(params) => <TextField {...params} />}
            sx={{ mt: 1.3 }}
            readOnly={readOnly.readOnly}
          />
        </Grid>
        <Grid item xs={4} px={2}>
          <FormLabel htmlFor="agent">Agent</FormLabel>
          <CustomAutocomplete
            id="agent"
            value=""
            options={[]}
            renderInput={(params) => <TextField {...params} />}
            sx={{ mt: 1.3 }}
            readOnly={readOnly.readOnly}
          />
        </Grid>
        <Grid item xs={4} px={2}>
          {" "}
          <FormLabel htmlFor="invoiceNumber">Invoice Number</FormLabel>
          <CustomInput
            value=""
            type="text"
            id="invoiceNumber"
            readOnly={readOnly.readOnly}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default InvoiceDetails;
