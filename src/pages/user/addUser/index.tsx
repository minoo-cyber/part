import { Box, Button, FormLabel, Grid, MenuItem } from "@mui/material";
import CustomInput from "../../../components/input";
import CustomSelect from "../../../components/select";
import { SyntheticEvent, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addUserService,
  getAllUserService,
  rolesService,
} from "../../../services/user";
import useAppDispatch from "../../../hooks/useDispatch";
import { fieldWrraper, formBox, wrapperPass } from "./addUser.style";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { setToast } from "../../../redux/slices/toastSlice";

const AddUser = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [showPass, setShowPass] = useState<boolean>(false);
  const [type, setType] = useState<any>("password");
  const addUserQuery = useMutation(addUserService);
  const rolesQuery = useQuery({ queryKey: ["roles"], queryFn: rolesService });
  const getAllUserQuery = useQuery({
    queryKey: ["allUsers"],
    queryFn: getAllUserService,
  });

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
    addUserQuery.mutate(
      {
        email: email,
        password: password,
        fullName: fullName,
        roleModels: [`${role}`],
      },
      {
        onSuccess(data) {
          if (data.status === 200) {
            dispatch(
              setToast({
                open: true,
                text: "Add User Is Success",
                type: "info",
              })
            );
          }
        },
      }
    );
  };

  const handleRole = (event: any) => {
    const value = event.target.value;
    setRole(value);
  };
  return (
    <Grid container component="form" sx={formBox} onSubmit={handleSubmit}>
      <Grid item xs={12} sx={fieldWrraper}>
        <Box>
          <FormLabel>FullName</FormLabel>
          <CustomInput
            value={fullName}
            handleChange={(e) => setFullName(e.target.value)}
            type="text"
            fieldName="fullName"
            placeholder="Please Enter Your FullName"
          />
        </Box>
        <Box>
          <FormLabel>Rols</FormLabel>
          <CustomSelect value={role} onChange={handleRole}>
            {rolesQuery?.data?.data &&
              rolesQuery.data.data.map((item: any, index: any) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
          </CustomSelect>
        </Box>
        <Box>
          <FormLabel>Email</FormLabel>
          <CustomInput
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
            type="text"
            fieldName="email"
            placeholder="Please Enter Your Email"
          />
        </Box>
        <Box sx={wrapperPass}>
          <FormLabel>Password</FormLabel>
          <CustomInput
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
            type={type}
            fieldName="password"
            placeholder="Please Enter Your Password"
          />

          {!showPass ? (
            <RemoveRedEyeIcon onClick={handleShow} />
          ) : (
            <VisibilityOffIcon onClick={handleHide} />
          )}
        </Box>
      </Grid>
      <Grid container sx={{ justifyContent: "center" }}>
        <Button
          type="submit"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.primary.main + "!important",
          }}
        >
          Add User
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddUser;
