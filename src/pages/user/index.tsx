import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { fieldWrraper, formBox } from "./user.style";
import { SyntheticEvent, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addUserService, rolesService } from "../../services/user";
import Layout from "../../components/layout";
import { SelectChangeEvent } from "@mui/material/Select";
import Card from "../../components/card";

const User = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [role, setRole] = useState("");
  const [type, setType] = useState<string>("password");
  const addUserQuery = useMutation(addUserService);
  const rolesQuery = useQuery({ queryKey: ["roles"], queryFn: rolesService });

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
  const [age, setAge] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target);
    setAge(event.target.value as string);
  };
  console.log(rolesQuery);
  return (
    <Layout>
      <Card>
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

              {/* <input
              type="text"
              id="role"
              placeholder="Please Enter Your Role"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
            /> */}
              <FormControl fullWidth>
                <Select value={age} label="role" onChange={handleChange}>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
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
      </Card>
    </Layout>
  );
};

export default User;
