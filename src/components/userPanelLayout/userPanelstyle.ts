import { SxProps } from "@mui/material";

export const wrapperBox: SxProps = {
  display: "flex",
  flexWrap: "wrap",
};

export const wrapperContent: SxProps = {
  position: "relative",
  left: "300px",
  width: "calc(100% - 300px)",
  padding: "120px 50px 50px 50px",
  height: "calc(100vh - 66px)",
  overflowY: "scroll",
  "@media (max-width:1000px)": {
    width: "100%",
    left: "0",
  },
};
