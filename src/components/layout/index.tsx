import { FC } from "react";
import { Grid } from "@mui/material";
import { wrapperBox } from "./layout.style";
import Toast from "../toast/Toast";

interface IProps {
  children: React.ReactNode;
}

const Layout: FC<IProps> = ({ children }) => {
  return (
    <Grid sx={wrapperBox}>
      <Grid>{children}</Grid>
      <Toast />
    </Grid>
  );
};

export default Layout;
