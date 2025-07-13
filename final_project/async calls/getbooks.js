const axios = require("axios");

async function getbooks() {
  try {
    const response = await axios.get("http://localhost:5000");
    console.log(response.data); // response.data;
  } catch (error) {
    return null;
  }
}

getbooks();
