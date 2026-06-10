const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Home Page");
});

app.get("/about", (req, res) => {
    res.send("About Page");
});

app.get("/projects", (req, res) => {
    res.send("Projects Page");
});

app.get("/contact", (req, res) => {
    res.send("Contact Page");
});

// Error handling
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});