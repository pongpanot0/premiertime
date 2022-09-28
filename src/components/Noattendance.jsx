import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import ReactPaginate from "react-paginate";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
export default function Noattendance() {
  const [atten, setnotAtten] = React.useState([].slice(0, 10));
  const [pageNumber, setPageNumber] = React.useState(0);
  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;
  //40 > 50
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const displayUsers = atten
    .slice(pagesVisited, pagesVisited + usersPerPage)

    .map((date, i, { Depname, Depcode }) => {
    
      if (date === null) {
        return <h1>ยังไม่มีข้อมูล</h1>;
      } else {
        return (
          <div>
            <Accordion
              expanded={expanded === date.Depcode}
              onChange={handleChange(date.Depcode)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography variant="h6" sx={{ width: "100%" }}>
                  <CorporateFareIcon /> {date.Depcode}
                </Typography>
              </AccordionSummary>
              {date.Detail.map((res) => {
                return (
                  <AccordionDetails>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="subtitle1"
                      color="text.primary"
                    >
                      คุณ : {res.Name} (รหัสพนักงาน : {res.Enrollnumber})
                    </Typography>
                  </AccordionDetails>
                );
              })}
              <Typography  sx={{ color: "text.secondary" ,float:'right',paddingRight:5}}>
                จำนวน {date.Detail.length} คน
              </Typography>
            </Accordion>

            <br></br>
          </div>
        );
      }
    });
  const pageCount = Math.ceil(atten.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const [items, setItems] = React.useState("");
  React.useEffect(() => {
    const items = localStorage.getItem("name");
    if (items) {
      setItems(items);
    }
    axios
      .get(`${process.env.REACT_APP_API_KEY}/notstamp/${items}`)
      .then((res) => {
        setnotAtten(res.data.data);
      });
  }, []);

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
        <AccordionDetails>{displayUsers}</AccordionDetails>
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
      </Accordion>
    </div>
  );
}
