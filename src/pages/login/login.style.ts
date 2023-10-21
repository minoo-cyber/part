import { SxProps } from "@mui/material";

export const wrapperBox: SxProps = {
  display: "flex",
  flexWrap: "wrap",
  width: "900px",
  maxWidth: "96%",
  margin: "0 auto",
  height: "60vh",
  marginTop: "20vh",
  boxShadow: "0px 10px 34px -15px rgba(0, 0, 0, 0.24)",
  background: "#ffffff",
  "@media (max-width: 700px)": {
    marginTop: "100px",
    "&>div": {
      width: "100%",
    },
  },
};
export const wrapperFormBox: SxProps = {
  width: "52%",
  padding: "40px",
  "& h5": {
    marginBottom: "20px",
  },
  "& form>div": {
    marginBottom: "20px",
    position: "relative",
  },
};

export const formBox: SxProps = {
  "& label": {
    fontSize: "0.8rem",
    marginLeft: "10px",
  },
  "&>div>svg": {
    position: "absolute",
    right: "12px",
    top: "41px",
    opacity: "0.6",
    cursor: "pointer",
  },
};
export const welcomeBox: SxProps = {
  width: "48%",
  color: "#ffffff",
  textAlign: "center",
  padding: "20vh 20px 20px 20px",
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
  "@media (max-width: 700px)": {
    paddingTop: "30px",
  },
};
