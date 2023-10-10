import { SyntheticEvent, useEffect, useState } from "react";
import {
  Box,
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
  batchIdService,
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
import CustomInput from "../../components/input";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FileUploadProps, FileUploader } from "../../components/fileUploader";
import CustomAutocomplete from "../../components/autocomplete";
import PreviewModal from "./components/previewModal";
import AddTable from "./components/table";
import Layout from "../../components/layout";
import Card from "../../components/card";
import { TabContext, TabPanel } from "@mui/lab";

const InvoiceAdd = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.invoice);
  const [companyName, setCompanyName] = useState<string | undefined>("");
  const [companyData, setCompanyData] = useState<string[]>();
  const [clientName, setClientName] = useState<string>("");
  const [clientData, setClientData] = useState<string[]>();
  const [markingNumber, setMarkingNumber] = useState<string>("0");
  const [open, setOpen] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [qtyList, setQtyList] = useState([]);
  const [itemDes, setItemDes] = useState<string | undefined>("");
  const [itemDes1, setItemDes1] = useState<string | undefined>("");
  const [itemDes2, setItemDes2] = useState<string | undefined>("");
  const [itemDesData1, setItemDesData1] = useState<string[]>();
  const [itemDesData2, setItemDesData2] = useState<string[]>();
  const [itemDesData, setItemDesData] = useState<string[]>();
  const [filterData, setFilterData] = useState<string[]>();
  const itemDesQuery = useMutation(itemDesService);
  const companyQuery = useMutation(companyNameService);
  const addInvoiceQuery = useMutation(addInvoiceService);
  const uploadQuery = useMutation(invoiceUploadService);
  const clientQuery = useMutation(clientService);
  const [test, setTest] = useState<string>();
  const [value, setValue] = useState("1");

  const handleTabChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const fileUploadProp: FileUploadProps = {
    accept: "image/*",
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      // //@ts-ignore
      // setTest(`${event.dataTransfer.files[0].name}`);
    },
    onDrop: (event: React.DragEvent<HTMLElement>) => {
      setTest(`${event.dataTransfer.files[0].name}`);
    },
  };

  const handleOpen = () => {
    let arrayLength: any = [];
    Object.values(data?.map).map((item: any) => {
      arrayLength.push(item.length);
    });
    for (var i = 0; i < arrayLength.length; i++) {
      if (arrayLength[i] !== 1) {
        setOpen(false);
        dispatch(
          setToast({
            open: true,
            type: "error",
            text: "Each List Shoud Have Only One Row",
          })
        );
      } else {
        setOpen(true);
      }
    }
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

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
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

  const handleSubmitAuto = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = {
      companyName: companyName,
      clientName: clientName,
      file: test,
    };
    uploadQuery.mutate(params, {
      onSuccess(data) {
        if (data.data) {
          setItemDesData1(data.data);
          // settest(
          //   data.data?.filter((item: any) => item.itemDesc === itemDes1)
          // );

          dispatch(
            setInvoiceNotFind(
              data.data?.filter((item: any) => item.itemDesc === itemDes1)
            )
          );
        }
      },
    });
  };
  useEffect(() => {
    if (itemDes1 && itemDes1.length >= 3) {
      itemDesQuery.mutate(itemDes1, {
        onSuccess(data) {
          if (data.data) {
            setItemDesData1(data.data);
            // settest(
            //   data.data?.filter((item: any) => item.itemDesc === itemDes1)
            // );

            dispatch(
              setInvoiceNotFind(
                data.data?.filter((item: any) => item.itemDesc === itemDes1)
              )
            );
          }
        },
      });
    }
  }, [itemDes1, data.data]);

  useEffect(() => {
    if (itemDes2 && itemDes2.length >= 3) {
      itemDesQuery.mutate(itemDes2, {
        onSuccess(data) {
          if (data.data) {
            setItemDesData2(data.data);
            dispatch(
              setInvoiceNotFind(
                data.data?.filter((item: any) => item.itemDesc === itemDes2)
              )
            );
          }
        },
      });
    }
  }, [itemDes2, data.data]);

  const handleChange = (e: SyntheticEvent<Element, Event>, value: string) => {
    setItemDes(value);
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Id",
      width: 50,
      editable: false,
    },
    {
      field: "impaCode",
      headerName: "Impa Code",
      width: 100,
      editable: true,
    },
    {
      field: "itemDesc",
      headerName: "Item Description",
      width: 400,
      editable: true,
    },
    {
      field: "extraText",
      headerName: "Extra Text",
      width: 200,
      editable: true,
    },
    {
      field: "pkg",
      headerName: "pkg",
      width: 90,
      editable: true,
    },
    {
      field: "qty",
      headerName: "Qty",
      width: 90,
      editable: true,
    },
    {
      field: "itemSell",
      headerName: "Item Sell",
      width: 90,
      editable: true,
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      width: 110,
      editable: true,
    },
  ];

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
            {" "}
            <Grid container component="form" onSubmit={handleSubmit}>
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
            <Grid container>
              {Object.values(data?.map).length > 0 && (
                <Grid item xs={12} sm={6} md={4} mt={4}>
                  <FormLabel>Marking Number</FormLabel>
                  <CustomInput
                    value={markingNumber}
                    handleChange={(e) => setMarkingNumber(e.target.value)}
                    type="text"
                    placeholder="Please Enter Marking Number"
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                {Object.keys(data?.map).map((key: any) => {
                  return (
                    <Box key={key}>
                      <Typography
                        variant="h6"
                        mb={1}
                        mt={3}
                        sx={{
                          color: (theme) =>
                            theme.palette.primary.main + "!important",
                        }}
                      >
                        {key}
                      </Typography>
                      {[data.map[key]].map((item: any) => {
                        return <AddTable title={key} key={key} />;
                      })}
                    </Box>
                  );
                })}
              </Grid>
              {Object.values(data?.map).length > 0 && (
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
                    onClick={handleOpen}
                  >
                    Preview
                  </CustomButton>
                  <PreviewModal
                    open={open}
                    setOpen={setOpen}
                    markingNumber={markingNumber}
                    setCompanyName={setCompanyName}
                    setClientName={setClientName}
                    setQtyList={setQtyList}
                    setItemList={setItemList}
                  />
                </Grid>
              )}
            </Grid>
          </TabPanel>
          <TabPanel value="2">
            {" "}
            <Grid container component="form" onSubmit={handleSubmitAuto}>
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
            <Grid container>
              {Object.values(data?.map).length > 0 && (
                <Grid item xs={12} sm={6} md={4} mt={4}>
                  <FormLabel>Marking Number</FormLabel>
                  <CustomInput
                    value={markingNumber}
                    handleChange={(e) => setMarkingNumber(e.target.value)}
                    type="text"
                    placeholder="Please Enter Marking Number"
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                {Object.keys(data?.map).map((key: any) => {
                  return (
                    <Box key={key}>
                      <Typography
                        variant="h6"
                        mb={1}
                        mt={3}
                        sx={{
                          color: (theme) =>
                            theme.palette.primary.main + "!important",
                        }}
                      >
                        {key}
                      </Typography>
                      {[data.map[key]].map((item: any) => {
                        return <AddTable title={key} key={key} />;
                      })}
                    </Box>
                  );
                })}
              </Grid>
              {Object.values(data?.map).length > 0 && (
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
                    onClick={handleOpen}
                  >
                    Preview
                  </CustomButton>
                  <PreviewModal
                    open={open}
                    setOpen={setOpen}
                    markingNumber={markingNumber}
                    setCompanyName={setCompanyName}
                    setClientName={setClientName}
                    setQtyList={setQtyList}
                    setItemList={setItemList}
                  />
                </Grid>
              )}
            </Grid>
          </TabPanel>
        </TabContext>
      </Card>
    </Layout>
  );
};

export default InvoiceAdd;
