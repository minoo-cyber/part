import React, { useEffect } from "react";
import { Slide, SlideProps, Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import useAppDispatch from "../../hooks/useDispatch";
import { setToast } from "../../redux/slices/toastSlice";
import useAppSelector from "../../hooks/useSelector";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="standard" {...props} />
));

const SlideTransition = (props: SlideProps) => {
  return <Slide {...props} direction="right" />;
};

export default function Toast() {
  const {
    open: toastOpen,
    text,
    type,
  } = useAppSelector((state) => state.toast);
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(toastOpen);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setToast({ open: false, text, type }));
  };

  useEffect(() => {
    setOpen(toastOpen);
  }, [toastOpen]);

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      autoHideDuration={6000}
      onClose={handleClose}
      TransitionComponent={SlideTransition}
    >
      <Alert
        onClose={handleClose}
        severity={type}
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {text}
      </Alert>
    </Snackbar>
  );
}
