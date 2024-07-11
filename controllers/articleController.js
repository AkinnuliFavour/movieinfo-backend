const axios = require("axios");

// and we need jsdom and Readability to parse the article HTML
const { JSDOM } = require("jsdom");
const { Readability } = require("@mozilla/readability");

// First lets get some search data from News API

// Build the URL we are going request. This will get articles related to Apple and sort them newest first
let url =
  "https://newsapi.org/v2/everything?" +
  "q=movies&" +
  "sortBy=publishedAt&" +
  "apiKey=75e98f479be948cebad68ba962e010fe";

const fetchArticle = (req, res) => {
  console.log(req.query);
  const url = req.query.url;
  // Make the request with axios' get() function

  // ...and download the HTML for it, again with axios
  axios.get(url).then(function (r2) {
    // We now have the article HTML, but before we can use Readability to locate the article content we need jsdom to convert it into a DOM object
    let dom = new JSDOM(r2.data, {
      url,
    });

    // now pass the DOM document into readability to parse
    let article = new Readability(dom.window.document).parse();

    // Done! The article content is in the textContent property

    // Send article
    res.json(article.textContent);
  });
};

module.exports = { fetchArticle };
