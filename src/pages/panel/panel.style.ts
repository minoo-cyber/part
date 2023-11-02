import { SxProps } from "@mui/material";

export const wrapperItems: SxProps = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  "&>div": {
    width: "23%",
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
    width: "100%",
    "&>div": {
      width: "35%",
    },
  },
  "@media (max-width:500px)": {
    "&>div": {
      width: "100%",
    },
  },
};

export const wrapperStatus: SxProps = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  "&>div:first-child": {
    width: "23%",
    minHeight: "120px",
    padding: "40px 30px 10px 30px",
    position: "relative",
    fontSize: "1.1rem",
    color: "#777777",
    margin: "10px auto",
    "& p": {
      textAlign: "center",
    },
    "& a": {
      color: "#444444",
    },
  },
  "&>div:last-child": {
    width: "73%",
    minHeight: "120px",
    padding: "30px",
    position: "relative",
    fontSize: "1.1rem",
    margin: "10px auto",
  },
  "@media (max-width:1400px)": {
    justifyContent: "center",
    width: "100%",
    "&>div": {
      width: "35% !important",
    },
  },
  "@media (max-width:500px)": {
    "&>div": {
      width: "100% !important",
    },
  },
};
