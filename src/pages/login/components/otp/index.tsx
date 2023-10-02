import { FC } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { formBox, wrapperInput } from "./otp.style";
import { useMutation } from "@tanstack/react-query";
import { getOtpValidation } from "../../../../services/login.api";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../../components/button";
import Toast from "../../../../components/toast/Toast";

interface IProps {
  email: string;
}

const Otp: FC<IProps> = (email) => {
  const navigate = useNavigate();
  const getOtpValidationQuery = useMutation(getOtpValidation);
  const [segments, setSegments] = useState(["", "", "", "", "", ""]);

  function onPaste(event: any) {
    const pasted = event.clipboardData.getData("text/plain");
    setSegments(pasted.split("").slice(0, segments.length));
  }

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    let otp = segments.toString().replace(/,/g, "");
    getOtpValidationQuery.mutate(
      {
        email: email.email,
        otp: otp,
      },
      {
        onSuccess(data) {
          navigate("/panel");
        },
      }
    );
  };

  return (
    <>
      <Grid sx={formBox} component="form" onSubmit={handleSubmit}>
        <Typography variant="h5"> Sign In</Typography>
        <Typography>Please Enter Your Verify Code</Typography>
        <Box sx={wrapperInput}>
          {segments.map((s, key) => (
            <input type="text" key={key} value={s} onPaste={onPaste} />
          ))}
        </Box>
        <CustomButton
          type="submit"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.primary.main + "!important",
          }}
        >
          Sign In
        </CustomButton>
      </Grid>
      <Toast />
    </>
  );
};

export default Otp;
