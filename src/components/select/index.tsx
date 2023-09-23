import {
  FormControl,
  Grid,
  InputLabel,
  Select,
  SelectProps,
} from "@mui/material";
import { FC } from "react";
import { wrapperBox } from "./select.style";

interface IProps extends SelectProps {
  mt?: number;
}

const CustomSelect: FC<IProps> = (props) => {
  const { children, mt = 1, ...otherprops } = props;

  return (
    <Grid item container component={FormControl} sx={wrapperBox} mt={mt}>
      <Grid item container xs={12}>
        <InputLabel id="user-type">{props.label}</InputLabel>
        <Select size={!!props.size ? props.size : "small"} {...otherprops}>
          {children}
        </Select>
      </Grid>
    </Grid>
  );
};

export default CustomSelect;
