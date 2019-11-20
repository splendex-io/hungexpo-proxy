const express = require('express');
const request = require('request');
const app = express();
const port = process.env.PORT || 3000;

const dotenv = require('dotenv');
dotenv.config();

if (!process.env.BASE_URL) {
  throw new Error('No base url specified!');
}

const baseUrl = process.env.BASE_URL;

app.get('/**', (req, res) => {
  request({ uri: `${baseUrl}${req.url}` }, function(error, response, body) {
    const regex = new RegExp(baseUrl, 'g');

    body = body.replace(regex, '');
    res.send(body);
  });
});

app.listen(port, () =>
  console.log(`Example app listening on port http://localhost:${port}`)
);
