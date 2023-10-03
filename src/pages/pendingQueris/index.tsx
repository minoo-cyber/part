import { useState } from "react";
import Layout from "../../components/layout";
import EditIcon from "@mui/icons-material/Edit";
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
} from "@mui/x-data-grid";
import useAppDispatch from "../../hooks/useDispatch";
import useAppSelector from "../../hooks/useSelector";
import { Box, Grid, Typography } from "@mui/material";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import Card from "../../components/card";

const PendingQueris = () => {
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
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            // icon={showIcon ? <CropSquareIcon /> : <CheckBoxIcon />}
            icon={<CropSquareIcon />}
            label="Select"
            onClick={handleSelectClick(id)}
            color="inherit"
          />,
        ];
      },
    },
    {
      field: "rowNum",
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

  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.invoice);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSelectClick = (id: GridRowId) => () => {
    // if (data[key].length > 1) {
    //   const selected = data[key].filter((row: any) => row.rowNum === id);
    //   var key = title;
    //   var obj: any = {};
    //   obj[key] = selected;
    //   dispatch(setInvoiceInfoDSelect(obj));
    // }
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    // const editedRow = data[title].find((row: any) => row.rowNum !== id);
    // if (editedRow!.isNew) {
    //   dispatch(
    //     setInvoiceInfoDSelect(
    //       data[title].filter((row: any) => row.rowNum !== id)
    //     )
    //   );
    // }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    const test = updatedRow;

    // var key = title;
    // var obj: any = {};
    // obj[key] = test;

    // dispatch(setInvoiceInfoDSelect(obj));
    return updatedRow;
  };
  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  return (
    <Layout>
      <Card>
        <Grid item xs={12} p={3}>
          {Object.keys(data).map((key: any) => {
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
                <DataGrid
                  rows={data[key] ? data[key] : []}
                  columns={columns}
                  getRowId={(row) => row.rowNum}
                  editMode="row"
                  rowModesModel={rowModesModel}
                  onRowModesModelChange={handleRowModesModelChange}
                  onRowEditStop={handleRowEditStop}
                  processRowUpdate={processRowUpdate}
                  hideFooter={true}
                />
              </Box>
            );
          })}
        </Grid>
      </Card>
    </Layout>
  );
};

export default PendingQueris;
