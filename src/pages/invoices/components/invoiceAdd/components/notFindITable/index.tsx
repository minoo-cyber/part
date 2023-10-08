import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FC, useEffect, useState } from "react";
import { Box, Grid, TextField, createFilterOptions } from "@mui/material";
import CustomAutocomplete from "../../../../../../components/autocomplete";
import {
  itemAmountService,
  itemDesService,
} from "../../../../../../services/invoice.api";
import { useMutation } from "@tanstack/react-query";

interface IProps {
  title: string;
  notFindData: any;
  index: number;
}

const NotFindITable: FC<IProps> = ({ title, notFindData, index }: IProps) => {
  const [itemDes, setItemDes] = useState<string | undefined>("");
  const [itemDesData, setItemDesData] = useState<string[]>();
  const [filterData, setFilterData] = useState<string[]>();
  const itemDesQuery = useMutation(itemDesService);
  const itemAmountQuery = useMutation(itemAmountService);

  const columns: GridColDef[] = [
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
      renderCell: (params) => (
        <CustomAutocomplete
          value=""
          options={[]}
          renderInput={(params) => <TextField {...params} required />}
          sx={{ mt: 1.3 }}
        />
      ),
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

  // itemAmountQuery.mutate({}, {});

  return (
    <>
      <Grid item xs={12}>
        <Box style={{ height: "500px" }}>
          {filterData && (
            <DataGrid
              rows={[filterData] ? [filterData] : []}
              columns={columns}
              editMode="row"
              hideFooter={true}
            />
          )}
        </Box>
      </Grid>
    </>
  );
};

export default NotFindITable;
