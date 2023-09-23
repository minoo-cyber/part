import { FC, useState } from "react";
import { FormLabel, Grid, TextField, Typography } from "@mui/material";
import CustomAutocomplete from "../../../../components/autocomplete";
import CustomButton from "../../../../components/button";
import InvoiceDetails from "../invoiceDetails";
import CustomInput from "../../../../components/input";
import {
  FileUploadProps,
  FileUploader,
} from "../../../../components/fileUploader";

interface IProps {
  readOnly: boolean;
}

const InvoiceAdd: FC<IProps> = (readOnly) => {
  const [test, setTest] = useState<string>();
  const fileUploadProp: FileUploadProps = {
    accept: "image/*",
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files !== null && event.target?.files?.length > 0) {
        setTest(`${event.target.value}`);
      }
    },
    onDrop: (event: React.DragEvent<HTMLElement>) => {
      setTest(`${event.dataTransfer.files[0].name}`);
    },
  };
  return (
    <Grid container component="form">
      <Grid item xs={4} px={2}>
        <FormLabel htmlFor="company">Company</FormLabel>
        <CustomAutocomplete
          id="company"
          value=""
          options={[]}
          renderInput={(params) => <TextField {...params} />}
          sx={{ mt: 1.3 }}
        />
      </Grid>
      <Grid item xs={4} px={2}>
        <FormLabel htmlFor="uploadExel">Upload Exel</FormLabel>
        <FileUploader {...fileUploadProp} />
      </Grid>
      <Grid item xs={4} px={2} mt={4.7}>
        <Typography>{test}</Typography>
      </Grid>
      <Grid container sx={{ justifyContent: "center" }}>
        <CustomButton
          type="submit"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.primary.main + "!important",
          }}
        >
          Add
        </CustomButton>
      </Grid>
      <InvoiceDetails readOnly={readOnly.readOnly} />
    </Grid>
  );
};
export default InvoiceAdd;
