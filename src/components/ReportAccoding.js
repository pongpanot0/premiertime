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
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import "moment/locale/th";
import Paper from "@mui/material/Paper";
import { Route, Routes, Link } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
export default function ReportAccoding() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    width: "100%",
    color: theme.palette.text.secondary,
  }));
  const style = {
    width: "100%",
    bgcolor: "background.paper",
  };

  const [monthReport, setMonthReport] = React.useState([]);
  const [items, setItems] = React.useState("");
  const [value, setValue] = React.useState(new Date());
  const [value2, setValue2] = React.useState(new Date());

  const handleChange2 = (newValue2) => {
    setValue2(newValue2);
  };
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  React.useEffect(() => {
    const items = localStorage.getItem("name");
    if (items) {
      setItems(items);
    }
    axios
      .get(`${process.env.REACT_APP_API_KEY}/monthReport/${items}`)
      .then((res) => {
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
            <ListItemText
              key={i}
              primary={moment(date._id.month, "MM:YYYY")
                .locale("th")
                .add(543, "year")
                .format("MMMM yyyy")}
            />
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
        <AccordionDetails>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={2}>
              <Item>
                {" "}
                <DatePicker
                  label="วันที่เริ่มต้น"
                  inputFormat="dd/MM/yyyy"
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                  fullWidth
                />
              </Item>
              <Item>
                <DatePicker
                  label="วันที่สิ้นสุด"
                  inputFormat="dd/MM/yyyy"
                  value={value2}
                  onChange={handleChange2}
                  renderInput={(params) => <TextField {...params} />}
                  fullWidth
                />
              </Item>
              <Item>
                <Button
                  variant="contained"
                  style={{ width: "100%", textAlign: "center", height: "70px" }}
                  size="large"
                  component={Link}
                  color="primary"
                  to={`/datetodate/${moment(value, "DDMMYYYY").format(
                    "DDMMYYYY"
                  )}/${moment(value2, "DDMMYYYY").format("DDMMYYYY")}`}
                >
                  ดูรายงาน
                </Button>
              </Item>
            </Stack>
          </LocalizationProvider>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
