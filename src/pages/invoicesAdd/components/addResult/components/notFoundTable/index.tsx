import { DataGrid, GridColDef, GridRowModes } from "@mui/x-data-grid";
import { FC, useState } from "react";
import { Box, Grid, TextField, Typography } from "@mui/material";
import CustomAutocomplete from "../../../../../../components/autocomplete";
import { IRows } from "../../../previewModal";
import { useMutation } from "@tanstack/react-query";
import {
  itemAmountService,
  itemDesService,
} from "../../../../../../services/invoice.api";

interface IProps {
  rows: any;
  setRows: (rows: []) => void;
  itemDes: string | undefined;
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
      renderEditCell({ id, ...rest }) {
        return (
          <CustomAutocomplete
            value={itemDes ? itemDes : ""}
            onInputChange={(e, value) => {
              if (value && value.length >= 3) {
                itemDesQuery.mutate(value, {
                  onSuccess(data) {
                    if (data.data) {
                      setItemDesData(data.data);
                      let filtered: any = data.data?.filter(
                        (item: any) => item?.itemDesc === value
                      )?.[0];
                      if (filtered) {
                        itemAmountQuery.mutate(
                          {
                            impaCode: filtered?.impaCode,
                            batchId: filtered?.batchId,
                          },
                          {
                            onSuccess(data) {
                              let arr: any = [...rows];
                              if (data.data) {
                                for (let i = 1; i < arr.length + 1; i++) {
                                  if (id === i) {
                                    let newRow: IRows = {
                                      id: id,
                                      impaCode: data.data?.impaCode,
                                      itemDesc: data.data?.itemDesc,
                                      itemSell: data.data?.itemSell,
                                      batchId: data.data?.batchId,
                                      pkg: data.data?.pkg,
                                    };
                                    arr[id - 1] = newRow;
                                    setRows(arr);
                                  }
                                }
                              }
                            },
                          }
                        );
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
