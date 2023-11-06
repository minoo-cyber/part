import { SxProps } from "@mui/material";

export const wrapperBox: SxProps = {
  width: "600px",
  maxWidth: "100%",
  margin: "100px auto",
  textAlign: "center",
  "& form": {
    padding: "20px",
  },
};

export const wrapperViewBox: SxProps = {
  width: "600px",
  maxWidth: "100%",
  margin: "100px auto",
  "&>div": {
    padding: "20px",
  },
  "& h5": {
    textAlign: "center",
  },
  "& svg": {
    position: "relative",
    top: "7px",
  },
};
