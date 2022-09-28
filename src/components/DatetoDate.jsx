import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Menu from "@mui/material/Menu";
import { Button } from "@material-ui/core";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import HideAppBar from "./Report";
import TextField from "@mui/material/TextField";
import moment from "moment";
import "./report.css";

export default function DatetoDate() {
  const [expanded, setExpanded] = React.useState(false);
  const [items, setItems] = React.useState("");
  let { id } = useParams();
  let { date } = useParams();
  const [atten, setnotAtten] = React.useState([].slice(0, 10));
  const [pageNumber, setPageNumber] = React.useState(0);
  const usersPerPage = 10;
  const [set, Setset] = React.useState([]);
  const pagesVisited = pageNumber * usersPerPage;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [open2, setOpen2] = React.useState(false);
  const [searchedVal3, setSearchedVal3] = React.useState("");
  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const getCsv = (e) => {
    setOpen2(open);
    e.preventDefault();
    axios({
      url: `${
        process.env.REACT_APP_API_KEY
      }/ExportlogsDatetodate/${items}/${moment(id, "DD:MM:YYYY").format(
        "DD:MM:YYYY"
      )}/${moment(date, "DD:MM:YYYY").add(1, "days").format("DD:MM:YYYY")}`, //your url
      method: "GET",
      responseType: "blob",
    }).then((response) => {
    
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${id}to${date}.txt`); //or any other extension
      document.body.appendChild(link);
      link.click();
      setOpen2(!open);
    });
  };
  const getExcel = (e) => {
    setOpen2(open);
    e.preventDefault();
    axios({
      url: `${
        process.env.REACT_APP_API_KEY
      }/exportExcelDatetoDate/${items}/${moment(id, "DD:MM:YYYY").format(
        "DD:MM:YYYY"
      )}/${moment(date, "DD:MM:YYYY").add(1, "days").format("DD:MM:YYYY")}`, //your url
      method: "GET",
      responseType: "blob",
    }).then((response) => {
     
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${id}to${date}.XLSX`); //or any other extension
      document.body.appendChild(link);
      link.click();
      setOpen2(!open);
    });
  };

  React.useEffect(() => {
    setOpen2(true);
    const items = localStorage.getItem("name");
    if (items) {
      setItems(items);
    }
    const timer = setTimeout(() => {
      setOpen2(!true);
    }, 2000);

    const fetchData = async () => {
      axios
        .get(
          `${process.env.REACT_APP_API_KEY}/datetodate/${items}/${moment(
            id,
            "DD:MM:YYYY"
          ).format("DD:MM:YYYY")}/${moment(date, "DD:MM:YYYY")
            .add(1, "days")
            .format("DD:MM:YYYY")}`
        )
        .then((res) => {
          setOpen2(!open);
          setnotAtten(res.data.data);
        });
    };
    fetchData();
    setting();
    return () => clearTimeout(timer);
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
    
  };
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const dateElement = atten
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .filter(
      (row) =>
        // note that I've incorporated the searchedVal length check here
        !searchedVal3.length ||
        row.Name.toString()
          .toLowerCase()
          .includes(searchedVal3.toString().toLowerCase())
    )
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
                <Table xs={{  maxWidth: 650  }} aria-label="caption table">
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
                              {moment(res._id, "DD:MM:YYYY")
                .locale("th")
             
                .format("DD/MM/YYYY")}
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
                   

                        return (
                          <TableRow key={row.USERID}>
                            <TableCell
                              align="center"
                              component="th"
                              scope="row"
                            >
                             {moment(res._id, "DD:MM:YYYY")
                .locale("th")
          
                .format("DD/MM/YYYY")}
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
    <>
      <HideAppBar />
      <br></br>
      <div className="margin">
     
        {open2 ? (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open2}
            onClick={handleClose2}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          <></>
        )}

        <Button
          style={{ marginLeft: "auto", marginRight: "55", display: "block" }}
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
        <br></br>
        <TextField
        label="ค้นหาด้วยชื่อ"
        sx={{ width: "100%" }}
        onChange={(e) => setSearchedVal3(e.target.value)}
      />
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
    </>
  );
}
