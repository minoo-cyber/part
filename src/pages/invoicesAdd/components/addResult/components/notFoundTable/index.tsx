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
import { FC, useState } from "react";
import { Grid, TextField, Typography } from "@mui/material";
import CustomAutocomplete from "../../../../../../components/autocomplete";
import { IRows } from "../../../previewModal";
import { useMutation } from "@tanstack/react-query";
import {
  itemAmountService,
  itemDesService,
} from "../../../../../../services/invoice.api";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

interface IProps {
  rows: any;
  setRows: (rows: []) => void;
  itemDes: string | undefined;
  setItemDes: (itemDes: string) => void;
  itemDesData: any;
  setItemDesData: (itemDesData: string) => void;
}

const NotFoundTable: FC<IProps> = ({
  rows,
  setRows,
  itemDes,
  itemDesData,
  setItemDesData,
}: IProps) => {
  const itemDesQuery = useMutation(itemDesService);
  const itemAmountQuery = useMutation(itemAmountService);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

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
        ];
      },
    },
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
      renderEditCell({ id, ...rest }) {
        return (
          <CustomAutocomplete
            loading
            value={itemDes}
            onInputChange={(event: object, value: string, reason: string) => {
              if (value && value.length >= 3) {
                itemDesQuery.mutate(value, {
                  onSuccess(data) {
                    if (data.data) {
                      setItemDesData(data.data);
                      //@ts-ignore
                      let qty = rows[id - 1].qty;
                      let filtered: any = data.data?.filter(
                        (item: any) => item?.itemDesc === value
                      )?.[0];
                      if (filtered) {
                        let arr: any = [...rows];
                        for (let i = 1; i < arr.length + 1; i++) {
                          if (id === i) {
                            let newRow: IRows = {
                              id: id,
                              impaCode: filtered?.impaCode,
                              itemDesc: filtered?.itemDesc,
                              itemSell: filtered?.itemSell,
                              batchId: filtered?.batchId,
                              qty: qty,
                              totalAmount: filtered?.itemSell * qty,
                              pkg: filtered?.pkg,
                            };
                            arr[id - 1] = newRow;
                            setRows(arr);
                          }
                        }

                        // itemAmountQuery.mutate(
                        //   {
                        //     impaCode: filtered?.impaCode,
                        //     batchId: filtered?.batchId,
                        //     qty: qty,
                        //   },
                        //   {
                        //     onSuccess(data) {

                        //     },
                        //   }
                        // );
                      }
                    }
                  },
                });
              }
            }}
            options={
              itemDesData
                ? itemDesData.map((item: any, index: any) => ({
                    //@ts-ignore
                    label: item.itemDesc,
                    //@ts-ignore
                    id: item.id,
                  }))
                : []
            }
            freeSolo
            renderInput={({ ...rest }) => <TextField {...rest} />}
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
      field: "",
      headerName: "Total Amount",
      width: 110,
      editable: false,
      valueGetter: (params) => {
        return params.row.itemSell
          ? parseFloat((params.row.itemSell * params.row.qty).toFixed(2))
          : "";
      },
    },
  ];

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };
  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };
  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row: any) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row: any) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    //@ts-ignore
    updatedRow.totalAmount = parseFloat(
      //@ts-ignore
      (updatedRow.qty * updatedRow.itemSell).toFixed(2)
    );
    setRows(rows.map((row: any) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  return (
    <>
      {rows && rows.length > 0 && (
        <Grid item xs={12} mt={7}>
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
          <Grid item xs={12} mt={3}>
            <DataGrid
              rows={rows ? rows : []}
              columns={columns}
              editMode="row"
              hideFooter={true}
              onRowEditStop={handleRowEditStop}
              onRowModesModelChange={handleRowModesModelChange}
              rowModesModel={rowModesModel}
              processRowUpdate={processRowUpdate}
            />
          </Grid>
          {/* {rows &&
            rows.map((item: any, index: any) => {

              return (
                <Box key={index}>
                  <Typography
                    mb={1}
                    mt={3}
                    sx={{
                      color: (theme) =>
                        theme.palette.primary.main + "!important",
                    }}
                  >
                    {item.itemDesc}
                  </Typography>
              
                </Box>
              );
            })} */}
        </Grid>
      )}
    </>
  );
};

export default NotFoundTable;
