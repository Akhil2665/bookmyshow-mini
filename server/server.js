const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.text({ type: "application/xml" }));

let bookings = [
  { movie: "Inception", user: "John", seat: "A1" },
  { movie: "Interstellar", user: "Jane", seat: "B2" },
];

app.get("/bookings", (req, res) => {
  const xmlData = `
    <bookings>
      ${bookings
        .map(
          (b) => `
        <booking>
          <movie>${b.movie}</movie>
          <user>${b.user}</user>
          <seat>${b.seat}</seat>
        </booking>`
        )
        .join("")}
    </bookings>
  `;
  res.set("Content-Type", "application/xml");
  res.send(xmlData.trim());
});

app.post("/bookings", (req, res) => {
  console.log("Received XML:", req.body);
  res.status(200).send("<message>Booking received</message>");
});

app.listen(5000, () =>
  console.log("Mock XML API running on http://localhost:5000")
);
