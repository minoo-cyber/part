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
