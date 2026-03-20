const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const employeeRoutes = require("./routes/employeeRoutes");
app.use("/employee", employeeRoutes);

app.get("/", (req, res) => {
    res.send("Employee Management Backend Running");
});

module.exports = app;   