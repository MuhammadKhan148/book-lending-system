const express = require("express");
const Book = require("../models/Book");
const jwt = require("jsonwebtoken");

const router = express.Router();

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch {
        res.status(401).json({ error: "Invalid token" });
    }
};

router.post("/lend", authMiddleware, async (req, res) => {
    const { title, author, category, borrower, dueDate } = req.body;

    if (!title || !author || !borrower || !dueDate) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const book = new Book({ title, author, category, borrower, dueDate, userId: req.user.userId });
        await book.save();
        res.json({ message: "Book lent successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error saving book" });
    }
});

router.get("/borrowed", authMiddleware, async (req, res) => {
    const books = await Book.find({ userId: req.user.userId });
    res.json(books);
});

module.exports = router;
