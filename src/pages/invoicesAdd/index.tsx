import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
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
  clientService,
  companyNameService,
  invoiceUploadService,
  itemDesService,
} from "../../services/invoice.api";
import { wrapperBox, wrapperText } from "./add.style";
import useAppDispatch from "../../hooks/useDispatch";
import {
  setInvoiceData,
  setInvoiceNotFind,
} from "../../redux/slices/invoiceSlice";
import useAppSelector from "../../hooks/useSelector";
import { setToast } from "../../redux/slices/toastSlice";
import CustomInput from "../../components/input";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridRowModes,
  GridRowModesModel,
} from "@mui/x-data-grid";
import { FileUploadProps, FileUploader } from "../../components/fileUploader";
import CustomAutocomplete from "../../components/autocomplete";
import PreviewModal from "./components/previewModal";
import AddTable from "./components/table";
import Layout from "../../components/layout";
import Card from "../../components/card";
import { TabContext, TabPanel } from "@mui/lab";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

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
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const handleTabChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
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

  const handleOpen = () => {
    let arrayLength: any = [];
    Object.values(dataInvoice?.map).map((item: any) => {
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
  const handleSubmitAuto = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = {
      companyName: companyName,
      clientName: clientName,
      file: file,
    };
    uploadQuery.mutate(params, {
      onSuccess(data) {
        if (data.data) {
          setItemDesData(data.data);
        }
      },
    });
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
  }, [itemDes, rows, itemDesData]);

  const columns: GridColDef[] = [
    // {
    //   field: "actions",
    //   type: "actions",
    //   headerName: "Actions",
    //   width: 100,
    //   cellClassName: "actions",
    //   getActions: ({ id }) => {
    //     const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
    //     if (isInEditMode) {
    //       return [
    //         <GridActionsCellItem
    //           icon={<SaveIcon />}
    //           label="Save"
    //           sx={{
    //             color: "primary.main",
    //           }}
    //           onClick={handleSaveClick(id)}
    //         />,
    //         <GridActionsCellItem
    //           icon={<CancelIcon />}
    //           label="Cancel"
    //           className="textPrimary"
    //           onClick={handleCancelClick(id)}
    //           color="inherit"
    //         />,
    //       ];
    //     }
    //     return [
    //       <GridActionsCellItem
    //         icon={<EditIcon />}
    //         label="Edit"
    //         className="textPrimary"
    //         onClick={handleEditClick(id)}
    //         color="inherit"
    //       />,
    //     ];
    //   },
    // },
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
      //@ts-ignore
      renderEditCell({ id, ...rest }) {
        return (
          <CustomAutocomplete
            value={itemDes ? itemDes : ""}
            onInputChange={(e, value) => {
              //@ts-ignore
              setItemDes(value);
              if (value && value.length >= 3 && itemDesData) {
                let arr: any = [...rows];
                let filtered: any = itemDesData?.filter(
                  (item: any) => item?.itemDesc === value
                )?.[0];
                if (filtered) {
                  for (let i = 1; i < arr.length + 1; i++) {
                    if (id === i) {
                      let newRow: IRows = {
                        id: id,
                        impaCode: filtered?.impaCode,
                        itemDesc: filtered?.itemDesc,
                        batchId: filtered?.batchId,
                      };
                      arr[id - 1] = newRow;
                      setRows(arr);
                    }
                  }
                }
              }
            }}
            options={
              itemDesData
                ? itemDesData.map((item, index) => ({
                    //@ts-ignore
                    label: item.itemDesc,
                    //@ts-ignore
                    id: item.id,
                  }))
                : []
            }
            renderInput={(params) => <TextField {...params} />}
          />
        );
      },
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

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };
  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };
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
            <Grid container sx={wrapperBox}>
              {Object.values(dataInvoice?.map).length > 0 && (
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
                {Object.keys(dataInvoice?.map).map((key: any) => {
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
                      {[dataInvoice.map[key]].map((item: any) => {
                        return <AddTable title={key} key={key} />;
                      })}
                    </Box>
                  );
                })}
              </Grid>
              {rows && (
                <Grid
                  item
                  xs={12}
                  style={{ borderTop: "1px solid red" }}
                  mt={7}
                >
                  <Typography
                    variant="h5"
                    mb={1}
                    mt={3}
                    sx={{
                      color: "red",
                      marginTop: "-20px",
                      background: "#fff",
                      width: "200px",
                    }}
                  >
                    Not Found Items
                  </Typography>
                  {rows &&
                    rows.map((item: any, index: any) => {
                      return (
                        <Box key={index}>
                          <Typography
                            variant="h6"
                            mb={1}
                            mt={3}
                            sx={{
                              color: (theme) =>
                                theme.palette.primary.main + "!important",
                            }}
                          >
                            {item.itemDesc}
                          </Typography>
                          <DataGrid
                            rows={[item] ? [item] : []}
                            columns={columns}
                            editMode="row"
                            hideFooter={true}
                            // rowModesModel={rowModesModel}
                            // onRowModesModelChange={handleRowModesModelChange}
                          />
                        </Box>
                      );
                    })}
                </Grid>
              )}
              {Object.values(dataInvoice?.map).length > 0 && (
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
                    rows={rows}
                    setRows={setRows}
                    itemDes={itemDes}
                    itemDesData={itemDesData}
                  />
                </Grid>
              )}
            </Grid>
          </TabPanel>
          <TabPanel value="2">
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
            <Grid container>
              {Object.values(dataInvoice?.map).length > 0 && (
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
                {Object.keys(dataInvoice?.map).map((key: any) => {
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
                      {[dataInvoice.map[key]].map((item: any) => {
                        return <AddTable title={key} key={key} />;
                      })}
                    </Box>
                  );
                })}
              </Grid>

              {Object.values(dataInvoice?.map).length > 0 && (
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
                    rows={rows}
                    setRows={setRows}
                    itemDes={itemDes}
                    itemDesData={itemDesData}
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
