const axios = require("axios");

async function getbookbyauthor(author) {
  try {
    const response = await axios.get(`http://localhost:5000/author/${author}`);
    console.log(response.data); // response.data;
  } catch (error) {
    return null;
  }
}

getbookbyauthor("Chinua Achebe");
