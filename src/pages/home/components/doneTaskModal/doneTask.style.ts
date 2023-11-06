import { SxProps } from "@mui/material";

export const wrapperBox: SxProps = {
  width: "600px",
  maxWidth: "100%",
  margin: "100px auto",
  height: "60vh",
  overflow: "scroll",
  "&>div": {
    padding: "20px",
    minHeight: "60vh",
    "& h5": {
      textAlign: "center",
    },
  },
};

export const wrapperTask: SxProps = {
  "&>div": {
    background: "#eaeaea",
    padding: "5px 15px",
    borderRadius: "10px",
    "& svg": {
      position: "relative",
      top: "7px",
    },
  },
  "& p": {
    opacity: "0.5",
  },
};
