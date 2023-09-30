import { ChangeEvent, FC, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IInvoiceSubModels } from "../../../../../../services/invoice.api";
import CustomInput from "../../../../../../components/input";
import { Box } from "@mui/material";
import { wrapperBox } from "./table.style";

interface IProps {
  rows?: IInvoiceSubModels[];
}

const SearchTable: FC<IProps> = ({ rows }: IProps) => {
  const [filterRows, setFilterRows] = useState(rows);
  const [filterKeyword, setFilterKeyword] = useState<string>();
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
      editable: true,
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

  const handleFilter = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFilterKeyword(e?.target.value);
    const keyword = e.target.value;
    if (keyword !== "") {
      const results =
        rows &&
        rows.filter((item) => {
          return (
            item.impa.toLowerCase().startsWith(keyword.toLowerCase()) ||
            item.itemDescription.toLowerCase().startsWith(keyword.toLowerCase())
          );
        });
      setFilterRows(results);
    } else {
      setFilterRows(rows);
    }
  };

  return (
    <>
      <CustomInput
        value={filterKeyword}
        handleChange={handleFilter}
        type="text"
        placeholder="Filter By ImpaCode && ItemDescription"
      />

      <Box sx={wrapperBox}>
        <DataGrid
          rows={filterRows ? filterRows : rows ? rows : []}
          columns={columns}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>
    </>
  );
};

export default SearchTable;
