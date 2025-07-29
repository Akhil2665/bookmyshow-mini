import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Box,
  Button,
  Chip,
} from "@mui/material";
import { BookingContext } from "../utils/BookingContext";

// 🎨 Color tag logic based on movie name
const getGenreColor = (movieName) => {
  const genres = {
    Action: ["Inception", "Tenet", "John Wick"],
    SciFi: ["Interstellar", "Arrival"],
    Drama: ["The Pursuit of Happyness", "The Shawshank Redemption"],
  };

  for (let genre in genres) {
    if (genres[genre].includes(movieName)) {
      return {
        label: genre,
        color:
          genre === "Action" ? "error" : genre === "SciFi" ? "info" : "success",
      };
    }
  }

  return { label: "Unknown", color: "default" };
};

const BookingCardList = () => {
  debugger;
  const { bookings } = React.useContext(BookingContext);
  console.log("BookingCardList rendered with bookings:", bookings);
  const safeBookings = Array.isArray(bookings) ? bookings : [];
  console.log("BookingTable rendered with bookings:", safeBookings);
  return (
    <Box mt={4}>
      <Grid container spacing={3}>
        {safeBookings.length > 0
          ? safeBookings.map((booking, i) => {
              console.log("Rendering booking:", booking);
              if (
                !booking ||
                !booking.movieName ||
                !booking.userName ||
                !booking.seatNo
              ) {
                console.warn("Invalid booking data:", booking);
                return null; // Skip invalid bookings
              }

              const { label, color } = getGenreColor(booking.movie);

              return (
                <>
                  <Grid item xs={12} sm={6} md={4} key={i}>
                    <Card
                      sx={{
                        height: "100%",
                        borderRadius: 3,
                        boxShadow: 3,
                        transition: "transform 0.2s ease",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: 6,
                        },
                      }}
                    >
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          🎬 {booking.movieName}
                        </Typography>
                        <Chip
                          label={label}
                          color={color}
                          size="small"
                          sx={{ mb: 1 }}
                        />
                        <Typography variant="body1">
                          👤 {booking.userName}
                        </Typography>
                        <Typography variant="body2">
                          🪑 Seat No: {booking.seatNo}
                        </Typography>
                      </CardContent>
                      <CardActions
                        sx={{
                          justifyContent: "flex-end",
                          px: 3,
                          py: 1,
                          minWidth: "200px",
                        }}
                      >
                        <Button size="small" color="error" disabled>
                          Delete
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                </>
              );
            })
          : "No bookings available"}
      </Grid>
    </Box>
  );
};

export default BookingCardList;
