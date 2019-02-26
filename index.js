const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const ATTRACTIONS_PATH = "./db/attractions.csv";
const OUTPUT_PATH = "./db/responses.json";
const db = {
  attractions: null
};

const app = express();
app.use(bodyParser.json());

app.use(express.static("./client/build"));

app.get("/api/attractions", (req, res) => {
  if (!db.attractions) {
    fs.readFile(ATTRACTIONS_PATH, "utf-8", (err, data) => {
      if (err) {
        res.status(500).json({ success: false, error: err });
      } else {
        const rows = data.split(/\n/);
        db.attractions = rows.map((row, i) => {
          if (i === 0) {
            return;
          }
          const fields = row.split(/","/);
          const firstTwo = fields[0].split(/,"/);
          const nrCrt = firstTwo[0];
          const name = firstTwo[1];
          const address = fields[1];
          const category = fields[2];
          const description = fields[3];
          return {
            nrCrt,
            name,
            address,
            category,
            description
          };
        });
        res.status(200).json({ success: true, attractions: db.attractions });
      }
    });
  } else {
    res.status(200).json({ success: true, attractions: db.attractions });
  }
});

app.post("/api/response", (req, res) => {
  const { location, userName, scores } = req.body;
  if (!userName || !scores) {
    res.status(400).json({
      success: false,
      message:
        "Bad request. Must have schema: { location: [object], userName: [string], scores: [array]}"
    });
  } else {
    fs.readFile(OUTPUT_PATH, "utf-8", (err, data) => {
      if (err) {
        res.status(500).json({ success: false, error: err });
      } else {
        let db;
        try {
          db = JSON.parse(data);
        } catch (e) {
          db = {};
        }
        db[userName] = {
          location: location || null,
          userName: userName,
          timestamp: new Date(),
          scores: scores
        };
        fs.writeFile(OUTPUT_PATH, JSON.stringify(db), "utf-8", _err => {
          if (_err) {
            res.status(500).json({ success: false, error: _err });
          }
          res.status(200).json({ success: true });
        });
      }
    });
  }
});

// app.use((req, res, next) => {
//   console.log("hit 404");
//   res.redirect(301, "/");
// });

app.listen(process.env.PORT || 8080, function() {
  console.log(`Server started on port ${this.address().port}`);
});
