const Joi = require("joi");
const mongoose = require("mongoose");
const Book = mongoose.model(
  "Book",
  new mongoose.Schema({
    _id: {
      type: Number
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255
    },
    isbn: {
      type: String,
      trim: true,
      minlength: 1
    },
    pageCount: {
      type: Number,
      min: 1
    },
    publishedDate: {
      type: Date
    },
    thumbnailUrl: {
      type: String
    },
    authors: {
      type: Array
    },
    categories: {
      type: Array
    },
    shortDescription: {
      type: String
    },
    longDescription: {
      type: String
    },
    status: {
      type: String
    },
    price: {
      type: Number,
      min: 1
    },
    rate: {
      type: Number,
      min: 1,
      max: 10
    }
  })
);

function validateMovie(book) {
  schema = {
    title: Joi.string()
      .required()
      .label("Title"),
    isbn: Joi.string().required(),
    pageCount: Joi.number().required(),
    price: Joi.number()
      .required()
      .min(1),
    rate: Joi.number()
      .required()
      .min(1)
      .max(10),
    authors: Joi.string().allow(""),
    categories: Joi.string().allow(""),
    thumbnailUrl: Joi.string().allow(""),
    longDescription: Joi.string().allow(""),
    shortDescription: Joi.string().allow(""),
    publishedDate: Joi.optional()
  };

  return Joi.validate(book, schema);
}

exports.Book = Book;
exports.validate = validateMovie;
