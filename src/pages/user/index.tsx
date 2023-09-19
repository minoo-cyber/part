import { Box, Button, Grid, Typography } from "@mui/material";
import {
  fieldWrraper,
  formBox,
  wrapperBox,
  wrapperContent,
  wrapperStatus,
} from "./user.style";
import { SyntheticEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { getOtpService, loginService } from "../../services/login.api";
import useAppDispatch from "../../hooks/useDispatch";
import { userToken } from "../../redux/slices/userSlice";
import SideBar from "../../components/userPanel/sideBar";
import TopBar from "../../components/userPanel/topBar";
import { addUserService } from "../../services/user";

const User = () => {
  const [showVerify, setShowVerify] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [role, setRole] = useState("");
  const [type, setType] = useState<string>("password");
  const addUserQuery = useMutation(addUserService);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    addUserQuery.mutate(
      {
        email: email,
        password: password,
        fullName: fullName,
        roleModels: [role],
      },
      {
        onSuccess(data) {},
      }
    );
  };

  return (
    <Grid>
      <TopBar />
      <Grid sx={wrapperBox}>
        <SideBar />
        <Grid sx={wrapperContent}>
          <Grid sx={wrapperStatus}>
            <Grid sx={formBox} component="form" onSubmit={handleSubmit}>
              <Typography variant="h5"> User</Typography>
              <Box sx={fieldWrraper}>
                <Box>
                  <label htmlFor="fullName">FULLNAME</label>
                  <br />
                  <input
                    type="text"
                    id="fullName"
                    placeholder="Please Enter Your FullName"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </Box>
                <Box>
                  <label htmlFor="role">ROLE</label>
                  <br />
                  <input
                    type="text"
                    id="role"
                    placeholder="Please Enter Your Role"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  />
                </Box>
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
                </Box>
              </Box>
              <center>
                <Button
                  type="submit"
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.primary.main + "!important",
                  }}
                >
                  Add User
                </Button>
              </center>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default User;
