import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import {
  FormLabel,
  Grid,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import CustomButton from "../../components/button";
import { useMutation } from "@tanstack/react-query";
import {
  addInvoiceService,
  clientService,
  companyNameService,
  invoiceUploadService,
  itemDesService,
} from "../../services/invoice.api";
import { wrapperText } from "./add.style";
import useAppDispatch from "../../hooks/useDispatch";
import {
  setInvoiceData,
  setInvoiceNotFind,
} from "../../redux/slices/invoiceSlice";
import useAppSelector from "../../hooks/useSelector";
import { setToast } from "../../redux/slices/toastSlice";
import { FileUploadProps, FileUploader } from "../../components/fileUploader";
import CustomAutocomplete from "../../components/autocomplete";
import Layout from "../../components/layout";
import Card from "../../components/card";
import { TabContext, TabPanel } from "@mui/lab";
import AddResult from "./components/addResult";

export interface IRows {
  id: number;
  impaCode: string;
  itemDesc: string;
  batchId: number;
}

const InvoiceAdd = () => {
  const dispatch = useAppDispatch();
  const { dataInvoice } = useAppSelector((state) => state.invoice);
  const [companyName, setCompanyName] = useState<string | undefined>("");
  const [companyData, setCompanyData] = useState<string[]>();
  const [clientName, setClientName] = useState<string>("");
  const [clientData, setClientData] = useState<string[]>();
  const [markingNumber, setMarkingNumber] = useState<string>("0");
  const [open, setOpen] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [qtyList, setQtyList] = useState([]);
  const [itemDes, setItemDes] = useState<string | undefined>("");
  const [itemDesData, setItemDesData] = useState<string[]>();
  const itemDesQuery = useMutation(itemDesService);
  const companyQuery = useMutation(companyNameService);
  const addInvoiceQuery = useMutation(addInvoiceService);
  const uploadQuery = useMutation(invoiceUploadService);
  const clientQuery = useMutation(clientService);
  const [test, setTest] = useState<string>();
  const [value, setValue] = useState("1");
  const [file, setFile] = useState();
  const [rows, setRows] = useState<string[]>(dataInvoice.notFoundedItems);
  const handleTabChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
    setRows([]);
  };

  const fileUploadProp: FileUploadProps = {
    accept: "application/vnd.ms-excel",
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      //@ts-ignore
      setFile(event.target.files[0]);
    },
    onDrop: (event: React.DragEvent<HTMLElement>) => {
      // setFile(event.target.files[0]);
    },
  };

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

  const handleSubmitManual = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    let invoiceModels = [];
    for (let i = 0; i < itemList.length; i++) {
      if (
        itemList[i] !== "ADDITIONAL ITEMS" &&
        qtyList[i] !== "." &&
        qtyList[i] !== "0" &&
        qtyList.length === itemList.length
      ) {
        invoiceModels.push({ itemDesc: itemList[i], qty: qtyList[i] });
      } else {
        dispatch(
          setToast({
            open: true,
            type: "error",
            text: "Item Or Qty Data Incorrect",
          })
        );
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
          dispatch(setInvoiceData(data.data));
          if (data?.data?.notFoundedItems.length > 0) {
            setRows(data?.data?.notFoundedItems);
            dispatch(setInvoiceNotFind(data?.data?.notFoundedItems));
            dispatch(
              setToast({
                open: true,
                type: "error",
                text: "Not Founded Item",
              })
            );
          }
        },
      }
    );
  };
  const handleSubmitAutomatic = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    uploadQuery.mutate(
      {
        companyName: companyName,
        clientName: clientName,
        file: file,
      },
      {
        onSuccess(data) {
          dispatch(setInvoiceData(data.data));
          if (data?.data?.notFoundedItems.length > 0) {
            setRows(data?.data?.notFoundedItems);
            dispatch(setInvoiceNotFind(data?.data?.notFoundedItems));
            dispatch(
              setToast({
                open: true,
                type: "error",
                text: "Not Founded Item",
              })
            );
          }
        },
      }
    );
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    //@ts-ignore
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    if (itemDes && itemDes.length >= 3) {
      itemDesQuery.mutate(itemDes, {
        onSuccess(data) {
          if (data.data) {
            setItemDesData(data.data);
          }
        },
      });
    }
  }, [itemDes]);

  return (
    <Layout>
      <Card>
        <TabContext value={value}>
          <Tabs
            value={value}
            onChange={handleTabChange}
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Tab value="1" label="Manual Create Invoice" />
            <Tab value="2" label="Automatic Create Invoice" />
          </Tabs>
          <TabPanel value="1">
            <Grid container component="form" onSubmit={handleSubmitManual}>
              <Grid item xs={12} sm={6} md={6} mb={1} px={2}>
                <FormLabel>Company</FormLabel>
                <CustomAutocomplete
                  value={companyName}
                  onInputChange={(
                    event: object,
                    value: string,
                    reason: string
                  ) => {
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
                  onInputChange={(
                    event: object,
                    value: string,
                    reason: string
                  ) => {
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
            </Grid>
            <AddResult
              rows={rows}
              open={open}
              setOpen={setOpen}
              markingNumber={markingNumber}
              setCompanyName={setCompanyName}
              setClientName={setClientName}
              setQtyList={setQtyList}
              setItemList={setItemList}
              setRows={setRows}
              itemDes={itemDes}
              itemDesData={itemDesData}
              setMarkingNumber={setMarkingNumber}
            />
          </TabPanel>
          <TabPanel value="2">
            <Grid container component="form" onSubmit={handleSubmitAutomatic}>
              <Grid item xs={12} sm={6} md={6} mb={1} px={2}>
                <FormLabel>Company</FormLabel>
                <CustomAutocomplete
                  value={companyName}
                  onInputChange={(
                    event: object,
                    value: string,
                    reason: string
                  ) => {
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
                  onInputChange={(
                    event: object,
                    value: string,
                    reason: string
                  ) => {
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
              <Grid item xs={12} sm={6} md={6} mb={1} px={2}>
                <FormLabel htmlFor="uploadExel">Upload Exel</FormLabel>
                <FileUploader {...fileUploadProp} />
              </Grid>
              <Grid item xs={12} sm={6} md={6} mb={1} pt={5} px={2}>
                <Typography>{test}</Typography>
              </Grid>
              <input
                onChange={(e) => handleFile(e)}
                type="file"
                accept="application/vnd.ms-excel"
              />
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
            </Grid>
            <AddResult
              rows={rows}
              open={open}
              setOpen={setOpen}
              markingNumber={markingNumber}
              setCompanyName={setCompanyName}
              setClientName={setClientName}
              setQtyList={setQtyList}
              setItemList={setItemList}
              setRows={setRows}
              itemDes={itemDes}
              itemDesData={itemDesData}
              setMarkingNumber={setMarkingNumber}
            />
          </TabPanel>
        </TabContext>
      </Card>
    </Layout>
  );
};

export default InvoiceAdd;
