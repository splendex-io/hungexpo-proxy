const express = require('express');
const request = require('request');
const app = express();
const port = process.env.PORT || 3000;

const dotenv = require('dotenv');
dotenv.config();

if (!process.env.BASE_URL) {
  throw new Error('No base url specified!');
}

const baseUrl  = process.env.BASE_URL;
const eventUri = process.env.EVENT_URI;



app.get('/**', (req, res) => {
  // req.url -> the request part from the address bar
  let uriParts = req.url.split('/');
  let languageStr = '';
  let languagePart = '';
  let requestStr = '';

  uriParts = uriParts.filter((item) => {
    return item !== '';
  });

  if (uriParts[0] == 'en')
  {
    // Build and replace urls with locale
    languageStr = uriParts[0];
    languagePart = `/${uriParts[0]}`;
    
    uriParts.map((part) => {
      if (part != 'en')
      {
        requestStr += `/${part}`;
      }
    });
  }
  else
  {
    // Build and replace basic urls
    requestStr = req.url;
  }

  request({ uri: `${baseUrl}${languagePart}${eventUri}${requestStr}` }, function(error, response, body) {
    let foo = `${baseUrl}${languagePart}${eventUri}${requestStr}`;
    
    // Replace language switch url
    if (languageStr == 'en')
    {
      const languageSwitchRewriteRegex = new RegExp(baseUrl + eventUri, 'g');
      body = body.replace(languageSwitchRewriteRegex, '');
    }
    else {
      const languageSwitchRewriteRegex = new RegExp(baseUrl + '/en' + eventUri, 'g');
      console.log(body);
      body = body.replace(languageSwitchRewriteRegex, '/en');
    }
    
    // Replace links and remove visibility classes
    const linkRewriteRegex = new RegExp(baseUrl + languagePart + eventUri, 'g');
    body = body.replace(linkRewriteRegex, languagePart);
    
    // Replace visibility classes
    const pageVisibilityRegex = new RegExp('visible-only-outside', 'g');
    body = body.replace(pageVisibilityRegex, '');

    // Output
    res.send(body);
  });
});

app.listen(port, () =>
  console.log(`Example app listening on port http://localhost:${port}`)
);
