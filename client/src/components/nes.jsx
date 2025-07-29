// ...existing code...
const BookingTable = () => {
  debugger
  const { bookings } = React.useContext(BookingContext);
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
          {safeBookings.length > 0
            ? safeBookings.map((b, idx) => {
                console.log("Rendering booking:", b);
                if (!b || !b.movie || !b.user || !b.seat) {
                  console.warn("Invalid booking data:", b);
                  return null; // Skip invalid bookings
                }

                return (
                  <TableRow key={idx}>
                    <TableCell>{b.movie}</TableCell>
                    <TableCell>{b.user}</TableCell>
                    <TableCell>{b.seat}</TableCell>
                  </TableRow>
                );
              })
            : "No data available"}
        </TableBody>
      </Table>
    </Paper>
  );
};
// ...existing code...