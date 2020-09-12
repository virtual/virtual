let fs = require('fs');
let Parser = require('rss-parser'); 

// Reference https://github.com/harrisgeo88/harrisgeo88/
// For more magic
const fetchFeed = async () => {
  let parser = new Parser();
    let feed = await parser.parseURL('https://www.satinflame.com/index.xml');
    return feed;
}

const updateFeed = async () => {

  try {
    // Get original content
    const currentReadme = fs.readFileSync("./README.md", "utf8");
    const articlesTitle = "### ✒️ Recent articles:";

    // Find where articles are and split off old ones
    let updatedReadme = currentReadme.split(articlesTitle)[0] + articlesTitle + "\n\n";
    const feed = await fetchFeed();

    let i = 0;
    // Append new items
    feed.items.forEach(item => {
      if (i < 4) {
        updatedReadme += '- [' + item.title + '](' + item.link +')\n';
      }
      i++;
    });    

    // Write updates to readme
    fs.writeFileSync("./README.md", updatedReadme);
  } catch (error) {
    console.log("error", error)
  }
}
updateFeed();