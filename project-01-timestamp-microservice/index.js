// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greetings: 'hello API' });
});


/* API Endpoint for Handling Dates and Timestamps */
app.get("/api/:date?", (req, res) => {

  /* if no input present */
  let inputDate = req.params.date;

  if (!inputDate) {
    const currentTimestamp = new Date();
    res.json({
      unix: currentTimestamp.getTime(),
      utc: currentTimestamp.toUTCString()
    });
    return;
  }

  /* if the input is Unix Timestamp */
  const unixPattern = /^\d+$/;

  if (unixPattern.test(inputDate)) {
    const dateNum = parseInt(inputDate);
    res.json({
      unix: dateNum,
      utc: new Date(dateNum).toUTCString()
    });
    return;
  }
  /* if the input is Unix Timestamp */

  /* if the input is in parsable date format */
  const parsedDate = new Date(inputDate);

  if (!isNaN(parsedDate.getTime())) {
    res.json({
      unix: parsedDate.getTime(),
      utc: parsedDate.toUTCString()
    });
  } else {
    res.json({ error: "Invalid Date" });
  }

});
/* API Endpoint for Handling Dates and Timestamps */


// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
