import { SxProps } from "@mui/material";

export const sideBarBox: SxProps = {
  position: "fixed",
  background: "#ffffff",
  width: "300px",
  minHeight: "100vh",
  boxShadow: "0 2px 5px -1px rgba(50,50,93,.08), 0 1px 3px -1px rgba(0,0,0,.1)",
  padding: "66px 30px 30px 30px",
  "& li": {
    margin: "30px auto",
    "&:nth-child(1) svg": {
      color: "#5e72e4",
    },
    "&:nth-child(3) svg": {
      color: "#5e72e4",
    },
    "&:nth-child(4) svg": {
      color: "#fb6340",
    },
    "&:nth-child(5) svg": {
      color: "#ffd600",
    },
    "&:nth-child(6) svg": {
      color: "#11cdef",
    },
    "&:nth-child(7) svg": {
      color: "#f5365c",
    },
  },
};
