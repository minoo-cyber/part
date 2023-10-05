import { SxProps } from "@mui/material";

export const wrapperBox: SxProps = {
  border: "1px solid rgb(30 28 28 / 10%)",
  padding: "20px",
  margin: "20px auto",
  borderRadius: "10px",
  "& button": {
    width: "110px",
    background: "#fff !important",
    color: "#0678a2",
    boxShadow: "rgba(6, 120, 162, 0.2) 0px 7px 29px 0px",
  },
};

export const wrapperModalBox: SxProps = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
  maxWidth: "96%",
  height: "90vh",
  overflowY: "scroll",
  bgcolor: "#ffffff",
  borderRadius: "10px",
  p: 4,
};
