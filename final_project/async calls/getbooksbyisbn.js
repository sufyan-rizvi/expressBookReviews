const axios = require("axios");

async function getbookbyisbn(isbn) {
  try {
    const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
    console.log(response.data); // response.data;
  } catch (error) {
    return null;
  }
}

getbookbyisbn(1);
