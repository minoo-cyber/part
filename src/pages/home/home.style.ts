import { SxProps } from "@mui/material";

export const wrapperBox: SxProps = {
  justifyContent: "center",
  "& button": {
    "& svg": {
      width: "60px",
      height: "60px",
    },
  },
};

export const wrapperTask: SxProps = {
  "&>div": {
    padding: "20px",
    "& svg": {
      position: "relative",
      top: "7px",
    },
  },
  "& button": {
    marginBottom: "10px",
  },
  "& p": {
    opacity: "0.5",
  },
};
