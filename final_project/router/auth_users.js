const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  //returns boolean
  const userNameExists = users.some((user) => user.username === username);
  return userNameExists;
};

const authenticatedUser = (username, password) => {
  //returns boolean
  if (!username || !password) {
    return false;
  }
  const validUserName = isValid(username);
  if (!validUserName) {
    return false;
  }
  const validPassword = users.some(
    (user) => user.username === username && user.password === password
  );
  if (!validPassword) {
    return false;
  }
  return true;
};

//only registered users can login
regd_users.post("/login", (req, res) => {
  const userName = req.body.username;
  const password = req.body.password;

  const isValidUser = authenticatedUser(userName, password);
  if (isValidUser) {
    const accessToken = jwt.sign(userName, "fingerprint_customer");
    res.json({ accessToken: accessToken });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  let isbn = req.params.isbn;
  if (typeof isbn === "string") isbn = Number(isbn);

  if (!books[isbn])
    return res.status(404).json({ message: "Book not found for this ISBN" });
  const username = req.user;
  const book = books[isbn];
  const reviews = book.reviews;
  delete reviews[username];
  return res.status(200).json({ message: "Review deleted successfully" });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  let isbn = req.params.isbn;
  if (typeof isbn === "string") isbn = Number(isbn);

  if (!books[isbn])
    return res.status(404).json({ message: "Book not found for this ISBN" });

  const review = req.body.review;
  if (!review) return res.status(400).json({ message: "Review required" });

  const username = req.user;
  console.log(books[isbn]);
  books[isbn]["reviews"][`${username}`] = review;

  return res.status(201).json({ message: review });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
