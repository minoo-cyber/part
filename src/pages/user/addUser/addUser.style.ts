import { SxProps } from "@mui/material";

export const formBox: SxProps = {
  position: "relative",
  "& button": {
    color: "#fff",
    width: "200px",
    margin: "40px auto",
    borderRadius: "30px",
    height: "45px",
  },
};

export const fieldWrraper: SxProps = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  "&>div": {
    margin: "20px auto",
    width: "40%",
  },
};

export const wrapperPass: SxProps = {
  position: "relative",
  "& svg": {
    position: "absolute",
    right: "12px",
    top: "42px",
    opacity: "0.6",
    cursor: "pointer",
  },
};
