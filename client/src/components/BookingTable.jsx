import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "../../node_modules/@mui/material";
import { BookingContext } from "../utils/BookingContext";

const BookingTable = () => {
  debugger;
  const { bookings } = React.useContext(BookingContext);
  console.log("BookingTable rendered with bookings:", bookings);
  const safeBookings = Array.isArray(bookings) ? bookings : [];
  console.log("BookingTable rendered with bookings:", safeBookings);
  return (
    <Paper>
      <Table
        style={{ minWidth: 650, backgroundColor: "#424242", color: "#fff" }}
      >
        <TableHead>
          <TableRow>
            <TableCell>Movie</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Seat</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.length > 0
            ? bookings.map((b, idx) => {
                console.log("Rendering booking:", b);
                if (!b || !b.movieName || !b.userName || !b.seatNo) {
                  console.warn("Invalid booking data:", b);
                  return null; // Skip invalid bookings
                }

                return (
                  <TableRow key={idx}>
                    <TableCell>{b.movieName}</TableCell>
                    <TableCell>{b.userName}</TableCell>
                    <TableCell>{b.seatNo}</TableCell>
                  </TableRow>
                );
              })
            : "No data available"}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default BookingTable;
