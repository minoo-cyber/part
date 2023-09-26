import { FC } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IInvoiceSubModels } from "../../../../services/invoice.api";

interface IProps {
  readOnly?: boolean;
  rows?: IInvoiceSubModels[];
}

const InvoiceTable: FC<IProps> = ({ readOnly, rows }: IProps) => {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Id",
      width: 90,
      editable: false,
    },
    {
      field: "impa",
      headerName: "Impa",
      width: 90,
      editable: false,
    },
    {
      field: "itemDescription",
      headerName: "Item Description",
      width: 250,
      editable: false,
    },
    {
      field: "text",
      headerName: "Text",
      width: 300,
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

  return (
    <Box
      sx={{
        height: 400,
        position: "relative",
        top: "20px",
      }}
    >
      <DataGrid
        rows={rows ? rows : []}
        columns={columns}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default InvoiceTable;
