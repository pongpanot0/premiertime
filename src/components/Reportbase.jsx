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
  const [CategoryList, setCategoryList] = React.useState([]);
  const [Count, setCount] = React.useState([]);
  const [Distince, setDistince] = React.useState([]);
  const [items, setItems] = React.useState([]);
  const [Employess, setEmployess] = React.useState([]);
  React.useEffect(() => {
    const items = localStorage.getItem("Companyid");
    if (items) {
      setItems(items);
     }
    handleChange()
    notstamp()
    getDistince()
    countEmployees()
  }, []);
  const handleChange = async () => {

    await axios
      .get(`${process.env.REACT_APP_API_KEY}/getattendance`)

      .then((res) => {
        console.log('handleChange',res.data.data);
        setCategoryList(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  const notstamp = async () => {   //เช็คคนยังไม่แสดกน

    await axios
      .get(`${process.env.REACT_APP_API_KEY}/notstamp`)

      .then((res) => {
        console.log('notstamp',res.data);
        setCount(res.data);
      })
      .catch((err) => console.log(err));
  };
  const getDistince = async () => {   //เช็คจำนวนคนแสกนนิ้ว

    await axios
      .get(`${process.env.REACT_APP_API_KEY}/distinct`)
      .then((res) => {
        console.log('getDistince',res.data);
        setDistince(res.data);
      })
      .catch((err) => console.log(err));
  };
  const countEmployees = async () => {   //เช็คจำนวนพนักงาน
    await axios
      .get(`${process.env.REACT_APP_API_KEY}/countEmployees`)
      .then((res) => {
        console.log('Employess',res.data.count);
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

            <Chart handleChange={CategoryList} notstamp={Count} getDistince={Distince}  countEmployees={Employess}/>
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
