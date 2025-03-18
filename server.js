require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const bookRoutes = require("./routes/books");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error(err));

app.use("/auth", authRoutes);
app.use("/books", bookRoutes);

// Add root route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Book Lending System API" });
});

// Error handling middleware should be last
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;

module.exports = app;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
