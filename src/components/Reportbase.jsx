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
import Chart from "./Chart.jsx";
import axios from "axios";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

function Reportbase() {
  const [Count, setCount] = React.useState([]);
  const [Distince, setDistince] = React.useState([]);
  const [items, setItems] = React.useState([]);
  const [Employess, setEmployess] = React.useState([]);
  React.useEffect(() => {
    const items = localStorage.getItem("name");
      setItems(items);
    getDistince();
    notstamp();
    countEmployees();
  }, [items]);

  const notstamp =  () => {

    //เช็คคนยังไม่แสดกน
     axios
      .get(`${process.env.REACT_APP_API_KEY}/notstamp/${items}`)
      .then((res) => {
        setCount(res.data);
      })
      .catch((err) => console.log(err));
  };
  const getDistince =  () => {
     axios
      .get(`${process.env.REACT_APP_API_KEY}/stamp/${items}`)
      .then((res) => {
        setDistince(res.data);
      })
      .catch((err) => console.log(err));
  };
  const countEmployees =  () => {
    //เช็คจำนวนพนักงาน
     axios
      .get(`${process.env.REACT_APP_API_KEY}/employees/${items}`)
      .then((res) => {
        console.log(res);
        setEmployess(res.data.count);
      })
      .catch((err) => console.log(err));
  };
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card
        variant="outlined"
        style={{ border: "1px rounded black", borderRadius: "25px" }}
      >
        <React.Fragment>
          <CardContent>
            <Typography sx={{ fontSize: 48 }} color="text.main" gutterBottom>
              {items}
            </Typography>
            <Typography variant="h5" component="div">
              เวลาทำงาน 08.00 - 17.00
            </Typography>
            <hr></hr>

            <Chart
              notstamp={Count}
              getDistince={Distince}
              countEmployees={Employess}
            />
            <Tablereport />

            <Typography variant="h5">ยังไม่สแกน {Count.count} คน</Typography>
            <Noattendance />
          </CardContent>
          <CardContent>
            <ReportAccoding />
          </CardContent>
        </React.Fragment>
      </Card>
    </Box>
  );
}

export default Reportbase;
