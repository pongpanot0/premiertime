import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button } from '@mui/material';
import addWeeks from 'date-fns/addWeeks';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
/* import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDateFns } from '@mui/x-date-pickers-pro/AdapterDateFns';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { DateRange } from '@mui/x-date-picker'; */
import Box from '@mui/material/Box';

/* function getWeeksAfter(date: Date | null, amount: number) {
  return date ? addWeeks(date, amount) : undefined;
} */
export default function ReportAccoding() {
  /* const [value, setValue] = React.useState<DateRange<Date>>([null, null]); */
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
   {/*      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        disablePast
        value={value}
        maxDate={getWeeksAfter(value[0], 4)}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} />
          </React.Fragment>
        )}
      />
    </LocalizationProvider> */}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}