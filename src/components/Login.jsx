import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import { NavLink } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import logo from '../HIP-logo-01.png'
import axios from 'axios'
import Alert from '@mui/material/Alert';
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
  const [email,setEmail] = React.useState("")
  const [password,setPassword] = React.useState("")
  const [loginStatus,setLoginStatus] = React.useState("")
  const alert = <Alert severity="success">This is a success alert — check it out!</Alert>
  const Login = () =>{
    axios.post("http://localhost:8080/login",{
      email:email,
      password:password
    }).then((res)=>{
      console.log(res.data)
      if(res.data.status == 200) {
        alert()
        localStorage.setItem('token',res.data.token)
        window.location ='/report'
      } else {
        alert()
      }
    })
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={theme}>
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
         
         <Avatar
  alt="Remy Sharp"
  src={logo}
  sx={{ width: 156, height: 156,bgcolor: '#13499f' }}
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
              label="รหัสพนักงาน"
              name="รหัสพนักงาน"
              autoComplete="รหัสพนักงาน"
              autoFocus
              onChange={((e)=>{
                setEmail(e.target.value)
              })}
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
              onChange={((e)=>{
                setPassword(e.target.value)
              })}
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