import { FC } from "react";
import { FormLabel, Grid } from "@mui/material";
import { ISearchRes } from "../../../../../../services/invoice.api";
import CustomInput from "../../../../../../components/input";

interface IProps {
  data?: ISearchRes;
}

const SearchDetails: FC<IProps> = ({ data }: IProps) => {
  return (
    <>
      <Grid container mb={3}>
        <Grid item xs={12} sm={6} md={4} mb={1} px={2}>
          <FormLabel>Batch Number</FormLabel>
          <CustomInput
            value={data?.batchNumber ? data?.batchNumber : ""}
            type="text"
            readOnly
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} mb={1} px={2}>
          <FormLabel>InvoicedBy</FormLabel>
          <CustomInput
            value={data?.invoicedBy ? data?.invoicedBy : ""}
            type="text"
            readOnly
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} mb={1} px={2}>
          <FormLabel>Port</FormLabel>
          <CustomInput
            value={data?.port ? data?.port : ""}
            type="text"
            readOnly
          />
        </Grid>
      </Grid>
      <Grid container mb={3}>
        <Grid item xs={12} sm={6} md={4} mb={1} px={2}>
          <FormLabel>Order Number</FormLabel>
          <CustomInput
            value={data?.orderNumber ? data?.orderNumber : ""}
            type="text"
            readOnly
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} mb={1} px={2}>
          <FormLabel>Department</FormLabel>
          <CustomInput
            value={data?.department ? data?.department : ""}
            type="text"
            readOnly
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} mb={1} px={2}>
          <FormLabel>Marking Number</FormLabel>
          <CustomInput
            value={data?.markingNumber ? data?.markingNumber : ""}
            type="text"
            readOnly
          />
        </Grid>
      </Grid>
      <Grid container mb={3}>
        <Grid item xs={12} sm={6} md={4} mb={1} px={2}>
          <FormLabel>T/A Company</FormLabel>
          <CustomInput
            value={data?.tacompany ? data?.tacompany : ""}
            type="text"
            readOnly
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} mb={1} px={2}>
          <FormLabel>Invoice Number</FormLabel>
          <CustomInput
            value={data?.invoiceNumber ? data?.invoiceNumber : ""}
            type="text"
            readOnly
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} mb={1} px={2}>
          <FormLabel>Date</FormLabel>
          <CustomInput value={""} type="text" readOnly />
        </Grid>
      </Grid>
      <Grid container mb={3}>
        <Grid item xs={12} sm={6} md={4} mb={1} px={2}>
          <FormLabel>Total Invoice Price</FormLabel>
          <CustomInput value={""} type="text" readOnly />
        </Grid>
      </Grid>
      <Grid container mb={3}>
        <Grid item xs={12} sm={12} md={6} mb={1} px={2}>
          <FormLabel>Client</FormLabel>
          <CustomInput
            value={data?.client ? data?.client : ""}
            type="text"
            readOnly
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} mb={1} px={2}>
          <FormLabel>Company Name</FormLabel>
          <CustomInput
            value={data?.companyName ? data?.companyName : ""}
            type="text"
            readOnly
          />
        </Grid>
      </Grid>
    </>
  );
};

export default SearchDetails;
