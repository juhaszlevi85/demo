const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3001;

const users = [];

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/users", (request, response) => {
  if (request.method === "GET") {
    response.status(200).jsonp({ users: users });
  }
});

app.post("/users", (request, response) => {
  if (request.method === "POST") {
    const user = request.body;
    users.push(user);
    response.status(200).jsonp(user);
  }
});

app.listen(port, () => {
  // Create 10 users
  for (let i = 0; i < 10; i++) {
    users.push({ name: `Name${i}` });
  }
  console.log("JSON Server is running");
});
