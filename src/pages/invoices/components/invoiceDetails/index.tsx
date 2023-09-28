import { FC, useState } from "react";
import { FormLabel, Grid, TextField } from "@mui/material";
import CustomInput from "../../../../components/input";
import CustomAutocomplete from "../../../../components/autocomplete";
import { ISearchRes, clientService } from "../../../../services/invoice.api";
import { useMutation } from "@tanstack/react-query";

interface IProps {
  readOnly: boolean;
  data?: ISearchRes;
  companyName?: string;
}

const InvoiceDetails: FC<IProps> = ({
  readOnly,
  data,
  companyName,
}: IProps) => {
  return (
    <>
      <Grid container mb={3}>
        <Grid item xs={12} sm={6} md={4} mb={1} px={2}>
          <FormLabel>Batch Number</FormLabel>
          <CustomInput
            value={data?.batchNumber ? data?.batchNumber : ""}
            type="text"
            readOnly={readOnly}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} mb={1} px={2}>
          <FormLabel>InvoicedBy</FormLabel>
          <CustomAutocomplete
            value={data?.invoicedBy ? data?.invoicedBy : ""}
            options={[]}
            renderInput={(params) => <TextField {...params} />}
            sx={{ mt: 1.3 }}
            readOnly={readOnly}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} mb={1} px={2}>
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
        <Grid item xs={12} sm={6} md={4} mb={1} px={2}>
          <FormLabel>Order Number</FormLabel>
          <CustomInput
            value={data?.orderNumber ? data?.orderNumber : ""}
            type="text"
            readOnly={readOnly}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} mb={1} px={2}>
          <FormLabel>Department</FormLabel>
          <CustomInput
            value={data?.department ? data?.department : ""}
            type="text"
            readOnly={readOnly}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} mb={1} px={2}>
          <FormLabel>Marking Number</FormLabel>
          <CustomInput
            value={data?.markingNumber ? data?.markingNumber : ""}
            type="text"
            readOnly={readOnly}
          />
        </Grid>
      </Grid>
      <Grid container mb={3}>
        <Grid item xs={12} sm={6} md={4} mb={1} px={2}>
          <FormLabel>T/A Company</FormLabel>
          <CustomAutocomplete
            value={data?.tacompany ? data?.tacompany : ""}
            options={[]}
            renderInput={(params) => <TextField {...params} />}
            sx={{ mt: 1.3 }}
            readOnly={readOnly}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} mb={1} px={2}>
          <FormLabel>Invoice Number</FormLabel>
          <CustomInput
            value={data?.invoiceNumber ? data?.invoiceNumber : ""}
            type="text"
            readOnly={readOnly}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} mb={1} px={2}>
          <FormLabel>Date</FormLabel>
          <CustomInput value={""} type="text" readOnly={readOnly} />
        </Grid>
      </Grid>
      <Grid container mb={3}>
        <Grid item xs={12} sm={6} md={4} mb={1} px={2}>
          <FormLabel>Total Invoice Price</FormLabel>
          <CustomInput value={""} type="text" readOnly={readOnly} />
        </Grid>
      </Grid>
      <Grid container mb={3}>
        <Grid item xs={12} sm={12} md={6} mb={1} px={2}>
          <FormLabel>Client</FormLabel>
          <CustomAutocomplete
            value={data?.client ? data?.client : ""}
            options={[]}
            renderInput={(params) => <TextField {...params} />}
            sx={{ mt: 1.3 }}
            readOnly={readOnly}
            freeSolo={readOnly ? true : false}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} mb={1} px={2}>
          <FormLabel>Company Name</FormLabel>
          <CustomAutocomplete
            value={data?.companyName ? data?.companyName : ""}
            options={[]}
            renderInput={(params) => <TextField {...params} />}
            sx={{ mt: 1.3 }}
            readOnly={readOnly}
            freeSolo
          />
        </Grid>
      </Grid>
    </>
  );
};

export default InvoiceDetails;
