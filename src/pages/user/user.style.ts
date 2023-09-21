import { SxProps } from "@mui/material";

export const formBox: SxProps = {
  "& label": {
    fontSize: "0.8rem",
    marginLeft: "10px",
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
