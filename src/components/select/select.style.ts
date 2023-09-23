import { SxProps } from "@mui/material";

export const wrapperBox: SxProps = {
  "& .MuiGrid-root ": {
    background: "rgba(0, 0, 0, 0.05)",
    borderRadius: "30px",
    border: "none",
    width: "100%",
    height: "40px",
    "&>div": {
      width: "100%",
    },
  },
  "& fieldset": {
    border: "none",
  },
};
