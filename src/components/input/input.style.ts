import { SxProps } from "@mui/material";

export const wrapperBox: SxProps = {
  "& input": {
    background: "rgba(0, 0, 0, 0.05)",
    borderRadius: "30px",
    border: "none",
    width: "100%",
    height: "40px",
    marginTop: "10px",
    padding: "0 40px 0 20px",
    outline: "none",
  },

  ".MuiInputBase-multiline": {
    padding: "0",
  },
  "& textarea": {
    background: "rgba(0, 0, 0, 0.05)",
    borderRadius: "15px",
    border: "none",
    width: "110%",
    minHeight: "150px",
    marginTop: "10px",
    padding: "20px",
    outline: "none",
  },
  "& fieldset": {
    border: "none",
  },
};
