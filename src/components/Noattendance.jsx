import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import ReactPaginate from "react-paginate";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
const style = {
  width: "100%",
  bgcolor: "background.paper",
};
export default function Noattendance() {
  const [atten, setnotAtten] = React.useState([].slice(0, 10));
  const [pageNumber, setPageNumber] = React.useState(0);
  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;
  //40 > 50

  const displayUsers = atten
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((date, i) => {
      if (date === null) {
        return <h1>ยังไม่มีข้อมูล</h1>;
      } else {
        return (
          <div>
            <List sx={style} component="nav" aria-label="mailbox folders">
              <ListItem button>
                <ListItemText
                  key={i}
                  primary={'แผนก  '+date.Depname}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        ชื่อ : {date.Name}
                      </Typography>
                      <br></br> รหัสพนักงาน : {date.Enrollnumber}
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>
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
        console.log(items);
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
