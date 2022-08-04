import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";

import TableSortLabel from "@material-ui/core/TableSortLabel";
import TextField from "@mui/material/TextField";
import axios from "axios";

export default function Tablereport() {
  const [number, setNumber] = useState([]);
  const [searchedVal, setSearchedVal] = useState("");
  const [CategoryList, setCategoryList] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [items, setItems] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [offset, setOffset] = React.useState(0);
  const [searchedVal3, setSearchedVal3] = useState("");
  useEffect(() => {
    const items = localStorage.getItem("name");
    if (items) {
      setItems(items);
      axios
        .get(
          `${process.env.REACT_APP_API_KEY}/stamp/${items}/${rowsPerPage}/${offset}`
        )
        .then((res) => {
          console.log(res.data.data);
          setCategoryList(res.data.data);
          setNumber(parseInt(res.data.count3));
        })
        .catch((err) => console.log(err));
    }
  }, [rowsPerPage, items, offset]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setOffset(5 + page * offset);
    console.log(offset);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.

  const [orderDirection, setOrderDirection] = React.useState("asc");
  const [orderDirection2, setOrderDirection2] = React.useState("asc");
  const [orderDirection3, setOrderDirection3] = React.useState("asc");
  const [orderDirection4, setOrderDirection4] = React.useState("asc");
  const [orderDirection5, setOrderDirection5] = React.useState("asc");
  const sortArray5 = (arr, orderBy) => {
    console.log(arr);
    switch (orderBy) {
      case "asc":
      default:
        return CategoryList.sort((a, b) =>
          a.last.time > b.last.time ? 1 : b.last.time > a.last.time ? -1 : 0
        );
      case "desc":
        return CategoryList.sort((a, b) =>
          a.last.time < b.last.time ? 1 : b.last.time < a.last.time ? -1 : 0
        );
    }
  };

  const handleSortRequest5 = () => {
    setCategoryList(sortArray5(CategoryList, orderDirection5));
    setOrderDirection5(orderDirection5 === "asc" ? "desc" : "asc");
  };
  const sortArray4 = (arr, orderBy) => {
    console.log(arr);
    switch (orderBy) {
      case "asc":
      default:
        return CategoryList.sort((a, b) =>
          a.start.time > b.start ? 1 : b.start.time > a.start.time ? -1 : 0
        );
      case "desc":
        return CategoryList.sort((a, b) =>
          a.start.time < b.start.time ? 1 : b.start.time < a.start.time ? -1 : 0
        );
    }
  };

  const handleSortRequest4 = () => {
    setCategoryList(sortArray4(CategoryList, orderDirection4));
    setOrderDirection4(orderDirection4 === "asc" ? "desc" : "asc");
  };
  const sortArray3 = (arr, orderBy) => {
    console.log(arr);
    switch (orderBy) {
      case "asc":
      default:
        return CategoryList.sort((a, b) =>
          a.Depname > b.Depname ? 1 : b.Depname > a.Depname ? -1 : 0
        );
      case "desc":
        return CategoryList.sort((a, b) =>
          a.Depname < b.Depname ? 1 : b.Depname < a.Depname ? -1 : 0
        );
    }
  };

  const handleSortRequest3 = () => {
    setCategoryList(sortArray3(CategoryList, orderDirection3));
    setOrderDirection3(orderDirection3 === "asc" ? "desc" : "asc");
  };
  const sortArray2 = (arr, orderBy) => {
    console.log(arr);
    switch (orderBy) {
      case "asc":
      default:
        return CategoryList.sort((a, b) =>
          a.Name > b.Name ? 1 : b.Name > a.Name ? -1 : 0
        );
      case "desc":
        return CategoryList.sort((a, b) =>
          a.Name < b.Name ? 1 : b.Name < a.Name ? -1 : 0
        );
    }
  };

  const handleSortRequest2 = () => {
    setCategoryList(sortArray2(CategoryList, orderDirection2));
    setOrderDirection2(orderDirection2 === "asc" ? "desc" : "asc");
  };
  const sortArray = (arr, orderBy) => {
    console.log(arr);
    switch (orderBy) {
      case "asc":
      default:
        return CategoryList.sort((a, b) =>
          a.Enrollnumber > b.Enrollnumber
            ? 1
            : b.Enrollnumber > a.Enrollnumber
            ? -1
            : 0
        );
      case "desc":
        return CategoryList.sort((a, b) =>
          a.Enrollnumber < b.Enrollnumber
            ? 1
            : b.Enrollnumber < a.Enrollnumber
            ? -1
            : 0
        );
    }
  };

  const handleSortRequest = () => {
    setCategoryList(sortArray(CategoryList, orderDirection));
    setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
  };
  const dateElement = CategoryList?.filter(
    (row) =>
      // note that I've incorporated the searchedVal length check here
      !searchedVal3.length ||
      row.Name.toString()
        .toLowerCase()
        .includes(searchedVal3.toString().toLowerCase())
  ).map((row, index) => {
    console.log(row);
    const current = "17:30".replace(":", "");
    const time = "17:30".replace(":", "");
    if (row.start === undefined) {
      return (
        <TableBody>
          <TableRow align="center" key={row.index}>
            <TableCell align="center">{row.Enrollnumber}</TableCell>
            <TableCell align="center">{row.Depname}</TableCell>
            <TableCell align="center">{row.Name}</TableCell>

            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableBody>
      );
    }
    if (row.start !== undefined) {
      return (
        <TableBody>
          <TableRow align="center" key={row.index}>
            <TableCell align="center">{row.Enrollnumber}</TableCell>
            <TableCell align="center">{row.Depname}</TableCell>
            <TableCell align="center">{row.Name}</TableCell>

            <TableCell align="center">{row.start.time}</TableCell>
            <TableCell align="center">{row.last.time}</TableCell>
          </TableRow>
        </TableBody>
      );
    }
  });

  return (
    <>
      <TextField
        label="ค้นหาด้วยชื่อ"
        sx={{ width: "100%" }}
        onChange={(e) => setSearchedVal3(e.target.value)}
      />

      <TableContainer component={Paper}>
        <Table xs={{ maxWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" onClick={handleSortRequest}>
                {" "}
                <TableSortLabel active={true} direction={orderDirection}>
                  รหัส
                </TableSortLabel>
              </TableCell>

              <TableCell align="center" onClick={handleSortRequest3}>
                <TableSortLabel active={true} direction={orderDirection3}>
                  แผนก
                </TableSortLabel>
              </TableCell>
              <TableCell align="center" onClick={handleSortRequest2}>
                {" "}
                <TableSortLabel active={true} direction={orderDirection2}>
                  ชิ่อ
                </TableSortLabel>
              </TableCell>

              <TableCell align="center" onClick={handleSortRequest4}>
                <TableSortLabel active={true} direction={orderDirection4}>
                  เข้า
                </TableSortLabel>
              </TableCell>
              <TableCell align="center" onClick={handleSortRequest5}>
                <TableSortLabel active={true} direction={orderDirection5}>
                  ออก
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          {dateElement}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={number}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
