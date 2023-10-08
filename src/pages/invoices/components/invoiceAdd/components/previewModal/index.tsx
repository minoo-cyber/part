import { Box, FormLabel, Grid, Modal, Typography } from "@mui/material";
import { FC } from "react";
import { wrapperBox } from "./modal.style";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import useAppSelector from "../../../../../../hooks/useSelector";
import CustomInput from "../../../../../../components/input";
import CustomButton from "../../../../../../components/button";
import { useMutation } from "@tanstack/react-query";
import { sendPendingService } from "../../../../../../services/pending.api";
import useAppDispatch from "../../../../../../hooks/useDispatch";
import { setToast } from "../../../../../../redux/slices/toastSlice";
import { setInvoiceClearData } from "../../../../../../redux/slices/invoiceSlice";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  setCompanyName: any;
  setClientName: any;
  setQtyList: any;
  setItemList: any;
  markingNumber: string;
}

const PreviewModal: FC<IProps> = ({
  open,
  setOpen,
  markingNumber,
  setCompanyName,
  setClientName,
  setQtyList,
  setItemList,
}: IProps) => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.invoice);
  const sendPendingQuery = useMutation(sendPendingService);

  const handlePending = () => {
    let subModels: any = [];
    Object.values(data.map).map((item: any) => {
      item.map((itemInfo: any) => {
        subModels.push(itemInfo);
      });
    });
    sendPendingQuery.mutate(
      {
        id: 0,
        companyName: data.companyName,
        clientName: data.clientName,
        markingNumber: Number(markingNumber),
        pendingInvoiceSubModels: subModels,
      },
      {
        onSuccess(data) {
          dispatch(setInvoiceClearData());
          setCompanyName("");
          setClientName("");
          setQtyList([]);
          setItemList([]);
          dispatch(
            setToast({
              open: true,
              type: "success",
              text: "Invoice Added To Pending Queris successfully",
            })
          );
          setOpen(false);
        },
      }
    );
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={wrapperBox}>
        <Grid container>
          <Grid item xs={12} sm={6} md={6} px={2} mb={1}>
            <FormLabel>Company Name</FormLabel>
            <CustomInput value={data?.companyName} type="text" readOnly />
          </Grid>
          <Grid item xs={12} sm={6} md={6} px={2} mb={1}>
            <FormLabel>Client Name</FormLabel>
            <CustomInput value={data?.clientName} type="text" readOnly />
          </Grid>
        </Grid>
        {Object.keys(data.map).map((key: any) => {
          return (
            <Box key={key}>
              <Typography
                mb={1}
                mt={3}
                sx={{
                  color: (theme) => theme.palette.primary.main + "!important",
                }}
              >
                {key}
              </Typography>
              {[data.map[key]].map((item: any) => {
                return (
                  <DataGrid
                    rows={item ? item : []}
                    getRowId={(row) => row.rowNum}
                    columns={columns}
                    hideFooter={true}
                  />
                );
              })}
            </Box>
          );
        })}
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
            Back
          </CustomButton>
          <CustomButton
            onClick={handlePending}
            sx={{
              backgroundColor: (theme) =>
                theme.palette.primary.main + "!important",
            }}
          >
            Add Pending
          </CustomButton>
        </Grid>
      </Box>
    </Modal>
  );
};
export default PreviewModal;
