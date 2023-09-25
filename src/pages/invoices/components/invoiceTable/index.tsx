import { FC } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { IInvoiceSubModels } from "../../../../services/invoice.api";

interface IProps {
  readOnly?: boolean;
  rows?: IInvoiceSubModels[];
}

const InvoiceTable: FC<IProps> = ({ readOnly, rows }: IProps) => {
  const columns: GridColDef[] = [
    { field: "item", headerName: "ID", width: 90 },
    { field: "del", headerName: "Del", width: 90 },
    {
      field: "impa",
      headerName: "Impa",
      width: 150,
      editable: false,
    },
    {
      field: "itemDescription",
      headerName: "Item Description",
      width: 150,
      editable: false,
    },
    {
      field: "text",
      headerName: "Text",
      width: 110,
      editable: false,
    },
    {
      field: "supplier",
      headerName: "Supplier",
      width: 110,
      editable: false,
    },
    {
      field: "qty",
      headerName: "Qty",
      width: 90,
      editable: false,
    },
    {
      field: "pack",
      headerName: "Pack",
      width: 90,
      editable: false,
    },
    {
      field: "cost",
      headerName: "Ccost",
      width: 90,
      editable: false,
    },
    {
      field: "sell",
      headerName: "Sell",
      width: 90,
      editable: false,
    },
    {
      field: "extSell",
      headerName: "ExtSell",
      width: 90,
      editable: false,
    },
  ];

  // const rows = [
  //   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  //   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  //   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  //   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  //   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  //   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  //   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  //   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  //   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  // ];
  function getRowId(row: any) {
    return row.item;
  }
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        //@ts-ignore
        rows={rows ? rows : []}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default InvoiceTable;
