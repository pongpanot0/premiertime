import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button } from '@mui/material';
import {Link } from 'react-router-dom'

export default function ReportAccoding() {
  const [value, setValue] = React.useState([null, null]);
  return (
    <div>
  <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>ดูข้อมูลเข้าออกย้อนหลัง</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <Button>4/7/2022</Button> 
          <br></br>
          <Button>4/7/2022</Button>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <hr></hr>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>ดูสรุปเวลารายเดือน</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Typography>
        <Link to="/monthreport">
          <Button>มกราคม</Button>
          </Link>
          <br></br>
          <Link to="/monthreport">
          <Button>กุมภาพันธ์</Button>
          </Link>
          
          </Typography>
        </AccordionDetails>
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

        </AccordionDetails>
      </Accordion>
    </div>
  );
}