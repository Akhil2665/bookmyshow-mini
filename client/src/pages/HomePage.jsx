import React from "react";
import { useEffect, useState } from "react";
import { fetchBookingsXML } from "../api/bookingApi";
import { xmlToJson } from "../utils/xmlUtils";
import BookingTable from "../components/BookingTable";
import BookingForm from "../components/BookingForm";
import BookingCardList from "../components/BookingCardList";
import { Button } from "@mui/material";

const HomePage = () => {
  const [bookings, setBookings] = useState([
    { movie: "Inception", user: "John", seat: "A1" },
    { movie: "Interstellar", user: "Jane", seat: "B2" },
  ]);

  const loadBookings = async () => {
    try {
      const xmlData = await fetchBookingsXML();
      const json = xmlToJson(xmlData);
      console.log("Bookings JSON:", json);
      // Assuming API returns <bookings><booking>...</booking></bookings>
      const normalized = Array.isArray(json.bookings.booking)
        ? json.bookings.booking
        : [json.bookings.booking];
      setBookings(normalized);
    } catch (error) {
      console.error("Error fetching bookings", error);
    }
  };

  useEffect(() => {
    loadBookings();
    console.log("HomePage mounted, bookings loaded");
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "2rem",
        backgroundColor: "#303030",
        borderRadius: "18px",
        color: "#fff",
      }}
    >
      <h2>Bookings</h2>
      <BookingTable bookings={bookings} />
      <BookingCardList bookings={bookings} />
      <Button
        size="large"
        color="error"
        onClick={() => {
          console.log("Remove all bookings clicked");
          localStorage.setItem("bookingData", JSON.stringify([]));
          window.location.reload();
        }}
      >
        Remove All
      </Button>
      <h3 style={{ marginTop: "2rem" }}>Create Booking</h3>
      <BookingForm onBookingCreated={loadBookings} />
    </div>
  );
};

export default HomePage;
