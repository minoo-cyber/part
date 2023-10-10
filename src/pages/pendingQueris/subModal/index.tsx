import {
  Box,
  FormLabel,
  Grid,
  InputLabel,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useState, SyntheticEvent, useEffect } from "react";
import { wrapperBox } from "./modal.style";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import {
  pendingExportDelService,
  pendingExportPickService,
  pendingExportPlainService,
  pendingSaveService,
  portService,
} from "../../../services/pending.api";
import CustomButton from "../../../components/button";
import { useMutation } from "@tanstack/react-query";
import CustomInput from "../../../components/input";
import useAppSelector from "../../../hooks/useSelector";
import { setPendingSubData } from "../../../redux/slices/pendingSlice";
import useAppDispatch from "../../../hooks/useDispatch";
import { setToast } from "../../../redux/slices/toastSlice";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import CustomAutocomplete from "../../../components/autocomplete";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: any;
}

const SubModal: FC<IProps> = ({ open, setOpen, data }: IProps) => {
  const dispatch = useAppDispatch();
  const { pendingData } = useAppSelector((state) => state.pending);
  const exportDelQuery = useMutation(pendingExportDelService);
  const exportPlainQuery = useMutation(pendingExportPlainService);
  const exportPickQuery = useMutation(pendingExportPickService);
  const saveQuery = useMutation(pendingSaveService);
  const portQuery = useMutation(portService);
  const [dateEntered, setDateEntered] = useState<Dayjs | null>(
    dayjs(new Date())
  );
  const [departDate, setDepartDate] = useState<Dayjs | null>(dayjs(new Date()));
  const [port, setPort] = useState<string>("");
  const [porttData, setPortData] = useState<string[]>();
  const [invoiceNumber, setInvoiceNumber] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [markup, setMarkup] = useState<string>("");
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [batchId, setBatchId] = useState<string>("");
  const [resBatchId, setResBatchId] = useState<number>();

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (port && port.length >= 3) {
      portQuery.mutate(port, {
        onSuccess(data) {
          if (data.data) {
            setPortData(data.data);
          }
        },
      });
    }
  }, [port]);

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  const columns: GridColDef[] = [
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }
        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
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
      editable: true,
    },
    {
      field: "extraDescription",
      headerName: "Text",
      width: 200,
      editable: true,
    },
    {
      field: "qty",
      headerName: "Qty",
      width: 90,
      editable: true,
    },
    {
      field: "pkg",
      headerName: "Pkg",
      width: 90,
      editable: true,
    },
    {
      field: "itemSell",
      headerName: "Sell",
      width: 90,
      editable: true,
    },
  ];
  const handleDeleteClick = (id: GridRowId) => () => {
    const selected = pendingData.filter((row: any) => row.id !== id);
    dispatch(setPendingSubData(selected));
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };
  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = pendingData.find((row: any) => row.id === id);
    if (editedRow!.isNew) {
      dispatch(
        setPendingSubData(pendingData.filter((row: any) => row.id !== id))
      );
    }
  };
  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    dispatch(
      setPendingSubData(
        pendingData.map((row: any) => (row.id === newRow.id ? updatedRow : row))
      )
    );
    return updatedRow;
  };

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleSave = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const model = {
      pendingId: data?.id,
      clientName: data?.clientName,
      companyName: data?.companyName,
      dateEntered: dateEntered,
      departDate: departDate,
      port: port,
      invoiceNumber: invoiceNumber,
      category: category,
      markup: data?.markingNumber,
      subSaveModels: pendingData,
    };
    console.log(model, "model");
    saveQuery.mutate(model, {
      onSuccess(data) {
        setResBatchId(data.data);
        dispatch(
          setToast({
            open: true,
            type: "success",
            text: "Invoices Saved Successfully",
          })
        );
      },
    });
  };

  const handleDownloadDel = () => {
    exportDelQuery.mutate(resBatchId, {
      onSuccess(data) {
        if (data) {
          //@ts-ignore
          function download(url, filename) {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(data);
            link.download = `Delivery Docket ${resBatchId}`;
            link.click();
          }
          download("https://get.geojs.io/v1/ip/geo.json", "geoip.json");
        } else {
        }
      },
    });
  };

  const handleDownloadPlain = () => {
    exportPlainQuery.mutate(resBatchId, {
      onSuccess(data) {
        if (data) {
          //@ts-ignore
          function download(url, filename) {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(data);
            link.download = `Plain Paper ${resBatchId}`;
            link.click();
          }
          download("https://get.geojs.io/v1/ip/geo.json", "geoip.json");
        } else {
        }
      },
    });
  };

  const handleDownloadPick = () => {
    exportPickQuery.mutate(resBatchId, {
      onSuccess(data) {
        if (data) {
          //@ts-ignore
          function download(url, filename) {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(data);
            link.download = `Pick Report ${resBatchId}`;
            link.click();
          }
          download("https://get.geojs.io/v1/ip/geo.json", "geoip.json");
        } else {
        }
      },
    });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={wrapperBox}>
        <Grid container component="form" my={3} onSubmit={handleSave}>
          <Grid item xs={12} sm={6} md={4} mb={2} px={2}>
            <FormLabel>Company Name</FormLabel>
            <CustomInput
              value={data?.companyName}
              type="text"
              fieldName="companyName"
              readOnly
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} mb={2} px={2}>
            <FormLabel>Client Name</FormLabel>
            <CustomInput
              value={data?.clientName}
              type="text"
              fieldName="clientName"
              readOnly
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} mb={2} px={2}>
            <FormLabel>Markup</FormLabel>
            <CustomInput
              value={data?.markingNumber}
              type="text"
              fieldName="markup"
              readOnly
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} mb={2} px={2}>
            <FormLabel>Date Entered</FormLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  value={dateEntered}
                  onChange={(newValue) => setDateEntered(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6} md={4} mb={2} px={2}>
            <FormLabel>Depart Date</FormLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  value={departDate}
                  onChange={(newValue) => setDepartDate(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6} md={4} mb={2} px={2}>
            <FormLabel>Port</FormLabel>
            <CustomAutocomplete
              value={port}
              onInputChange={(event: object, value: string, reason: string) => {
                setPort(value);
              }}
              options={
                porttData
                  ? porttData.map((item, index) => ({
                      label: item,
                      id: index,
                    }))
                  : []
              }
              renderInput={(params) => <TextField {...params} required />}
              sx={{ mt: 1.3 }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} mb={2} px={2}>
            <FormLabel>Total Price </FormLabel>
            <CustomInput value={data?.totalAmount} type="text" readOnly />
          </Grid>
          <Grid item xs={12} sm={6} md={4} mb={2} px={2}>
            <FormLabel>Invoice Number</FormLabel>
            <CustomInput
              value={invoiceNumber}
              handleChange={(e) => setInvoiceNumber(e.target.value)}
              type="text"
              fieldName="invoiceNumber"
              placeholder="Please Enter Invoice Number"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} mb={2} px={2}>
            <FormLabel>Category</FormLabel>
            <CustomInput
              value={category}
              handleChange={(e) => setCategory(e.target.value)}
              type="text"
              fieldName="category"
              placeholder="Please Enter Category"
              required
            />
          </Grid>
          <Grid container sx={{ height: "320px", mt: 2 }}>
            <DataGrid
              rows={pendingData ? pendingData : []}
              columns={columns}
              pageSizeOptions={[5]}
              disableRowSelectionOnClick
              onRowModesModelChange={handleRowModesModelChange}
              onRowEditStop={handleRowEditStop}
              processRowUpdate={processRowUpdate}
              hideFooter={true}
              slots={{
                toolbar: CustomToolbar,
              }}
            />
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
              onClick={handleClose}
            >
              Back
            </CustomButton>
            <CustomButton
              type="submit"
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.primary.main + "!important",
              }}
            >
              Finalize
            </CustomButton>
          </Grid>
          {resBatchId && (
            <>
              <Grid container sx={{ justifyContent: "center" }} my={1}>
                <Typography variant="h6" sx={{ color: "rgb(126 175 128)" }}>
                  BatchId {resBatchId} Saved Successfully
                </Typography>
              </Grid>
              <Grid
                container
                sx={{
                  justifyContent: "center",
                  "&>div": {
                    margin: "0 10px 10px 10px",
                  },
                  "& button": {
                    border: "1px solid #0678a2",
                    color: "#0678a2",
                    marginTop: "10px",
                    "& svg": {
                      marginRight: "5px",
                    },
                  },
                }}
              >
                <CustomButton onClick={handleDownloadDel}>
                  <CloudDownloadIcon /> Delivery Docket
                </CustomButton>
                <CustomButton onClick={handleDownloadPlain}>
                  <CloudDownloadIcon /> Plain Paper
                </CustomButton>
                <CustomButton onClick={handleDownloadPick}>
                  <CloudDownloadIcon /> Pick Report
                </CustomButton>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </Modal>
  );
};
export default SubModal;
