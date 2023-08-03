const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

let data = [];

const loader = (data) => {
  const filePath = "./data.json";

  fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error("Error saving data:", err);
    } else {
      console.log("Data saved successfully.");
    }
  });
};

const scriper = async () => {
  const url = "https://unsplash.com/fr/s/photos/trucks";

  const response = await axios.get(url);

  const $ = cheerio.load(response.data);
  const images = $("figure").find("img");

  for (let image of images) {
    data.push({
      imageUrl: image.attribs["src"],
      coption: image.attribs["alt"],
    });
  }

  loader(data);
};

scriper();
