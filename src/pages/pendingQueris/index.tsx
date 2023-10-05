import {
  useEffect,
  useState,
  SyntheticEvent,
  useMemo,
  useCallback,
  useRef,
} from "react";
import Layout from "../../components/layout";
import Card from "../../components/card";
import {
  IPendingParam,
  getPendingService,
  pendingSearchService,
} from "../../services/pending.api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FormLabel, Grid, TextField } from "@mui/material";
import CustomAutocomplete from "../../components/autocomplete";
import { clientService, companyNameService } from "../../services/invoice.api";
import CustomButton from "../../components/button";
import CustomInput from "../../components/input";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import SubModal from "./subModal";
import useAppDispatch from "../../hooks/useDispatch";
import { setToast } from "../../redux/slices/toastSlice";

const PendingQueris = () => {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Id",
      width: 40,
      editable: false,
    },
    {
      field: "impaCode",
      headerName: "Impa Code",
      width: 90,
      editable: true,
    },
    {
      field: "itemDesc",
      headerName: "Item Description",
      width: 400,
      editable: false,
    },
    {
      field: "extraDescription",
      headerName: "Text",
      width: 200,
      editable: false,
    },
    {
      field: "qty",
      headerName: "Qty",
      width: 90,
      editable: false,
    },
    {
      field: "pkg",
      headerName: "Pkg",
      width: 90,
      editable: false,
    },
    {
      field: "itemSell",
      headerName: "Sell",
      width: 90,
      editable: false,
    },
  ];

  const getPendingQuery = useQuery({
    queryKey: ["getPending"],
    queryFn: getPendingService,
  });
  const dispatch = useAppDispatch();
  const companyQuery = useMutation(companyNameService);
  const clientQuery = useMutation(clientService);
  const pendingSearchQuery = useMutation(pendingSearchService);
  const [pendingData, setPendingData] = useState<IPendingParam>();
  const [companyName, setCompanyName] = useState<string | undefined>();
  const [companyData, setCompanyData] = useState<string[]>();
  const [clientName, setClientName] = useState<string>();
  const [clientData, setClientData] = useState<string[]>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setPendingData(getPendingQuery?.data?.data?.[0]);
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
    pendingSearchQuery.mutate(
      {
        companyName: companyName,
        clientName: clientName,
      },
      {
        onSuccess(data) {
          if (data.data?.[0]) {
            setPendingData(data.data?.[0]);
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

  const handleRowClick = (id: any) => {
    setOpen(true);
    // if (data.map[title].length > 1) {
    //   const selected = data.map[title].filter((row: any) => row.rowNum === id);
    //   var key = title;
    //   var obj: any = {};
    //   obj[key] = selected;
    //   dispatch(setInvoiceInfoDSelect(obj));
    // }
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
                setCompanyName(value);
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
              Search
            </CustomButton>
          </Grid>
        </Grid>
        <Grid container mt={3}>
          <Grid item xs={12} sm={6} md={4} px={2} mb={1}>
            <FormLabel>Company Name</FormLabel>
            <CustomInput
              value={pendingData?.companyName ? pendingData?.companyName : ""}
              type="text"
              readOnly
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} px={2} mb={1}>
            <FormLabel>Client Name</FormLabel>
            <CustomInput
              value={pendingData?.clientName ? pendingData?.clientName : ""}
              type="text"
              readOnly
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} px={2} mb={1}>
            <FormLabel>Marking Number</FormLabel>
            <CustomInput
              value={
                pendingData?.markingNumber ? pendingData?.markingNumber : 0
              }
              type="text"
              readOnly
            />
          </Grid>
        </Grid>
        <Grid mt={3}>
          <DataGrid
            rows={
              pendingData?.pendingInvoiceSubModels
                ? pendingData?.pendingInvoiceSubModels
                : []
            }
            columns={columns}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            onRowClick={(rows) => {
              handleRowClick(rows.id);
            }}
          />

          {/* <SubModal open={open} setOpen={setOpen} /> */}
        </Grid>
      </Card>
    </Layout>
  );
};

export default PendingQueris;
