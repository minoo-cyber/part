import { FC } from "react";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { getOtpValidation } from "../../services/login.api";
import { useLocation, useNavigate } from "react-router-dom";
import CustomButton from "../../components/button";
import Toast from "../../components/toast/Toast";
import { formBox, wrapperInput } from "./otp.style";
import { wrapperBox, wrapperFormBox, welcomeBox } from "../login/login.style";

const Otp = () => {
  const { state } = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const getOtpValidationQuery = useMutation(getOtpValidation);
  const [segments, setSegments] = useState(["", "", "", "", "", ""]);

  function onPaste(event: any) {
    const pasted = event.clipboardData.getData("text/plain");
    setSegments(pasted.split("").slice(0, segments.length));
  }

  const handlechange = () => {};
  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    let otp = segments.toString().replace(/,/g, "");
    getOtpValidationQuery.mutate(
      {
        email: state.email,
        otp: otp,
      },
      {
        onSuccess(data) {
          setLoading(false);
          navigate("/panel");
        },
      }
    );
  };

  return (
    <>
      <Grid sx={wrapperBox}>
        <Grid sx={wrapperFormBox}>
          <Grid sx={formBox} component="form" onSubmit={handleSubmit}>
            <Typography variant="h5"> Sign In</Typography>
            <Typography>Please Enter Your Verify Code</Typography>
            <Box sx={wrapperInput}>
              {segments.map((s, key) => (
                <input
                  type="text"
                  key={key}
                  value={s}
                  onPaste={onPaste}
                  onChange={handlechange}
                />
              ))}
            </Box>
            <CustomButton
              type="submit"
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.primary.main + "!important",
              }}
            >
              {loading ? <CircularProgress size="small" /> : null}
              Sign In
            </CustomButton>
          </Grid>
        </Grid>
        <Grid
          sx={{
            ...welcomeBox,
            backgroundColor: (theme) => theme.palette.primary.main,
          }}
        >
          <Typography variant="h4">Welcome to login</Typography>
          <Typography>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry
          </Typography>
        </Grid>
      </Grid>
      <Toast />
    </>
  );
};

export default Otp;
