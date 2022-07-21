import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TablePagination from "@mui/material/TablePagination";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import axios from "axios";
export default function Tablereport() {
  const [value, setValue] = useState(new Date().toLocaleDateString("en-US"));
  const [date, setDate] = useState(new Date().toLocaleDateString("en-US"));

  const handleChange = (newValue) => {
    setDate(newValue);
  };
  console.log(date);
  const [CategoryList, setCategoryList] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/stamp`)
      .then((res) => {
        console.log(res.data.data);
        setCategoryList(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const [searchedVal, setSearchedVal] = useState("");
  const [searchedVal2, setSearchedVal2] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <br></br>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={3}>
          <DesktopDatePicker
            label="ข้อมูล ณ วันที่"
            inputFormat="dd/MM/yyyy"
            value={date}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>
      <br></br>

      <TextField
        label="ค้นหาด้วยชื่อ"
        sx={{ width: "100%" }}
        onChange={(e) => setSearchedVal(e.target.value)}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">รหัส</TableCell>
              <TableCell align="center">ชื่อ</TableCell>
              <TableCell align="center">แผนก</TableCell>
              <TableCell align="center">เข้า</TableCell>
              <TableCell align="center">ออก</TableCell>
              <TableCell align="center" style={{ paddingleft: "5px" }}>
                ดูประวัติย้อนหลัง
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {CategoryList.map((row) => (
              <TableRow align="center" key={row.employess._id}>
                <TableCell align="center">
                  {row.employess[0].anSEnrollNumber}
                </TableCell>
                <TableCell align="center">{row.employess[0].name}</TableCell>
                <TableCell align="center">
                  {row.employess[0].organize}
                </TableCell>
                <TableCell align="center">{row.start.time}</TableCell>
                <TableCell align="center">{row.last.time}</TableCell>
                <TableCell align="center">ดูประวัติย้อนหลัง</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={CategoryList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
