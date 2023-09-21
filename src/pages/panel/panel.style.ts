import { SxProps } from "@mui/material";

export const wrapperItems: SxProps = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  "&>div": {
    background: "#ffffff",
    width: "20%",
    borderRadius: "10px",
    minHeight: "120px",
    padding: "80px 30px 0 30px",
    position: "relative",
    fontSize: "1.2rem",
    color: "#777777",
    "&:nth-of-type(1)": {
      "& svg": {
        background: "#5e72e4",
      },
    },
    "&:nth-of-type(2)": {
      "& svg": {
        background: "#11cdef",
      },
    },
    "&:nth-of-type(3)": {
      "& svg": {
        background: "#fb6340",
      },
    },
    "&:nth-of-type(4)": {
      "& svg": {
        background: "#ffd600",
      },
    },
    "& svg": {
      right: "15px",
      borderRadius: "50%",
      fontSize: "55px",
      padding: "10px",
      color: "#fff",
      position: "absolute",
      top: "15px",
      opacity: "0.7",
    },
  },
  "@media (max-width:1400px)": {
    justifyContent: "center",
    "&>div": {
      width: "35%",
      margin: "20px auto",
    },
  },
  "@media (max-width:500px)": {
    "&>div": {
      width: "100%",
    },
  },
};

export const wrapperStatus: SxProps = {
  background: "#ffffff",
  minHeight: "300px",
  margin: "50px auto",
  padding: "50px",
};
