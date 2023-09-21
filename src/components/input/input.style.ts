import { SxProps } from "@mui/material";

export const wrapperBox: SxProps = {
  "& .MuiInputBase-root": {
    borderRadius: "30px",
  },
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
  "& fieldset": {
    border: "none",
  },
};
