const axios = require("axios");

async function getbookbytitle(title) {
  try {
    const response = await axios.get(`http://localhost:5000/title/${title}`);
    console.log(response.data); // response.data;
  } catch (error) {
    return null;
  }
}

getbookbytitle("Things Fall Apart");
