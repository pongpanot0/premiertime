import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Tablereport from "./Table";
import Noattendance from "./Noattendance";
import ReportAccoding from "./ReportAccoding";
import Chart from './Chart.jsx'
const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment>
    <CardContent>

      <Typography sx={{ fontSize: 48 }} color="text.main" gutterBottom>
        ชื่อบริษัท HIPGLOBAL
      </Typography>
      <Typography variant="h5" component="div">
        เวลาทำงาน 08.00 - 17.00
      </Typography>
      <hr></hr>
     
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
      สแกนแล้ว 0 คน
      </Typography>
      <Chart/>
      <Tablereport />
      <br></br>
      <Typography variant="body5">
        ot หลังเลิกงาน ออก โอที
        <br></br>
        <hr></hr>
      </Typography>
      <Typography variant="h5">ยังไม่สแกน 1 คน</Typography>
      <Noattendance />
    </CardContent>
    <CardActions>
      <Typography variant="body2">
        สรุปข้อมูลนี้เมื่อเวลา 04/07/2022 16:31:32 SN CMYD212560025 Online
        04/07/2022 16:29 att logs 5423
      </Typography>
    </CardActions>
    <CardContent>
    <ReportAccoding/>
    </CardContent>
  
  </React.Fragment>
);
function Reportbase() {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card
        variant="outlined"
        style={{ border: "1px rounded black", borderRadius: "25px" }}
      >
        {card}
      </Card>
      
    </Box>
  );
}

export default Reportbase;
