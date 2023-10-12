import {
  Box,
  FormLabel,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { wrapperBox } from "./modal.style";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useMutation } from "@tanstack/react-query";
import useAppDispatch from "../../../../hooks/useDispatch";
import useAppSelector from "../../../../hooks/useSelector";
import { sendPendingService } from "../../../../services/pending.api";
import { setInvoiceClearData } from "../../../../redux/slices/invoiceSlice";
import { setToast } from "../../../../redux/slices/toastSlice";
import CustomInput from "../../../../components/input";
import CustomButton from "../../../../components/button";
import CustomAutocomplete from "../../../../components/autocomplete";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  setCompanyName: any;
  setClientName: any;
  setQtyList: any;
  setItemList: any;
  markingNumber: string;
  rows: any;
  setRows: (rows: []) => void;
  itemDes: string | undefined;
  itemDesData: any;
}

export interface IRows {
  id: number;
  impaCode: string;
  itemDesc: string;
  batchId: number;
}
const PreviewModal: FC<IProps> = ({
  open,
  setOpen,
  markingNumber,
  setCompanyName,
  setClientName,
  setQtyList,
  setItemList,
  rows,
  setRows,
  itemDes,
  itemDesData,
}: IProps) => {
  const dispatch = useAppDispatch();
  const { dataInvoice } = useAppSelector((state) => state.invoice);
  const sendPendingQuery = useMutation(sendPendingService);

  const handlePending = () => {
    let subModels: any = [];
    Object.values(dataInvoice.map).map((item: any) => {
      item.map((itemInfo: any) => {
        subModels.push(itemInfo);
      });
    });
    sendPendingQuery.mutate(
      {
        id: 0,
        companyName: dataInvoice.companyName,
        clientName: dataInvoice.clientName,
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

  const columnsNotFound: GridColDef[] = [
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
            <CustomInput
              value={dataInvoice?.companyName}
              type="text"
              readOnly
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} px={2} mb={1}>
            <FormLabel>Client Name</FormLabel>
            <CustomInput value={dataInvoice?.clientName} type="text" readOnly />
          </Grid>
        </Grid>
        {Object.keys(dataInvoice.map).map((key: any) => {
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
              {[dataInvoice.map[key]].map((item: any) => {
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
        {rows &&
          rows.map((item: any, index: any) => {
            return (
              <Box key={index}>
                <Typography
                  variant="h6"
                  mb={1}
                  mt={3}
                  sx={{
                    color: (theme) => theme.palette.primary.main + "!important",
                  }}
                >
                  {item.itemDesc}
                </Typography>
                <DataGrid
                  rows={[item] ? [item] : []}
                  columns={columnsNotFound}
                  editMode="row"
                  hideFooter={true}
                />
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
