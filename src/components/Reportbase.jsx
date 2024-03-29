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
import HideAppBar from "./Report";

function Reportbase() {
  const [Count, setCount] = React.useState([]);
  const [Distince, setDistince] = React.useState([]);
  const [items, setItems] = React.useState([]);
  const [Employess, setEmployess] = React.useState([]);
  const [set, Setset] = React.useState([]);
  const [limit, setLimit] = React.useState(100000);
  const [offset, setOffset] = React.useState(0);
  const [name, setName] = React.useState([]);
  React.useEffect(() => {
    const items = localStorage.getItem("name");
    if (items) {
      setItems(items);
    }
    getDistince();
    notstamp();
    countEmployees();
    setting();
    getName();
  }, [items]);
  const getName = () => {
    const items = localStorage.getItem("name");
    axios
      .get(`${process.env.REACT_APP_API_KEY}/getCompanyname/${items}`)
      .then((res) => {
       
        setName(res.data[0].Companyname);
      })
     
  };
 
  const setting = () => {
    const items = localStorage.getItem("name");
    axios
      .get(`${process.env.REACT_APP_API_KEY}/setting/${items}`)
      .then((res) => {
        Setset(res.data.data[0]);
      })
      
  };
  const notstamp = () => {
    const items = localStorage.getItem("name");
    //เช็คคนยังไม่แสดกน
    axios
      .get(`${process.env.REACT_APP_API_KEY}/notstamp/${items}`)
      .then((res) => {
        setCount(res.data);
      })

  };
  const getDistince = () => {
    const items = localStorage.getItem("name");
    axios
      .get(`${process.env.REACT_APP_API_KEY}/stamp/${items}/${limit}/${offset}`)
      .then((res) => {
   
        setDistince(res.data);
      })
    
  };
  const countEmployees = () => {
    const items = localStorage.getItem("name");
    //เช็คจำนวนพนักงาน
    axios
      .get(`${process.env.REACT_APP_API_KEY}/employees/${items}`)
      .then((res) => {
    
        setEmployess(res.data.count);
      })
     
  };
  return (
    <>
      <HideAppBar />
      <Box sx={{ minWidth: 275 }}>
        <Card
          variant="outlined"
          style={{ border: "1px black", borderRadius: "25px" }}
        >
          <React.Fragment>
            <CardContent>
              <Typography sx={{ fontSize: 48 }} color="text.main" gutterBottom>
                {name}
              </Typography>
              <Typography variant="h5" component="div">
                เวลาทำงาน {set.Inwork} -{set.Outwork}
              </Typography>
              <hr></hr>

              <Chart
                notstamp={Count}
                getDistince={Distince}
                countEmployees={Employess}
              />
              <Tablereport setting={set} />

              <Typography variant="h5"> ยังไม่สแกน {Count.count} คน</Typography>
              <Noattendance />
            </CardContent>
            <CardContent>
              <ReportAccoding />
            </CardContent>
          </React.Fragment>
        </Card>
      </Box>
    </>
  );
}

export default Reportbase;
