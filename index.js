const cheerio = require('cheerio');
const request = require('request-promise');

const fs = require('fs-extra');
const writeStream = fs.createWriteStream('quotes.csv');

async function init(){

    try{
        const $ = await request({
            uri: 'http://quotes.toscrape.com/',
            transform: body => cheerio.load(body)
        }); 
        //console.log($);
    
        const websiteTitle = $('title');
        console.log(websiteTitle.html());

        const heading = $('h1');
        console.log(heading.text().trim());

        const quote = $('.quote').find('a');
        console.log(quote.html());

        const third_quote = $('.quote').next();
        //console.log(third_quote.html());

        const containerClass = $('row .col-md-8').children();
        //console.log(containerClass.html());

        /*const quotes = $('.quote span.text').each((i, el) => {
        //console.log(i, $(el).text());
        const quote_text = $(el).text();
        const quote = quote_text.replace(/(^\"|\"$)/g,"");
        console.log(quote);
        });*/

        writeStream.write('Quote|Author|Tags\n');
        const tags = [];
        $('.quote').each((i, el) => {
            const text = $(el).find('span.text').text().replace(/(^\“|\”$)/g, "");
            const author = $(el).find('span small.author').text();
            const tag = $(el).find('.tags a').html();
            tags.push(tag);
            // console.log(text, author, tags.join(','))
            writeStream.write(`${text}|${author}|${tags}\n`);
            // console.log(i, text, author)
        })

        console.log('Done.');
        // $('.quote .tags a').each((i, el) => {
        //     // console.log($(el).html())
        //     const text = $(el).text();
        //     const link = $(el).attr('href');
        //     console.log(text, link)
        // });

    } catch (e) {
        console.log(e);
    }
};
