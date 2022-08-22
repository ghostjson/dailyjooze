const express = require("express");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;
const adminCredentials = {
  username: process.env.DJ_USERNAME || "admin",
  password: process.env.DJ_PASSWORD || "17291234",
};

app.use(express.json());
app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.render("./index.html");
});

app.post("/api/v1/download", (req, res) => {
  const downloads = req.body.downloads;

  if (req.body.email || req.body.whatsapp) {
    fs.writeFileSync(
      __dirname + "/downloads/users.csv",
      `\n${req.body.email},${req.body.whatsapp}`,
      { flag: "a+" }
    );

    if (downloads.daily && downloads.weekly && downloads.target) {
      res.sendFile(__dirname + "/downloads/all.zip");
    } else if (downloads.daily && downloads.weekly) {
      res.sendFile(__dirname + "/downloads/DJdaily-DJweekly.zip");
    } else if (downloads.daily && downloads.target) {
      res.sendFile(__dirname + "/downloads/DJdaily-DJtarget.zip");
    } else if (downloads.weekly && downloads.target) {
      res.sendFile(__dirname + "/downloads/DJtarget-DJweekly.zip");
    } else if (downloads.daily) {
      res.sendFile(__dirname + "/downloads/DJdaily.pdf");
    } else if (downloads.target) {
      res.sendFile(__dirname + "/downloads/DJtarget.pdf");
    } else if (downloads.weekly) {
      res.sendFile(__dirname + "/downloads/DJweekly.pdf");
    } else {
      res.status(204).send("No file selected");
    }
  } else {
    res.status(401).send("Should provide either email or whatsapp");
  }
});

app.post("/api/v1/getData", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    console.log(username, password);
    console.log(adminCredentials);
    if (
      username === adminCredentials.username &&
      password === adminCredentials.password
    ) {
      res.sendFile(__dirname + "/downloads/users.csv");
    } else {
      res.status(401).send("Username or password incorrect");
    }
  } else {
    res.status(401).send("Username or password incorrect");
  }
});

app.listen(PORT, () => {
  console.log("Listening to the port " + PORT);
});
