import * as React from "react";
import AppBar from "@mui/material/AppBar";

import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { styled, alpha } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Reportbase from '../components/Reportbase'
import './report.css'
export default function HideAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };

  const logoutTimerIdRef = React.useRef(null);

  React.useEffect(() => {
    const autoLogout = () => {
      if (document.visibilityState === "hidden") {
        const timeOutId = window.setTimeout(logout, 60 * 60 * 1000);
        logoutTimerIdRef.current = timeOutId;
      } else {
        window.clearTimeout(logoutTimerIdRef.current);
      }
    };

    document.addEventListener("visibilitychange", autoLogout);

    return () => {
      document.removeEventListener("visibilitychange", autoLogout);
    };
  }, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="relative">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            
          ></IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { sm: "block" } }}
          >
            MUI
          </Typography>
<div          className="css" >


          <Button
  
            style={{ backgroundColor: "white" }}
            id="demo-positioned-button"
            aria-controls={open ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MenuIcon />
          </Button>
          </div>
          <Menu
            color="white"
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Reportbase />
    </Box>
  );
}
