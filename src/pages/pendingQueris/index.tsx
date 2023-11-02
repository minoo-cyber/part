import { useEffect, useState, SyntheticEvent } from "react";
import Layout from "../../components/layout";
import {
  IPendingParam,
  getPendingService,
  pendingSearchService,
} from "../../services/pending.api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CircularProgress, FormLabel, Grid, TextField } from "@mui/material";
import CustomAutocomplete from "../../components/autocomplete";
import { clientService, companyNameService } from "../../services/invoice.api";
import CustomButton from "../../components/button";
import CustomInput from "../../components/input";
import SubModal from "./subModal";
import useAppDispatch from "../../hooks/useDispatch";
import { setToast } from "../../redux/slices/toastSlice";
import Card from "../../components/card";
import { wrapperBox } from "./pending.style";
import { setPendingSubData } from "../../redux/slices/pendingSlice";

const PendingQueris = () => {
  const getPendingQuery = useQuery({
    queryKey: ["getPending"],
    queryFn: getPendingService,
  });
  const dispatch = useAppDispatch();
  const companyQuery = useMutation(companyNameService);
  const clientQuery = useMutation(clientService);
  const pendingSearchQuery = useMutation(pendingSearchService);
  const [pendingData, setPendingData] = useState<IPendingParam[]>();
  const [companyName, setCompanyName] = useState<string | undefined>();
  const [companyData, setCompanyData] = useState<string[]>();
  const [clientName, setClientName] = useState<string>();
  const [clientData, setClientData] = useState<string[]>();
  const [open, setOpen] = useState(false);
  const [modaldata, setModalData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setPendingData(getPendingQuery?.data?.data);
  }, [getPendingQuery?.data?.data]);

  useEffect(() => {
    if (companyName) {
      clientQuery.mutate(companyName, {
        onSuccess(data) {
          if (data.data) {
            setClientData(data.data);
          }
        },
      });
    }
  }, [companyName]);

  useEffect(() => {
    if (companyName && companyName.length >= 3) {
      companyQuery.mutate(companyName, {
        onSuccess(data) {
          if (data.data) {
            setCompanyData(data.data);
          }
        },
      });
    }
  }, [companyName]);

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    pendingSearchQuery.mutate(
      {
        companyName: companyName,
        clientName: clientName,
      },
      {
        onSuccess(data) {
          setLoading(false);
          if (data.data.length > 1) {
            setPendingData(data.data);
          } else {
            setPendingData(undefined);
            dispatch(
              setToast({
                open: true,
                type: "error",
                text: "Not Founded Record",
              })
            );
          }
        },
      }
    );
  };

  const handleOpen = (index: any) => {
    setModalData(pendingData?.[index]);
    //@ts-ignore
    dispatch(setPendingSubData(pendingData?.[index]?.pendingInvoiceSubModels));
    setOpen(true);
  };

  return (
    <Layout>
      <Card>
        <Grid container component="form" onSubmit={handleSubmit}>
          <Grid item xs={12} sm={6} md={6} mb={1} px={2}>
            <FormLabel>Company</FormLabel>
            <CustomAutocomplete
              value={companyName}
              onInputChange={(event: object, value: string, reason: string) => {
                if (value && value.length >= 3) {
                  setCompanyName(value);
                } else {
                  setCompanyName("");
                }
              }}
              options={
                companyData
                  ? companyData.map((item, index) => ({
                      label: item,
                      id: index,
                    }))
                  : []
              }
              renderInput={(params) => <TextField {...params} />}
              sx={{ mt: 1.3 }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} mb={1} px={2}>
            <FormLabel>Client</FormLabel>
            <CustomAutocomplete
              value={clientName}
              onInputChange={(event: object, value: string, reason: string) => {
                setClientName(value);
              }}
              options={
                clientData
                  ? clientData.map((item, index) => ({
                      label: item,
                      id: index,
                    }))
                  : []
              }
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
        <Grid mt={3}>
          <>
            {pendingData?.map((item, index) => {
              return (
                <Grid container sx={wrapperBox} key={index}>
                  <Grid item xs={12} sm={6} md={4} px={2} my={1}>
                    <FormLabel>Id</FormLabel>
                    <CustomInput value={item.id} type="text" readOnly />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} px={2} my={1}>
                    <FormLabel>Company Name</FormLabel>
                    <CustomInput
                      value={item.companyName}
                      type="text"
                      readOnly
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} px={2} my={1}>
                    <FormLabel>Client Name</FormLabel>
                    <CustomInput value={item.clientName} type="text" readOnly />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} px={2} my={1}>
                    <FormLabel>Submit Date</FormLabel>
                    <CustomInput
                      value={item.createdDate}
                      type="text"
                      readOnly
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} px={2} my={1}>
                    <FormLabel>Total Price</FormLabel>
                    <CustomInput
                      value={item.totalAmount}
                      type="text"
                      readOnly
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    px={2}
                    my={1}
                    sx={{ textAlign: "right" }}
                  >
                    <CustomButton onClick={() => handleOpen(index)}>
                      Details
                    </CustomButton>
                  </Grid>
                </Grid>
              );
            })}
            <SubModal open={open} setOpen={setOpen} data={modaldata} />
          </>
        </Grid>
      </Card>
    </Layout>
  );
};

export default PendingQueris;
