const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const ATTRACTIONS_PATH = "./db/attractions.csv";

const db = {
  attractions: null
};

const app = express();
app.use(bodyParser.json());

app.use(express.static("./client/public"));

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
  res.status(200).json({ message: "Hello World" });
});

app.listen(process.env.PORT || 8080, function() {
  console.log(`Server started on port ${this.address().port}`);
});
