import { SxProps } from "@mui/material";

export const topBarBox: SxProps = {
  position: "fixed",
  zIndex: "10",
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  minHeight: "40px",
  color: "#ffffff",
  padding: "5px 40px",
  "& h3": {
    fontFamily: "serif",
  },
  "@media (max-width:1000px)": {
    "& h3": {
      opacity: "0",
    },
  },
  "@media (max-width: 800px)": {
    padding: "5px 25px",
  },
};

export const wrapperIcons: SxProps = {
  display: "flex",
  flexWrapp: "wrapp",
  paddingTop: "10px",
  opacity: "0.7",
  "& svg": {
    position: "relative",
    top: "7px",
    marginRight: "5px",
  },
  "& p": {
    marginLeft: "40px",
    "&:last-child": {
      cursor: "pointer",
    },
  },
  "@media (max-width: 850px)": {
    "& p:nth-of-type(2)": {
      display: "none",
    },
  },

  "@media (max-width: 680px)": {
    "& p:nth-of-type(1)": {
      display: "none",
    },
    "& p:nth-of-type(3)": {
      fontSize: "0",
    },
  },
};
