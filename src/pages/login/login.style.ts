import { SxProps } from "@mui/material";

export const wrapperBox: SxProps = {
  display: "flex",
  flexWrap: "wrap",
  width: "900px",
  maxWidth: "100%",
  margin: "0 auto",
  height: "60vh",
  marginTop: "20vh",
  boxShadow: "0px 10px 34px -15px rgba(0, 0, 0, 0.24)",
  background: "#ffffff",
};

export const wrapperFormBox: SxProps = {
  width: "52%",
  padding: "40px",
  "& h5": {
    marginBottom: "20px",
  },
  "& form>div": {
    marginBottom: "20px",
  },
};

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
    padding: "0 20px",
    outline: "none",
  },
  "& button": {
    color: "#fff",
    width: "100%",
    borderRadius: "30px",
    height: "45px",
    marginTop: "40px",
  },
};
export const welcomeBox: SxProps = {
  width: "48%",
  color: "#ffffff",
  textAlign: "center",
  padding: "20px",
  paddingTop: "20vh",
  "& p": {
    margin: "15px auto",
  },
  "& a": {
    color: "#ffffff",
    border: "1px solid",
    borderRadius: "30px",
    padding: "7px 15px",
    display: "inline-block",
    textDecoration: "none",
  },
};
