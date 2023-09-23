import { SxProps } from "@mui/material";

export const wrapperItems: SxProps = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  width: "66%",
  "&>div": {
    width: "47%",
    minHeight: "120px",
    padding: "80px 30px 30px 30px",
    position: "relative",
    fontSize: "1.1rem",
    color: "#777777",
    margin: "10px auto",
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
    "&:nth-of-type(5)": {
      "& svg": {
        background: "#11cdef",
      },
    },
    "&:nth-of-type(6)": {
      "& svg": {
        background: "#5e72e4",
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
  "& a": {
    color: "#444444",
  },
  "@media (max-width:1400px)": {
    justifyContent: "center",
    "&>div": {
      width: "35%",
    },
  },
  "@media (max-width:500px)": {
    "&>div": {
      width: "100%",
    },
  },
  "@media (max-width: 1390px)": {
    width: "100%",
  },
};

export const wrapperCompany: SxProps = {
  width: "34%",
  paddingRight: "10px",
  marginTop: "80px",
  "&>div": {
    height: "362px",
    "&>div": {
      borderRadius: "10px",
      height: "240px",
      marginTop: "-90px",
      boxShadow:
        "0rem 0.25rem 0.375rem -0.0625rem rgba(0, 0, 0, 0.1), 0rem 0.125rem 0.25rem -0.0625rem rgba(0, 0, 0, 0.06)",
    },
  },

  "& img": {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
  },
  "& p": {
    textAlign: "center",
    margin: "25px auto 45px auto",
  },
  "@media (max-width: 1390px)": {
    width: "50%",
    margin: "60px auto 20px auto",
    paddingRight: "0",
  },
  "@media (max-width: 768px)": {
    width: "80%",
  },
  "@media (max-width: 500px)": {
    width: "100%",
  },
};
