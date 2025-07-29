import React from "react";
import { useState } from "react";
import { TextField, Button, Snackbar } from "../../node_modules/@mui/material";
import { jsonToXml } from "../utils/xmlUtils";
import { createBookingXML } from "../api/bookingApi";
import XmlPreview from "./XmlPreview";
import { BookingContext } from "../utils/BookingContext";

const BookingForm = ({ onBookingCreated }) => {
  const [formData, setFormData] = useState({
    movieName: "",
    userName: "",
    seatNo: "",
  });
  const [xmlPreview, setXmlPreview] = useState("");
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const { handleBookingData } = React.useContext(BookingContext);

  // Handle form field updates
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Generate XML preview (auto-trimmed)
  const handlePreview = () => {
    const cleanData = Object.fromEntries(
      Object.entries(formData).map(([k, v]) => [k, v.trim()])
    );
    console.log("Generating XML preview with data:", cleanData);
    const xml = jsonToXml(cleanData);
    console.log("Generated XML:", xml);
    setXmlPreview(xml);
  };

  // Submit booking
  const handleSubmit = async () => {
    try {
      const cleanData = Object.fromEntries(
        Object.entries(formData).map(([k, v]) => [k, v.trim()])
      );
      console.log("Submitting booking with data:", cleanData);

      const jsonData = {
        booking: cleanData,
      };
      console.log("Converted JSON data for XML:", jsonData);
      handleBookingData(cleanData); // Update context with new booking data

      setXmlPreview(""); // Clear previous preview
      const xml = jsonToXml(cleanData);
      await createBookingXML(xml);
      setToast({
        open: true,
        message: "Booking successful!",
        severity: "success",
      });
      onBookingCreated(); // Refresh bookings
      setFormData({ movieName: "", userName: "", seatNo: "" });
      setXmlPreview(xml);
    } catch (error) {
      setToast({
        open: true,
        message: "Error creating booking",
        severity: "error",
      });
    }
  };

  return (
    <div
      style={{
        marginTop: "1rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <TextField
          label="Movie Name"
          name="movieName"
          value={formData.movieName}
          onChange={handleChange}
        />
        <TextField
          label="User Name"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
        />
        <TextField
          label="Seat No"
          name="seatNo"
          value={formData.seatNo}
          onChange={handleChange}
        />

        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>

        <Snackbar
          open={toast.open}
          autoHideDuration={3000}
          message={toast.message}
          onClose={() => setToast({ ...toast, open: false })}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Button
          variant="outlined"
          onClick={handlePreview}
          style={{ alignSelf: "flex-start" }}
        >
          Preview XML
        </Button>
        <XmlPreview xmlData={xmlPreview} />
        <p style={{ color: "#888", fontSize: "0.8rem" }}>
          Note: XML is auto-trimmed before submission.
        </p>
      </div>
    </div>
  );
};

export default BookingForm;
