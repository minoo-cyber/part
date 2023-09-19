import { SxProps } from "@mui/material";

export const wrapperBox: SxProps = {
  display: "flex",
  flexWrap: "wrap",
};

export const wrapperContent: SxProps = {
  position: "relative",
  left: "300px",
  width: "calc(100% - 300px)",
  padding: "120px 50px 50px 50px",
  height: "calc(100vh - 66px)",
  overflowY: "scroll",
  "@media (max-width:1000px)": {
    width: "100%",
    left: "0",
  },
};

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
    "&:nth-child(1)": {
      "& svg": {
        background: "#5e72e4",
      },
    },
    "&:nth-child(2)": {
      "& svg": {
        background: "#11cdef",
      },
    },
    "&:nth-child(3)": {
      "& svg": {
        background: "#fb6340",
      },
    },
    "&:nth-child(4)": {
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
  padding: "20px",
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
