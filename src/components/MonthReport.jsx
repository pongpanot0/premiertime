import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function MonthReport() {
  const [expanded, setExpanded] = React.useState(false);
  const [items, setItems] = React.useState("");
  let { id } = useParams();
  const [atten, setnotAtten] = React.useState([].slice(0, 10));
  const [pageNumber, setPageNumber] = React.useState(0);
  const usersPerPage = 10;
  const [set, Setset] = React.useState([]);
  const pagesVisited = pageNumber * usersPerPage;
  React.useEffect(() => {
    const items = localStorage.getItem("name");
    if (items) {
      setItems(items);
    }
    axios
      .get(`${process.env.REACT_APP_API_KEY}/exportdate/${id}/${items}`)
      .then((res) => {
        setnotAtten(res.data.data);
        console.log(res.data);
      });
    setting();
  }, []);
  const pageCount = Math.ceil(atten.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const setting = () => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/setting/${items}`)
      .then((res) => {
        Setset(res.data.data[0]);
      })
      .catch((err) => console.log(err));
  };
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const dateElement = atten
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((row, i) => {
      console.log(row);
      if (row.start === undefined) {
        return (
          <Accordion expanded={expanded === i} onChange={handleChange(i)}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography key={row.USERID} sx={{ width: "50%", flexShrink: 0 }}>
                {row.Name}
              </Typography>

              <Typography sx={{ color: "text.secondary" }}>
                แผนก {row.Depname}
              </Typography>
            </AccordionSummary>
            <AccordionDetails></AccordionDetails>
          </Accordion>
        );
      }
      if (row.start !== undefined) {
        const sum = row.start[0].map(datum => datum.late).reduce((a, b) => a + b)
        const total=(row.start.reduce((total,currentItem) =>  total = total + currentItem.late , 0 ));
        console.log(sum)
        console.log(row.start);
        return (
          <Accordion expanded={expanded === i} onChange={handleChange(i)}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography key={row.USERID} sx={{ width: "50%", flexShrink: 0 }}>
                {row.Name}
              </Typography>

              <Typography sx={{ color: "text.secondary" }}>
                แผนก {row.Depname}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="caption table">
                  
                  <caption>
                    จำนวนการแสกนนิ้ว : {row.scan} วัน สายรวมกันทั้งหมด {sum} นาที
                  </caption>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">วันที่</TableCell>
                      <TableCell align="center">เวลาที่แสกนเข้า</TableCell>
                      <TableCell align="center">เวลาที่แสกนออก</TableCell>
                      <TableCell align="center">เข้างานสาย</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.start[0].map((res) => {
                      if(res.late === null){
                        return (
                          <TableRow key={row.USERID}>
                            <TableCell align="center" component="th" scope="row">
                              {res._id}
                            </TableCell>
                            <TableCell align="center" component="th" scope="row">
                              {res.start}
                            </TableCell>
                            <TableCell align="center" component="th" scope="row">
                              {res.last}
                            </TableCell>
                            <TableCell align="center" component="th" scope="row">
                              
                            </TableCell>
                          </TableRow>
                        );
                      }
                      if(res.late !== null){
                        console.log(res)

                        return (
                          <TableRow key={row.USERID}>
                            <TableCell align="center" component="th" scope="row">
                              {res._id}
                            </TableCell>
                            <TableCell align="center" component="th" scope="row">
                              {res.start}
                            </TableCell>
                            <TableCell align="center" component="th" scope="row">
                              {res.last}
                            </TableCell>
                            <TableCell align="center" component="th" scope="row">
                              {res.late} นาที
                            </TableCell>
                          </TableRow>
                        );
                      }
                      console.log(res);
                
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        );
      }
    });
  return (
    <div className="margin">
      {dateElement}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttns"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
  );
}
