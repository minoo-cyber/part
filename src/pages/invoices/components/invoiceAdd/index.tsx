import { FC, useState } from "react";
import { FormLabel, Grid, TextField, Typography } from "@mui/material";
import CustomAutocomplete from "../../../../components/autocomplete";
import CustomButton from "../../../../components/button";
import InvoiceDetails from "../invoiceDetails";

import {
  FileUploadProps,
  FileUploader,
} from "../../../../components/fileUploader";
import InvoiceTable from "../invoiceTable";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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
  const handlePrintDocument = () => {
    const input = document.getElementById("divToPrint");
    //@ts-ignore
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      //@ts-ignore
      pdf.addImage(imgData, "JPEG", 0, 0, 200, 200);
      pdf.save("download.pdf");
    });
  };
  return (
    <>
      <Grid container component="form">
        <Grid item xs={4} px={2}>
          <FormLabel>Company</FormLabel>
          <CustomAutocomplete
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
      </Grid>
      <Grid id="divToPrint">
        <InvoiceDetails readOnly={readOnly.readOnly} />
        <InvoiceTable readOnly={readOnly.readOnly} />
      </Grid>
      <Grid
        container
        sx={{
          justifyContent: "center",
          "&>div": {
            margin: "10px",
          },
        }}
      >
        <CustomButton
          sx={{
            backgroundColor: (theme) =>
              theme.palette.primary.main + "!important",
          }}
          onClick={handlePrintDocument}
        >
          Preview
        </CustomButton>
        <CustomButton
          sx={{
            backgroundColor: (theme) =>
              theme.palette.primary.main + "!important",
          }}
        >
          Submit
        </CustomButton>
      </Grid>
    </>
  );
};
export default InvoiceAdd;
