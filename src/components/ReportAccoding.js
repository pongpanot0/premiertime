import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import moment from "moment";
import Calendar from "./Calendar";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Route, Routes, Link } from "react-router-dom";
export default function ReportAccoding() {
  const style = {
    width: "100%",
    maxWidth: 360,
    bgcolor: "background.paper",
  };

  const [monthReport, setMonthReport] = React.useState([]);
  const [items, setItems] = React.useState("");

  React.useEffect(() => {
    const items = localStorage.getItem("name");
    if (items) {
      setItems(items);
    }
    axios.get(`${process.env.REACT_APP_API_KEY}/monthReport/${items}`).then((res) => {
      setMonthReport(res.data.data);
    });
  }, []);
  const dateElement = monthReport.map((date, i) => {
    if (date === null) {
      return <h1>ยังไม่มีข้อมูล</h1>;
    } else {
      return (
        <List sx={style} component="nav" aria-label="mailbox folders">
          <ListItem
            button
            component={Link}
            to={`/monthreport/${date._id.monthReport}`}
          >
            <ListItemText key={i} primary={date._id.month} />
          </ListItem>
          <Divider />
        </List>
      );
    }
  });
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>ดูสรุปเวลารายเดือน</Typography>
        </AccordionSummary>
        <AccordionDetails>{dateElement}</AccordionDetails>
      </Accordion>
      <hr></hr>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>สรุปรายเดือนตามช่วงเวลา</Typography>
        </AccordionSummary>
        <AccordionDetails></AccordionDetails>
      </Accordion>
    </div>
  );
}
