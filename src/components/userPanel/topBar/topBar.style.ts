import { SxProps } from "@mui/material";

export const topBarBox: SxProps = {
  position: "fixed",
  zIndex: "1",
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  minHeight: "40px",
  color: "#ffffff",
  padding: "5px 40px",
  "& h3": {
    fontFamily: "serif",
  },
};

export const wrapperIcons: SxProps = {
  display: "flex",
  flexWrapp: "wrapp",
  paddingTop: "10px",
  cursor: "pointer",
  opacity: "0.7",
  "& svg": {
    position: "relative",
    top: "7px",
    marginRight: "5px",
  },
  "& p": {
    marginLeft: "40px",
  },
};
