import { SxProps } from "@mui/material";

export const wrapperFile: SxProps = {
  background: "rgba(0, 0, 0, 0.05)",
  borderRadius: "30px",
  border: "none",
  width: "100%",
  height: "40px",
  marginTop: "10px",
  padding: "10px 20px",
  opacity: "0.5",
  cursor: "pointer",
  "& label": {
    cursor: "pointer",
    display: "inline-block",
    width: "100%",
  },
};
