import { Box, Button, Grid, Typography } from "@mui/material";
import { formBox, welcomeBox, wrapperBox, wrapperFormBox } from "./login.style";
import { SyntheticEvent, useState } from "react";
import Otp from "./components/otp";
import { useMutation } from "@tanstack/react-query";
import { getOtpService, loginService } from "../../services/login.api";
import useAppDispatch from "../../hooks/useDispatch";
import { userToken } from "../../redux/slices/userSlice";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const [showVerify, setShowVerify] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPass, setShowPass] = useState<boolean>(false);
  const [type, setType] = useState<string>("password");
  const loginQuery = useMutation(loginService);
  const getOtpQuery = useMutation(getOtpService);
  const dispatch = useAppDispatch();

  const handleShow = () => {
    setShowPass(!showPass);
    setType("text");
  };
  const handleHide = () => {
    setShowPass(!showPass);
    setType("password");
  };

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginQuery.mutate(
      {
        email: email,
        password: password,
      },
      {
        onSuccess(data) {
          dispatch(
            userToken({
              refresh: data.data.refreshToken,
              token: data.data.accessToken,
            })
          );
          getOtpQuery.mutate(email, {
            onSuccess(data) {
              setShowVerify(true);
            },
          });
        },
      }
    );
  };

  return (
    <Grid sx={wrapperBox}>
      <Grid sx={wrapperFormBox}>
        {!showVerify ? (
          <Grid sx={formBox} component="form" onSubmit={handleSubmit}>
            <Typography variant="h5"> Sign In</Typography>
            <Box>
              <label htmlFor="email">EMAIL</label>
              <br />
              <input
                type="text"
                id="email"
                placeholder="Please Enter Your Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box>
              <label htmlFor="password">PASSWORD</label>
              <br />
              <input
                type={type}
                id="password"
                placeholder="Please Enter Your Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {!showPass ? (
                <RemoveRedEyeIcon onClick={handleShow} />
              ) : (
                <VisibilityOffIcon onClick={handleHide} />
              )}
            </Box>
            <Button
              type="submit"
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.primary.main + "!important",
              }}
            >
              Continue
            </Button>
          </Grid>
        ) : (
          <Otp email={email} />
        )}
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
  );
};

export default Login;
