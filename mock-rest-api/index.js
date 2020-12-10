const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3001;

const users = [];
const locations = [];

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

app.get("/locations", (request, response) => {
  if (request.method === "GET") {
    response.status(200).jsonp({ locations: locations });
  }
});

app.listen(port, () => {
  // Create 10 users
  for (let i = 0; i < 10; i++) {
    users.push({ name: `Name${i}` });
  } 

  for (let i = 0; i < 50; i++) {
    const localCapacity = Math.round(Math.random() * 1000);
    let occupied = Math.round(Math.random() * 100);
    if (localCapacity < occupied) {
      occupied = 0;
    }

    if ( i % 10 === 0) {
      occupied = localCapacity;
    }

    locations.push({ id: `${i}`, name: `Location - ${i}`, address: `Address - ${i}`, capacity: localCapacity, occupied: occupied });
  }
  console.log("JSON Server is running");
});
