const cheerio = require('cheerio');
const request = require('request-promise');

async function init(){
    const $ = await request({
        uri: 'http://quotes.toscrape.com/',
        transform: body => cheerio.load(body)
    });
    //console.log($);
    const websiteTitle = $('title');
    console.log(websiteTitle.html());

    const heading = $('h1');
    console.log(heading.text().trim())
};
