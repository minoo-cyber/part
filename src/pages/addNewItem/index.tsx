import { FormLabel, Grid } from "@mui/material";
import Card from "../../components/card";
import Layout from "../../components/layout";
import CustomInput from "../../components/input";
import { SyntheticEvent, useState } from "react";
import CustomButton from "../../components/button";
import { useMutation } from "@tanstack/react-query";
import { addItemService } from "../../services/addItem.api";
import { setToast } from "../../redux/slices/toastSlice";
import useAppDispatch from "../../hooks/useDispatch";

const AddNewItem = () => {
  const dispatch = useAppDispatch();
  const [impaCode, setImpaCode] = useState<string>("");
  const [itemDes, setItemDes] = useState<string>("");
  const [packageItem, setPackageItem] = useState<string>("");
  const addItemQuery = useMutation(addItemService);

  const handleAdd = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    addItemQuery.mutate(
      {
        impaCode: impaCode,
        description: itemDes,
        unit: packageItem,
      },
      {
        onSuccess(data) {
          setImpaCode("");
          setItemDes("");
          setPackageItem("");
          dispatch(
            setToast({
              open: true,
              type: "success",
              text: "Item Add Successfully",
            })
          );
        },
      }
    );
  };
  return (
    <Layout>
      <Card>
        <Grid container component="form" onSubmit={handleAdd}>
          <Grid item xs={12} sm={6} md={4} px={2} mb={1}>
            <FormLabel>Impa Code</FormLabel>
            <CustomInput
              value={impaCode}
              handleChange={(e) => setImpaCode(e.target.value)}
              type="text"
              placeholder="Please Enter Impa Code"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} mb={1} px={2}>
            <FormLabel>Item Description</FormLabel>
            <CustomInput
              value={itemDes}
              handleChange={(e) => setItemDes(e.target.value)}
              type="text"
              placeholder="Please Enter Item Description"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} mb={1} px={2}>
            <FormLabel>Package</FormLabel>
            <CustomInput
              value={packageItem}
              handleChange={(e) => setPackageItem(e.target.value)}
              type="text"
              placeholder="Please Enter Package"
              required
            />
          </Grid>
          <Grid container sx={{ justifyContent: "center" }}>
            <CustomButton
              type="submit"
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.primary.main + "!important",
              }}
            >
              Add Item
            </CustomButton>
          </Grid>
        </Grid>
      </Card>
    </Layout>
  );
};

export default AddNewItem;
