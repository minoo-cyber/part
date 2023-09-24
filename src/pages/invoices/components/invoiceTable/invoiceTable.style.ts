import { SxProps } from "@mui/material";

export const wrapperBox: SxProps = {
  height: 500,
  width: "100%",
  marginTop: "50px",
  "& .actions": {
    color: "text.secondary",
  },
  "& .textPrimary": {
    color: "text.primary",
  },
};
