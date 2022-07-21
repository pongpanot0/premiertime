import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
export default function Noattendance() {
  const [atten, setnotAtten] = React.useState([]);
  const [items, setItems] = React.useState("");
  React.useEffect(() => {
    const items = localStorage.getItem("Companyid");
    if (items) {
      setItems(items);
    }
    axios.get(`${process.env.REACT_APP_API_KEY}/notstamp`).then((res) => {
      console.log(res.data.data);
      setnotAtten(res.data.data);
    });
  }, []);

  const AttendanceElement = atten.map((date) => {
    console.log(date);
    if (date === null) {
      return <h1>ยังไม่มีข้อมูล</h1>;
    } else {
      return <h3 key={date._id}>{date.name}</h3>;
    }
  });
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>คลิกแสดงรายชื่อคนไม่สแกนเข้า</Typography>
        </AccordionSummary>
        <AccordionDetails>{AttendanceElement}</AccordionDetails>
      </Accordion>
    </div>
  );
}
