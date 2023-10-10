import { SxProps } from "@mui/material";

export const wrapperBox: SxProps = {
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
  "& .MuiTextField-root": {
    width: "100%",
  },
  "& .MuiStack-root": {
    "& fieldset": {
      border: "none",
    },
    "& input": {
      height: "8px",
    },
    "& .MuiInputBase-adornedEnd": {
      background: "rgba(0, 0, 0, 0.05)",
      borderRadius: "30px",
    },
  },
};
