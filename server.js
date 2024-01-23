const express = require('express');
const request = require('request');
const app = express();
const port = process.env.PORT || 3002;

const dotenv = require('dotenv');
dotenv.config();

if (!process.env.BASE_URL) {
  throw new Error('No base URL specified!');
}

const baseUrl = process.env.BASE_URL;
const eventUri = process.env.EVENT_URI;

app.get('/**', (req, res) => {
  let uriParts = req.url.split('/').filter(item => item !== '');
  let languageStr = '';
  let languagePart = '';
  let requestStr = '';

  if (uriParts[0] === 'en') {
    languageStr = uriParts[0];
    languagePart = `/${uriParts[0]}`;
    requestStr = uriParts.slice(1).join('/');
  } else {
    requestStr = req.url;
  }

  const fullUri = `${baseUrl}${languagePart}${eventUri}${requestStr}`;

  request({ 
  uri: fullUri,
  rejectUnauthorized: false  // This allows untrusted certificates
  }, function (error, response, body) {
    if (error) {
      console.error(`Error during request to ${fullUri}:`, error);
      return res.status(500).send('Internal Server Error');
    }

    if (!response || response.statusCode !== 200) {
      console.log(`Non-200 response from ${fullUri}:`, response && response.statusCode);
      return res.status(response ? response.statusCode : 500).send('Error');
    }

    body = body || '';

    try {
      if (languageStr === 'en') {
        const languageSwitchRewriteRegex = new RegExp(baseUrl + eventUri, 'g');
        body = body.replace(languageSwitchRewriteRegex, '');
      } else {
        const languageSwitchRewriteRegex = new RegExp(baseUrl + '/en' + eventUri, 'g');
        body = body.replace(languageSwitchRewriteRegex, '/en');
      }

      const linkRewriteRegex = new RegExp(baseUrl + languagePart + eventUri, 'g');
      body = body.replace(linkRewriteRegex, languagePart);

      const pageVisibilityRegex = /visible-only-outside/g;
      body = body.replace(pageVisibilityRegex, '');

      res.send(body);
    } catch (err) {
      console.error('Error processing response body:', err);
      res.status(500).send('Internal Server Error');
    }
  });
});

app.listen(port, () =>
  console.log(`App listening on port http://localhost:${port}`)
);
