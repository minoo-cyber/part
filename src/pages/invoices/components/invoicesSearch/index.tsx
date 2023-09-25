import { FC, SyntheticEvent } from "react";
import { CircularProgress, FormLabel, Grid, TextField } from "@mui/material";
import CustomAutocomplete from "../../../../components/autocomplete";
import CustomInput from "../../../../components/input";
import { useState } from "react";
import CustomButton from "../../../../components/button";
import InvoiceDetails from "../invoiceDetails";
import InvoiceTable from "../invoiceTable";
import ClipboardPaste from "../../../../components/copy";
import {
  ISearchRes,
  invoiceSearchService,
} from "../../../../services/invoice.api";
import { useMutation } from "@tanstack/react-query";
import useAppDispatch from "../../../../hooks/useDispatch";
import { setToast } from "../../../../redux/slices/toastSlice";

interface IProps {
  readOnly: boolean;
}

const InvoicesSearch: FC<IProps> = (readOnly) => {
  const dispatch = useAppDispatch();
  const [batchId, setBatchId] = useState<string>("");
  const [data, setData] = useState<ISearchRes>();
  const [loading, setLoading] = useState<boolean>(false);
  const searchQuery = useMutation(invoiceSearchService);

  const handleSearch = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    searchQuery.mutate(
      {
        batchId: Number(batchId),
        clientName: "",
        companyName: "",
      },
      {
        onSuccess(data) {
          if (data.data[0]) {
            setData(data.data[0]);
            setLoading(false);
          } else {
            setLoading(false);
            dispatch(
              setToast({
                open: true,
                type: "error",
                text: "No Data For This BatchId",
              })
            );
          }
        },
      }
    );
  };
  console.log(data?.invoiceSubModels);
  return (
    <>
      <Grid container component="form" onSubmit={handleSearch}>
        <Grid item xs={4} px={2}>
          <FormLabel>Batch Id</FormLabel>
          <CustomInput
            value={batchId}
            handleChange={(e) => setBatchId(e.target.value)}
            type="text"
            placeholder="Please Enter BatchId"
            required
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
            {loading ? <CircularProgress size="small" /> : null}
            Search
          </CustomButton>
        </Grid>
      </Grid>
      <InvoiceDetails readOnly={readOnly.readOnly} data={data} />
      <InvoiceTable
        readOnly={readOnly.readOnly}
        rows={data?.invoiceSubModels}
      />
    </>
  );
};
export default InvoicesSearch;
