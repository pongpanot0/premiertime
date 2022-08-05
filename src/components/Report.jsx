import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./report.css";
import logo from "../ezLINE3.png";
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
    localStorage.removeItem("company_name");
    localStorage.removeItem("name");
    localStorage.removeItem("Companyid");
    localStorage.removeItem("user_id");
    localStorage.removeItem("logged_in_status");
    localStorage.removeItem("email");
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
            <Link to="/report">
              <img src={logo} width="125px" alt="HIPezLine" />
            </Link>
          </Typography>

          <div className="css">
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
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
