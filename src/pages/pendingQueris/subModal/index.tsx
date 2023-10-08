import { Box, FormLabel, Grid, Modal } from "@mui/material";
import { FC, useState, SyntheticEvent } from "react";
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
import CustomButton from "../../../components/button";
import { useMutation } from "@tanstack/react-query";
import {
  pendingExportPickService,
  pendingSaveService,
} from "../../../services/pending.api";
import CustomInput from "../../../components/input";
import useAppSelector from "../../../hooks/useSelector";
import {
  setPendingEdit,
  setPendingSubData,
} from "../../../redux/slices/pendingSlice";
import useAppDispatch from "../../../hooks/useDispatch";
import { setToast } from "../../../redux/slices/toastSlice";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: any;
  setModalData: any;
}

const SubModal: FC<IProps> = ({
  open,
  setOpen,
  data,
  setModalData,
}: IProps) => {
  const dispatch = useAppDispatch();
  const { pendingData } = useAppSelector((state) => state.pending);
  const exportDelQuery = useMutation(pendingExportPickService);
  const saveQuery = useMutation(pendingSaveService);
  const [dateEntered, setDateEntered] = useState<string>("");
  const [departDate, setDepartDate] = useState<string>("");
  const [port, setPort] = useState<string>("");
  const [invoiceNumber, setInvoiceNumber] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [markup, setMarkup] = useState<string>("");
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const handleClose = () => {
    setOpen(false);
  };

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
      clientName: data?.clientName,
      companyName: data?.companyName,
      dateEntered: dateEntered,
      departDate: departDate,
      port: port,
      invoiceNumber: invoiceNumber,
      category: category,
      markup: markup,
      subSaveModels: pendingData,
    };
    saveQuery.mutate(model, {
      onSuccess(data) {
        dispatch(
          setToast({
            open: true,
            type: "success",
            text: "Invoices Saved Successfully",
          })
        );
        setOpen(false);
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
          <Grid item xs={12} sm={6} md={4} mb={1} px={2}>
            <FormLabel>Date Entered</FormLabel>
            <CustomInput
              value={dateEntered}
              handleChange={(e) => setDateEntered(e.target.value)}
              type="text"
              fieldName="dateEntered"
              placeholder="Please Enter Date Entered"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} mb={1} px={2}>
            <FormLabel>Depart Date</FormLabel>
            <CustomInput
              value={departDate}
              handleChange={(e) => setDepartDate(e.target.value)}
              type="text"
              fieldName="departDate"
              placeholder="Please Enter Depart Date"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} mb={1} px={2}>
            <FormLabel>Port</FormLabel>
            <CustomInput
              value={port}
              handleChange={(e) => setPort(e.target.value)}
              type="text"
              fieldName="port"
              placeholder="Please Enter Port"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} mb={1} px={2}>
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
          <Grid item xs={12} sm={6} md={4} mb={1} px={2}>
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
          <Grid item xs={12} sm={6} md={4} mb={1} px={2}>
            <FormLabel>Markup</FormLabel>
            <CustomInput
              value={markup}
              handleChange={(e) => setMarkup(e.target.value)}
              type="text"
              fieldName="markup"
              placeholder="Please Enter Markup"
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
        </Grid>
      </Box>
    </Modal>
  );
};
export default SubModal;
