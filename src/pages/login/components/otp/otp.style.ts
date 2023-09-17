import { SxProps } from "@mui/material";

export const formBox: SxProps = {
  "& p": {
    marginBottom: "20px",
    color: "#7d7b7b",
    textAlign: "center",
  },
  "& button": {
    color: "#fff",
    width: "100%",
    borderRadius: "30px",
    height: "45px",
    marginTop: "95px",
  },
};

export const wrapperInput: SxProps = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  flexFlow: "row-reverse",
  "& input": {
    background: "rgba(0, 0, 0, 0.05)",
    borderRadius: "50%",
    textAlign: "center",
    fontWeight: "700",
    width: "45px",
    height: "45px",
    margin: "10px",
    outline: "none",
    border: "none",
    fontSize: "1.4rem",
    "@media (max-width: 400px)": { margin: "2px" },
  },
};
