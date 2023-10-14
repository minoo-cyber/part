import { Box, FormLabel, Grid, Typography } from "@mui/material";
import CustomInput from "../../../../components/input";
import AddTable from "./components/mapTable";
import CustomButton from "../../../../components/button";
import PreviewModal from "../previewModal";
import { wrapperBox } from "../../add.style";
import { FC } from "react";
import useAppSelector from "../../../../hooks/useSelector";
import useAppDispatch from "../../../../hooks/useDispatch";
import { setToast } from "../../../../redux/slices/toastSlice";
import NotFoundTable from "./components/notFoundTable";

interface IProps {
  rows: string[];
  open: boolean;
  setOpen: (open: boolean) => void;
  setCompanyName: any;
  setClientName: any;
  setQtyList: any;
  setItemList: any;
  markingNumber: string;
  setMarkingNumber: (markingNumber: string) => void;
  setRows: (rows: []) => void;
  itemDes: string | undefined;
  itemDesData: any;
}

const AddResult: FC<IProps> = ({
  rows,
  open,
  setOpen,
  markingNumber,
  setMarkingNumber,
  setCompanyName,
  setClientName,
  setQtyList,
  setItemList,
  setRows,
  itemDes,
  itemDesData,
}) => {
  const dispatch = useAppDispatch();
  const { dataInvoice } = useAppSelector((state) => state.invoice);

  const handleOpen = () => {
    let arrayLength: any = [];
    Object.values(dataInvoice?.map).map((item: any) => {
      arrayLength.push(item.length);
    });
    for (var i = 0; i < arrayLength.length; i++) {
      if (arrayLength[i] !== 1) {
        setOpen(false);
        dispatch(
          setToast({
            open: true,
            type: "error",
            text: "Each List Shoud Have Only One Row",
          })
        );
      } else {
        setOpen(true);
      }
    }
  };

  return (
    <>
      <Grid container sx={wrapperBox}>
        {Object.values(dataInvoice?.map).length > 0 && (
          <Grid item xs={12} sm={6} md={4} mt={4}>
            <FormLabel>Marking Number</FormLabel>
            <CustomInput
              value={markingNumber}
              handleChange={(e) => setMarkingNumber(e.target.value)}
              type="text"
              placeholder="Please Enter Marking Number"
            />
          </Grid>
        )}
        <Grid item xs={12}>
          {Object.keys(dataInvoice?.map).map((key: any) => {
            return (
              <Box key={key}>
                <Typography
                  variant="h6"
                  mb={1}
                  mt={3}
                  sx={{
                    color: (theme) => theme.palette.primary.main + "!important",
                  }}
                >
                  {key}
                </Typography>
                {[dataInvoice.map[key]].map((item: any) => {
                  return <AddTable title={key} key={key} />;
                })}
              </Box>
            );
          })}
        </Grid>
        <NotFoundTable
          itemDes={itemDes}
          itemDesData={itemDesData}
          rows={rows}
          setRows={setRows}
        />
        {Object.values(dataInvoice?.map).length > 0 && (
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
              onClick={handleOpen}
            >
              Preview
            </CustomButton>
            <PreviewModal
              open={open}
              setOpen={setOpen}
              markingNumber={markingNumber}
              setCompanyName={setCompanyName}
              setClientName={setClientName}
              setQtyList={setQtyList}
              setItemList={setItemList}
              rows={rows}
              setRows={setRows}
              itemDes={itemDes}
              itemDesData={itemDesData}
            />
          </Grid>
        )}
      </Grid>
    </>
  );
};
export default AddResult;
