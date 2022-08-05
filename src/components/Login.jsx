import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";
import { useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import logo from "../icon_HIPezLINE.png";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuth } from "./auth";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://hipglobal.co.th/">
        HIP
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [err, setError] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleClose2 = () => {
    setError(false);
    window.location.reload();
  };
  const redirectPath = location.state?.path || "/report";
  const Login = () => {
    axios
      .post(`${process.env.REACT_APP_API_KEY}/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setOpen(true);
          localStorage.setItem("logged_in_status", JSON.stringify(true));
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user_id", res.data.user[0].user_id);
          localStorage.setItem("name", res.data.user[0].name);
          localStorage.setItem("email", res.data.user[0].email);
          auth.login(email);
          setTimeout(() => {
            window.location = redirectPath; 
            navigate(redirectPath, { replace: true });
          
          }, "2000");
        }
        if (res.data.status === 400) {
          setError(true);
        }
      });
  };
  const logout = () => {
    localStorage.clear();
    auth.logout(!email);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const logoutTimerIdRef = React.useRef(null);

  React.useEffect(() => {
    const autoLogout = () => {
      if (document.visibilityState === "hidden") {
        const timeOutId = window.setTimeout(logout, 600 * 600 * 1000);
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
    <ThemeProvider theme={theme}>
      {open ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="success" />
        </Backdrop>
      ) : (
        <></>
      )}

      {err ? (
        <Dialog
          open={err}
          onClose={handleClose2}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"ชื่อหรือรหัสผ่านไม่ถูกต้อง"}
          </DialogTitle>

          <DialogActions>
            <Button onClick={handleClose2} autoFocus fullWidth>
              ตกลง
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <></>
      )}

      <Container component="main" maxWidth="xs" bgcolor="secondary.main">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            alt="Remy Sharp"
            src={logo}
            style={{ width: 156, height: 156 }}
          />

          <br></br>
          <Typography component="h1" variant="h5">
            เข้าสู่ระบบ
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="รหัสผู้ใช้"
              name="รหัสผู้ใช้"
              autoComplete="รหัสผู้ใช้"
              autoFocus
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="รหัสผ่าน"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={Login}
            >
              เข้าสู่ระบบ
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
