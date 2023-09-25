import { FC } from "react";
import { FormLabel, Grid, TextField, Typography } from "@mui/material";
import CustomInput from "../../../../components/input";
import CustomAutocomplete from "../../../../components/autocomplete";
import { ISearchRes } from "../../../../services/invoice.api";

interface IProps {
  readOnly: boolean;
  data?: ISearchRes;
}

const InvoiceDetails: FC<IProps> = ({ readOnly, data }: IProps) => {
  return (
    <>
      <Typography variant="h5" my={4}>
        Invoice Details
      </Typography>
      <Grid container mb={3}>
        <Grid item xs={4} px={2}>
          <FormLabel>Batch Number</FormLabel>
          <CustomInput
            value={data?.batchNumber ? data?.batchNumber : ""}
            type="text"
            readOnly={readOnly}
          />
        </Grid>
        <Grid item xs={4} px={2}>
          <FormLabel>InvoicedBy</FormLabel>
          <CustomAutocomplete
            value={data?.invoicedBy ? data?.invoicedBy : ""}
            options={[]}
            renderInput={(params) => <TextField {...params} />}
            sx={{ mt: 1.3 }}
            readOnly={readOnly}
          />
        </Grid>
        <Grid item xs={4} px={2}>
          <FormLabel>Port</FormLabel>
          <CustomAutocomplete
            value={data?.port ? data?.port : ""}
            options={[]}
            renderInput={(params) => <TextField {...params} />}
            sx={{ mt: 1.3 }}
            readOnly={readOnly}
          />
        </Grid>
      </Grid>
      <Grid container mb={3}>
        <Grid item xs={4} px={2}>
          <FormLabel>Order Number</FormLabel>
          <CustomInput
            value={data?.orderNumber ? data?.orderNumber : ""}
            type="text"
            readOnly={readOnly}
          />
        </Grid>
        <Grid item xs={4} px={2}>
          <FormLabel>Department</FormLabel>
          <CustomInput
            value={data?.department ? data?.department : ""}
            type="text"
            readOnly={readOnly}
          />
        </Grid>
        <Grid item xs={4} px={2}>
          <FormLabel>Marking Number</FormLabel>
          <CustomInput
            value={data?.markingNumber ? data?.markingNumber : ""}
            type="text"
            readOnly={readOnly}
          />
        </Grid>
      </Grid>
      <Grid container mb={3}>
        <Grid item xs={4} px={2}>
          <FormLabel>Profit</FormLabel>
          <CustomInput value="" type="text" readOnly={readOnly} />
        </Grid>
        <Grid item xs={4} px={2}>
          <FormLabel>Client</FormLabel>
          <CustomAutocomplete
            value={data?.client ? data?.client : ""}
            options={[]}
            renderInput={(params) => <TextField {...params} />}
            sx={{ mt: 1.3 }}
            readOnly={readOnly}
          />
        </Grid>
        <Grid item xs={4} px={2}>
          <FormLabel>T/A Company</FormLabel>
          <CustomAutocomplete
            value={data?.tacompany ? data?.tacompany : ""}
            options={[]}
            renderInput={(params) => <TextField {...params} />}
            sx={{ mt: 1.3 }}
            readOnly={readOnly}
          />
        </Grid>
      </Grid>
      <Grid container mb={3}>
        <Grid item xs={4} px={2}>
          <FormLabel>Company Name</FormLabel>
          <CustomAutocomplete
            value={data?.companyName ? data?.companyName : ""}
            options={[]}
            renderInput={(params) => <TextField {...params} />}
            sx={{ mt: 1.3 }}
            readOnly={readOnly}
          />
        </Grid>
        <Grid item xs={4} px={2}>
          <FormLabel>Agent</FormLabel>
          <CustomAutocomplete
            value=""
            options={[]}
            renderInput={(params) => <TextField {...params} />}
            sx={{ mt: 1.3 }}
            readOnly={readOnly}
          />
        </Grid>
        <Grid item xs={4} px={2}>
          <FormLabel>Invoice Number</FormLabel>
          <CustomInput
            value={data?.invoiceNumber ? data?.invoiceNumber : ""}
            type="text"
            readOnly={readOnly}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default InvoiceDetails;
