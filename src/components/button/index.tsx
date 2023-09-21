import { Button, Grid } from "@mui/material";
import { FC } from "react";
import { ButtonProps } from "@mui/material";
import { wrapperBox } from "./button.style";

export interface IProps extends ButtonProps {}

const CustomButton: FC<IProps> = ({ children, ...otherprops }) => {
  return (
    <Grid sx={wrapperBox}>
      <Button {...otherprops}>{children}</Button>
    </Grid>
  );
};

export default CustomButton;
