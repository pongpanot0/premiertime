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
import Menu from "@mui/material/Menu";
import { Button } from "@material-ui/core";
import MenuItem from "@mui/material/MenuItem";
export default function MonthReport() {
  const [expanded, setExpanded] = React.useState(false);
  const [items, setItems] = React.useState("");
  let { id } = useParams();
  const [atten, setnotAtten] = React.useState([].slice(0, 10));
  const [pageNumber, setPageNumber] = React.useState(0);
  const usersPerPage = 10;
  const [set, Setset] = React.useState([]);
  const pagesVisited = pageNumber * usersPerPage;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const getCsv = (e) => {
    e.preventDefault();
    axios({
      url: `${process.env.REACT_APP_API_KEY}/Exportlogs/${items}/${id}`, //your url
      method: "GET",
      responseType: "blob", // important
    }).then((response) => {
      console.log(response);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${id}.txt`); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
  };
  const getExcel = (e) => {
    e.preventDefault();
    axios({
      url: `${process.env.REACT_APP_API_KEY}/exportExcel/${items}/${id}`, //your url
      method: "GET",
      responseType: "blob", // important
    }).then((response) => {
      console.log(response);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${id}.xlsx`); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
  };
  React.useEffect(() => {
    const items = localStorage.getItem("name");
    if (items) {
      setItems(items);
    }
    axios
      .get(`${process.env.REACT_APP_API_KEY}/exportdate/${id}/${items}`)
      .then((res) => {
        setnotAtten(res.data.data);
      });
    setting();
  }, []);
  const pageCount = Math.ceil(atten.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const setting = () => {
    const items = localStorage.getItem("name");
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
        const sum = row.start[0]
          .map((datum) => datum.late)
          .reduce((a, b) => a + b);
        const total = row.start.reduce(
          (total, currentItem) => (total = total + currentItem.late),
          0
        );
        console.log(sum);
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
                    จำนวนการแสกนนิ้ว : {row.scan} วัน สายรวมกันทั้งหมด {sum}{" "}
                    นาที
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
                      if (res.late === null) {
                        return (
                          <TableRow key={row.USERID}>
                            <TableCell
                              align="center"
                              component="th"
                              scope="row"
                            >
                              {res._id}
                            </TableCell>
                            <TableCell
                              align="center"
                              component="th"
                              scope="row"
                            >
                              {res.start}
                            </TableCell>
                            <TableCell
                              align="center"
                              component="th"
                              scope="row"
                            >
                              {res.last}
                            </TableCell>
                            <TableCell
                              align="center"
                              component="th"
                              scope="row"
                            ></TableCell>
                          </TableRow>
                        );
                      }
                      if (res.late !== null) {
                        console.log(res);

                        return (
                          <TableRow key={row.USERID}>
                            <TableCell
                              align="center"
                              component="th"
                              scope="row"
                            >
                              {res._id}
                            </TableCell>
                            <TableCell
                              align="center"
                              component="th"
                              scope="row"
                            >
                              {res.start}
                            </TableCell>
                            <TableCell
                              align="center"
                              component="th"
                              scope="row"
                            >
                              {res.last}
                            </TableCell>
                            <TableCell
                              align="center"
                              component="th"
                              scope="row"
                            >
                              {res.late} นาที
                            </TableCell>
                          </TableRow>
                        );
                      }
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
      <Button
        variant="contained"
        color="primary"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        ออกรายงาน
      </Button>
      <Stack spacing={2}>
        <Menu
          direction="row"
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <Button onClick={getCsv}>ออกรายงาน CSV</Button>
          <br></br>
          <Button onClick={getExcel}>ออกรายงาน Excel</Button>
        </Menu>
      </Stack>
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
