import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Noattendance() {
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
        <AccordionDetails>
          <Typography>
           1.นายพงศ์ปณต สมัครการ
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}