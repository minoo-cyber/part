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
    position: "relative",
    padding: "10px",
    "&:nth-of-type(1) svg": {
      color: "#5e72e4",
    },
    "&:nth-of-type(2) svg": {
      color: "#5e72e4",
    },
    "&:nth-of-type(3) svg": {
      color: "#fb6340",
    },
    "&:nth-of-type(4) svg": {
      color: "#ffd600",
    },
    "&:nth-of-type(5) svg": {
      color: "#11cdef",
    },
    "&:nth-of-type(6) svg": {
      color: "#f5365c",
    },
  },
  "& a": {
    position: "absolute",
    width: "100%",
    left: "0",
    top: "0",
    height: "100%",
    padding: "8px 0 0 40px",
  },
  "@media (max-width:1000px)": {
    left: "-300px",
    transition: "all 300ms",
  },
};

export const hideSideBar: SxProps = {
  position: "fixed",
  zIndex: "1",
  background: "#ffffff",
  width: "300px",
  minHeight: "100vh",
  boxShadow: "0 2px 5px -1px rgba(50,50,93,.08), 0 1px 3px -1px rgba(0,0,0,.1)",
  padding: "66px 30px 30px 30px",
  left: "0",
  transition: "all 300ms",
  "& li": {
    margin: "30px auto",
    position: "relative",
    padding: "10px",
    "&:nth-of-type(1) svg": {
      color: "#5e72e4",
    },
    "&:nth-of-type(2) svg": {
      color: "#5e72e4",
    },
    "&:nth-of-type(3) svg": {
      color: "#fb6340",
    },
    "&:nth-of-type(4) svg": {
      color: "#ffd600",
    },
    "&:nth-of-type(5) svg": {
      color: "#11cdef",
    },
    "&:nth-of-type(6) svg": {
      color: "#f5365c",
    },
  },
  "& a": {
    position: "absolute",
    width: "100%",
    left: "0",
    top: "0",
    height: "100%",
    padding: "8px 0 0 40px",
  },
};

export const menuIcon: SxProps = {
  display: "none",
  "@media (max-width:1000px)": {
    border: "1px solid",
    borderRadius: "50%",
    padding: "3px",
    fontSize: "2rem",
    display: "block",
    cursor: "pointer",
    color: "#fff",
    zIndex: "10",
    position: "relative",
    top: "16px",
    left: "25px",
  },
};
