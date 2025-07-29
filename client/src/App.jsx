import React from "react";
import { useState } from "react";

import { SnackbarProvider } from "notistack";
import { Container, Typography, CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import HomePage from "./pages/HomePage";
import { BookingContext } from "./utils/BookingContext";

const theme = createTheme({
  palette: {
    mode: "dark", // or 'dark'
    primary: {
      main: "#1976d2",
    },
  },
});

console.log("App component initialized");
let localStorageData = JSON.parse(localStorage.getItem("bookingData")) || [
  { movie: "Inception", user: "John", seat: "A1" },
  { movie: "Interstellar", user: "Jane", seat: "B2" },
];
if (localStorageData) {
  console.log("Found booking data in localStorage:", localStorageData);
} else {
  console.log("No booking data found in localStorage");
}
if (localStorageData && !Array.isArray(localStorageData)) {
  console.warn(
    "Invalid booking data format in localStorage, resetting to empty array"
  );
  localStorage.setItem("bookingData", JSON.stringify([]));
  localStorageData = [];
}

function App() {
  const [bookings, setBookings] = useState(localStorageData);

  const handleBookingData = (newData) => {
    console.log("Updating booking data:", newData);
    setBookings((prev) => [...prev, newData]);
    localStorage.setItem("bookingData", JSON.stringify([...bookings, newData]));
    console.log("Booking data updated and saved to localStorage");
  };

  return (
    <BookingContext.Provider value={{ bookings, handleBookingData }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider maxSnack={3}>
          <Container
            maxWidth="md"
            sx={{
              mt: 4,
            }}
          >
            <Typography variant="h4" align="center" gutterBottom>
              🎬 BookMyShow Mini
            </Typography>

            <HomePage />
          </Container>
        </SnackbarProvider>
      </ThemeProvider>
    </BookingContext.Provider>
  );
}

export default App;
