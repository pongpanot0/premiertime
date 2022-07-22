import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { useParams } from "react-router-dom";
export default function MonthReport() {
  const [expanded, setExpanded] = React.useState(false);
  const [atten, setnotAtten] = React.useState([]);
  const [items, setItems] = React.useState("");
  let { id } = useParams();

  React.useEffect(() => {
    const items = localStorage.getItem("Companyid");
    if (items) {
      setItems(items);
    }
    axios
      .get(`${process.env.REACT_APP_API_KEY}/exportdate/${id}`)
      .then((res) => {
        console.log(res.data.data);
        setnotAtten(res.data.data);
      });
  }, []);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const dateElement = atten.map((row, i) => {
    console.log(row);
    if (row.log.length === 0) {
      return (
        <Accordion expanded={expanded === i} onChange={handleChange(i)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              {row._id.name}
            </Typography>

            <Typography sx={{ color: "text.secondary" }}>
              I am an accordion
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>ไม่มีข้อมูล</Typography>
          </AccordionDetails>
        </Accordion>
      );
    }
    if (row.log.length !== 0) {
      console.log(row);
      return (
        <Accordion expanded={expanded === i} onChange={handleChange(i)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              {row._id.name}
            </Typography>

            <Typography sx={{ color: "text.secondary" }}>
              I am an accordion
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography key={row.log._id}>
              {" "}
              {row.log.map((res) => {
                return  <p>{res.date}</p>
  
              })}
            </Typography>
          </AccordionDetails>
        </Accordion>
      );
    }
  });
  return <div>{dateElement}</div>;
}
