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

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  let isbn = req.params.isbn;
  if (typeof isbn === "string") isbn = Number(isbn);

  if (!Object.keys(books).includes(isbn))
    return res.status(404).json({ message: "Book not found for this ISBN" });

  const review = req.body.review;
  if (!review) return res.status(400).json({ message: "Review required" });

  const username = req.session.username;
  books[isbn][reviews][username] = review;
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
