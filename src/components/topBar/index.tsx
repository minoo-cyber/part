import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { topBarBox, wrapperIcons } from "./topBar.style";
import LogoutIcon from "@mui/icons-material/Logout";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import useAppDispatch from "../../hooks/useDispatch";
import { clearUserToken } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router";

const TopBar = () => {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogOut = () => {
    dispatch(clearUserToken());
    navigate("/login");
  };

  return (
    <Grid
      sx={{
        ...topBarBox,
        backgroundColor: (theme) => theme.palette.primary.main,
      }}
    >
      <Typography variant="h3">Trident</Typography>
      <Box sx={wrapperIcons}>
        <Typography>
          <AccountCircleIcon />
          Welcome Aref
        </Typography>
        <Typography>
          <CalendarMonthIcon />
          {`${year}/${month < 10 ? `0${month}` : `${month}`}/${date}`}
        </Typography>
        <Typography onClick={handleLogOut}>
          <LogoutIcon />
          Log Out
        </Typography>
      </Box>
    </Grid>
  );
};

export default TopBar;
