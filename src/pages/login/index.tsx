import {
  Box,
  CircularProgress,
  FormLabel,
  Grid,
  Typography,
} from "@mui/material";
import { formBox, welcomeBox, wrapperBox, wrapperFormBox } from "./login.style";
import { SyntheticEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { getOtpService, loginService } from "../../services/login.api";
import useAppDispatch from "../../hooks/useDispatch";
import { userInfo, userToken } from "../../redux/slices/userSlice";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CustomInput from "../../components/input";
import CustomButton from "../../components/button";
import Toast from "../../components/toast/Toast";
import { useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPass, setShowPass] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [type, setType] = useState<any>("password");
  const loginQuery = useMutation(loginService);
  const getOtpQuery = useMutation(getOtpService);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
    setLoading(true);
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
          dispatch(
            userInfo({
              user: data.data.user.email,
            })
          );
          setLoading(false);
          navigate("/otp", {
            state: {
              email,
            },
          });
          getOtpQuery.mutate(email, {
            onSuccess(data) {},
          });
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
            <Box>
              <FormLabel>Email</FormLabel>
              <CustomInput
                value={email}
                handleChange={(e) => setEmail(e.target.value)}
                type="text"
                fieldName="email"
                placeholder="Please Enter Your Email"
                required
              />
            </Box>
            <Box>
              <FormLabel>Password</FormLabel>
              <CustomInput
                value={password}
                handleChange={(e) => setPassword(e.target.value)}
                type={type}
                placeholder="Please Enter Your Password"
                required
              />

              {!showPass ? (
                <RemoveRedEyeIcon onClick={handleShow} />
              ) : (
                <VisibilityOffIcon onClick={handleHide} />
              )}
            </Box>
            <CustomButton
              type="submit"
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.primary.main + "!important",
              }}
            >
              {loading ? <CircularProgress size="small" /> : null}
              Continue
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

export default Login;
