import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { FC, useState } from "react";
import { Grid } from "@mui/material";
import { setInvoiceInfoSelect } from "../../../../redux/slices/invoiceSlice";
import useAppDispatch from "../../../../hooks/useDispatch";
import useAppSelector from "../../../../hooks/useSelector";

interface IProps {
  title: string;
}

const AddTable: FC<IProps> = ({ title }: IProps) => {
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
  const { dataInvoice } = useAppSelector((state) => state.invoice);
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

  const handleRowClick = (id: any) => {
    if (dataInvoice.map[title].length > 1) {
      const selected = dataInvoice.map[title].filter(
        (row: any) => row.rowNum === id
      );
      var key = title;
      var obj: any = {};
      obj[key] = selected;
      dispatch(setInvoiceInfoSelect(obj));
    }
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = dataInvoice.map[title].find(
      (row: any) => row.rowNum !== id
    );
    if (editedRow?.isNew) {
      dispatch(
        setInvoiceInfoSelect(
          dataInvoice.map[title].filter((row: any) => row.rowNum !== id)
        )
      );
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    const test = [updatedRow];
    var key = title;
    var obj: any = {};
    obj[key] = test;
    dispatch(setInvoiceInfoSelect(obj));
    return updatedRow;
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  return (
    <>
      <Grid item xs={12}>
        <DataGrid
          rows={dataInvoice.map[title] ? dataInvoice.map[title] : []}
          columns={columns}
          getRowId={(row) => row.rowNum}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowClick={(rows) => {
            handleRowClick(rows.id);
          }}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          hideFooter={true}
        />
      </Grid>
    </>
  );
};

export default AddTable;
