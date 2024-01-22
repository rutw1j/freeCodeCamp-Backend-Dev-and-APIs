require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

/* URL Shortner API*/
const urlStore = {};
let urlCount = 0;

app.post('/api/shorturl', (req, res) => {
  const originalUrl = req.body.url;

  // Validate URL format
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  if (!urlRegex.test(originalUrl)) {
    return res.json({ error: 'invalid url' });
  }

  // Check if the URL is already in the store
  const existingUrl = Object.keys(urlStore).find((key) => urlStore[key] === originalUrl);

  if (existingUrl) {
    res.json({ original_url: existingUrl, short_url: urlStore[existingUrl] });
  } else {
    // If the URL is not in the store, create a new entry
    urlCount++;
    const shortUrl = urlCount.toString();
    urlStore[shortUrl] = originalUrl;
    res.json({ original_url: originalUrl, short_url: shortUrl });
  }
});

app.get('/api/shorturl/:short_url', (req, res) => {
  const shortUrl = req.params.short_url;

  if (urlStore.hasOwnProperty(shortUrl)) {
    res.redirect(urlStore[shortUrl]);
  } else {
    res.json({ error: 'Short URL not found' });
  }
});
/* URL Shortner API*/

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
