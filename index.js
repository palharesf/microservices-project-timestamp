// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 4000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});



// All before this was boilerplate; below is the code for the challenge

// Core function: api/:date? , where :date? can be accessed via req.params.date
app.get("/api/:date?", function (req, res) {
  var date = req.params.date;

  // Check if a date was passed and is valid
  if (date) {
    var timestamp = !isNaN(date) ? parseInt(date) : date;
    var parsedDate = new Date(timestamp);

    // Case date was not valid
    if (parsedDate.toString() == "Invalid Date") {
      res.json({
        error: "Invalid Date"
      });
    } 
    // Case date was valid
    else {
      res.json({
        unix: parsedDate.getTime(),
        utc: parsedDate.toUTCString()
      });
    }
  }

  // If no date was passed, print the current date
  else {
    res.json(
      {
        unix: new Date().getTime(),
        utc: new Date().toUTCString()
      }
    )
  }
});


