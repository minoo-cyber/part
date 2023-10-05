import { Box, Grid, Modal } from "@mui/material";
import { FC } from "react";
import { wrapperBox } from "./modal.style";

import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import CustomButton from "../../../components/button";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  subData: any;
}

const SubModal: FC<IProps> = ({ open, setOpen, subData }: IProps) => {
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
