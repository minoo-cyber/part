import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FC } from "react";
import { Box, Grid, TextField, Typography } from "@mui/material";
import CustomAutocomplete from "../../../../../../components/autocomplete";
import { IRows } from "../../../previewModal";

interface IProps {
  rows: any;
  setRows: (rows: []) => void;
  itemDes: string | undefined;
  setItemDes: (itemDes: string) => void;
  itemDesData: any;
}

const NotFoundTable: FC<IProps> = ({
  rows,
  setRows,
  itemDes,
  setItemDes,
  itemDesData,
}: IProps) => {
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
                ? itemDesData.map((item: any, index: any) => ({
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

  return (
    <>
      {rows && rows.length > 0 && (
        <Grid item xs={12} style={{ borderTop: "1px solid red" }} mt={7}>
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
    </>
  );
};

export default NotFoundTable;
