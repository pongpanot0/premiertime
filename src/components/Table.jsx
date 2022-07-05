import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('1234', 'พงศ์ปณต สมัครการ', '08.00', '17.00','ย้อนหลัง'),
  createData('1234', 'พงศ์ปณต สมัครการ', '08.00', '17.00','ย้อนหลัง'),
  createData('1234', 'พงศ์ปณต สมัครการ', '08.00', '17.00','ย้อนหลัง'),
  createData('1234', 'พงศ์ปณต สมัครการ', '08.00', '17.00','ย้อนหลัง'),
  createData('1234', 'พงศ์ปณต สมัครการ', '08.00', '17.00','ย้อนหลัง'),
];

export default function Tablereport() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align='center'>รหัส</TableCell>
            <TableCell align='center'>ชื่อ</TableCell>
            <TableCell align='center' >เข้า</TableCell>
            <TableCell align='center'>ออก</TableCell>
            <TableCell align='center' style={{paddingleft:'5px'}}>ดูประวัติย้อนหลัง</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align='center' component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell  align='center'>{row.calories}</TableCell>
              <TableCell align='center'>{row.fat}</TableCell>
              <TableCell align='center'>{row.carbs}</TableCell>
              <TableCell align='center'>{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
