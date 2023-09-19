import { FC } from "react";
import { Grid } from "@mui/material";
import SideBar from "../../components/userPanel/sideBar";
import TopBar from "../../components/userPanel/topBar";
import { wrapperBox, wrapperContent } from "./userPanelstyle";

interface IProps {
  children: React.ReactNode;
}

const UserPanelLayout: FC<IProps> = ({ children }) => {
  return (
    <Grid>
      <TopBar />
      <Grid sx={wrapperBox}>
        <SideBar />
        <Grid sx={wrapperContent}>{children}</Grid>
      </Grid>
    </Grid>
  );
};

export default UserPanelLayout;
