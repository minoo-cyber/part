import { FC } from "react";
import { Grid } from "@mui/material";
import SideBar from "../sideBar";
import TopBar from "../topBar";
import { wrapperBox, wrapperContent } from "./layout.style";

interface IProps {
  children: React.ReactNode;
}

const Layout: FC<IProps> = ({ children }) => {
  return (
    <Grid>
      <TopBar />
      <Grid sx={wrapperBox}>
        <SideBar />
        <Grid sx={wrapperContent}>
          <Grid>{children}</Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Layout;
