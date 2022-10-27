import {
  AppBar,
  styled,
  Toolbar,
  Typography,
  Box,
  Button,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import React from "react";
//import { useContext } from "react";
import { theme } from "../Themes/Default-theme";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import SmarchitectIcon from "../assets/Smarchitect.png";
//import { AuthContext } from '../../src/context/AuthContext';
const StyledToolbar = styled(Toolbar)({
  backgroundColor: theme.palette.primary.main,
  display: "flex",
  justifyContent: "space-between",
});

const Icons = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "20px",
}));

const LogoutButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#F57663" ,
  "&:hover": {
    backgroundColor: "red",
  },
}));

const NavBar = (props) => {
  //const auth = useContext(AuthContext);
  const { logoutHandler } = props;
  const { handleDrawerToggle } = props;

  return (
    <div>
      <AppBar
        sx={{
          position: "fixed",
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <StyledToolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Icons>
            <img height='40px' width='40px' src={SmarchitectIcon} alt={"Smarchitect Icon"}/>
            <Typography variant="h6">Smarchitect Development Environment</Typography>
          </Icons>

          <LogoutButton variant="contained" onClick={logoutHandler}>
            <LogoutIcon />
          </LogoutButton>
        </StyledToolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
