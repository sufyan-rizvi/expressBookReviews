const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  const userName = req.body.username;
  const password = req.body.password;
  if (!userName || !password)
    return res.status(400).json({ message: "Username and password required" });
  const userNameExists = isValid(userName);
  if (userNameExists)
    return res.status(400).json({ message: "Username already exists" });

  users.push({ username: userName, password: password });
  return res.status(201).json({ message: "User successfully registered" });
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  const data = Object.values(books);
  if (data.length === 0)
    return res.status(404).json({ message: "No books found" });
  return res.status(200).json(data);
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;

  if (!books[isbn]) {
    return res
      .sendStatus(404)
      .json({ message: "Book not found for this ISBN" });
  }
  const data = books[isbn];
  return res.status(200).json(data);
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  //Write your code here
  const booksWithoutId = Object.values(books);
  const author = req.params.author;

  const data = booksWithoutId.filter((book) => {
    return book.author.toLowerCase() === author.toLowerCase();
  });
  if (data.length === 0)
    return res.status(404).json({ message: "Book not found for this author" });
  return res.status(200).json(data);
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  //Write your code here
  const title = req.params.title;
  const booksWithoutId = Object.values(books);
  const data = booksWithoutId.filter((book) => {
    return book.title.toLowerCase() === title.toLowerCase();
  });
  if (data.length === 0)
    return res.status(404).json({ message: "Book not found with this title" });
  return res.status(200).json(data);
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  let isbn = req.params.isbn;
  if (typeof isbn === "string") isbn = Number(isbn);

  if (!books[isbn])
    return res.status(404).json({ message: "Review not found for this ISBN" });

  const data = books[isbn];
  console.log(data);
  const reviews = data["reviews"];
  return res.status(200).json(reviews);
});

module.exports.general = public_users;
