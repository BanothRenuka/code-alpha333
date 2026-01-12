const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Store latest sensor values
let sensorData = {
    temperature: "--",
    humidity: "--"
};

// API: Receive sensor data (from Arduino / simulation)
app.post("/update-sensor", (req, res) => {
    const { temperature, humidity } = req.body;

    if (temperature === undefined || humidity === undefined) {
        return res.status(400).json({ message: "Invalid sensor data" });
    }

    sensorData.temperature = temperature;
    sensorData.humidity = humidity;

    console.log("Sensor Data Updated:");
    console.log("Temperature:", temperature, "°C");
    console.log("Humidity:", humidity, "%");

    res.json({ message: "Sensor data received successfully" });
});

// API: Send sensor data to frontend
app.get("/sensor-data", (req, res) => {
    res.json(sensorData);
});

// Server start
app.listen(PORT, () => {
    console.log(`IoT Backend running at http://localhost:${PORT}`);
});
