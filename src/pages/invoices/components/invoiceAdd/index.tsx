import { SyntheticEvent, useEffect, useState } from "react";
import { Box, FormLabel, Grid, TextField, Typography } from "@mui/material";
import CustomAutocomplete from "../../../../components/autocomplete";
import CustomButton from "../../../../components/button";
import { useMutation } from "@tanstack/react-query";
import {
  addInvoiceService,
  clientService,
  companyNameService,
} from "../../../../services/invoice.api";
import { wrapperText } from "./add.style";
import AddTable from "./components/table";

const InvoiceAdd = () => {
  const [companyName, setCompanyName] = useState<string | undefined>("");
  const [companyData, setCompanyData] = useState<string[]>();
  const [clientName, setClientName] = useState<string>("");
  const [clientData, setClientData] = useState<string[]>();
  const [itemList, setItemList] = useState([]);
  const [qtyList, setQtyList] = useState([]);
  const [addData, setAddData] = useState<string[]>([]);
  const [addInfo, setAddInfo] = useState<string[]>([]);
  const companyQuery = useMutation(companyNameService);
  const addInvoiceQuery = useMutation(addInvoiceService);
  const clientQuery = useMutation(clientService);

  const onPasteItem = (event: any) => {
    const pastedItem = event.clipboardData.getData("text");
    setItemList(pastedItem.split("\n"));
  };

  const onPasteQty = (event: any) => {
    const qtyItem = event.clipboardData.getData("text");
    setQtyList(qtyItem.split("\n"));
  };

  const handleItem = (event: any) => {
    const pastedItem = event.target.value;
    setItemList(pastedItem.split("\n"));
  };

  const handleQty = (event: any) => {
    const qtyItem = event.target.value;
    setQtyList(qtyItem.split("\n"));
  };

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
    let invoiceModels = [];
    for (let i = 0; i < itemList.length; i++) {
      if (itemList[i] !== "ADDITIONAL ITEMS" && qtyList[i] !== ".") {
        invoiceModels.push({ itemDesc: itemList[i], qty: qtyList[i] });
      }
    }
    addInvoiceQuery.mutate(
      {
        companyName: companyName,
        clientName: clientName,
        invoiceModels: invoiceModels,
      },
      {
        onSuccess(data) {
          setAddData(data.data?.map);
        },
      }
    );
  };

  return (
    <>
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
            renderInput={(params) => <TextField {...params} required />}
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
            renderInput={(params) => <TextField {...params} required />}
            sx={{ mt: 1.3 }}
          />
        </Grid>
        <Grid sx={wrapperText} item xs={12} sm={6} md={6} px={2} mt={2}>
          <FormLabel>Item Description</FormLabel>
          <textarea
            placeholder="Paste Item Description here..."
            onPaste={onPasteItem}
            onChange={handleItem}
            required
          />
        </Grid>
        <Grid sx={wrapperText} item xs={12} sm={6} md={6} px={2} mt={2}>
          <FormLabel>Qty</FormLabel>
          <textarea
            placeholder="Paste Item Qty here..."
            onPaste={onPasteQty}
            onChange={handleQty}
            required
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
            Add Invoice
          </CustomButton>
        </Grid>
        <Grid item xs={12}>
          {Object.keys(addData).map((key: any) => {
            return (
              <Box key={key}>
                <Typography
                  variant="h6"
                  mb={1}
                  mt={3}
                  sx={{
                    color: (theme) => theme.palette.primary.main + "!important",
                  }}
                >
                  {key}
                </Typography>
                {[addData[key]].map((item: any) => {
                  return <AddTable infoData={item} />;
                })}
              </Box>
            );
          })}
        </Grid>
      </Grid>
    </>
  );
};

export default InvoiceAdd;
