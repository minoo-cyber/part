import { Box, Grid, Modal } from "@mui/material";
import { FC, useState } from "react";
import { wrapperBox } from "./modal.style";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import CustomButton from "../../../components/button";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  subData: any;
  setModalData: any;
}

const SubModal: FC<IProps> = ({
  open,
  setOpen,
  subData,
  setModalData,
}: IProps) => {
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
    setModalData(subData.filter((row: any) => row.id !== id));
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={wrapperBox}>
        <Grid container sx={{ height: "500px" }}>
          <DataGrid
            rows={subData ? subData : []}
            columns={columns}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
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
            Preview
          </CustomButton>
          <CustomButton
            sx={{
              backgroundColor: (theme) =>
                theme.palette.primary.main + "!important",
            }}
          >
            Finalize
          </CustomButton>
        </Grid>
      </Box>
    </Modal>
  );
};
export default SubModal;
