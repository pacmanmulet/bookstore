const { Book, validate } = require("../models/book");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const books = await Book.find().sort("title");
  res.send(books);
});

router.post("/", [auth], async (req, res) => {
  const data = req.body;
  const { error } = validate(data);
  if (error) return res.status(400).send(error.details[0].message);
  data.authors = data.authors.split(",");
  data.categories = data.categories.split(",");
  data.authors.forEach(author => (author = author.trim()));
  data.categories.forEach(category => (category = category.trim()));
  const book = new Book({
    _id: Date.now(),
    ...data
  });
  await book.save();

  res.send(book);
});

router.put("/:id", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const book = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title
    },
    { new: true }
  );

  if (!book)
    return res.status(404).send("The book with the given ID was not found.");

  res.send(book);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const book = await Book.findByIdAndRemove(req.params.id);

  if (!book)
    return res.status(404).send("The book with the given ID was not found.");

  res.send(book);
});

router.get("/:id", async (req, res) => {
  const book = await Book.findById(req.params.id).select("-__v");
  if (!book)
    return res.status(404).send("The book with the given ID was not found.");

  res.send(book);
});

module.exports = router;
