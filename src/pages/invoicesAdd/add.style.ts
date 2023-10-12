import { SxProps } from "@mui/material";

export const wrapperText: SxProps = {
  "& textarea": {
    maxHeight: "250px",
    minHeight: "150px",
    maxWidth: "100%",
    minWidth: "100%",
    padding: "10px",
    marginTop: "10px",
    background: "rgba(0, 0, 0, 0.05)",
    borderRadius: "10px",
    border: "none",
    outline: "none",
  },
};

export const wrapperBox: SxProps = {
  "& .MuiAutocomplete-root": {
    width: "400px",
  },
};
