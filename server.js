const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;


// Normal pages

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/about", (req, res) => {
  res.send("About Page");
});

app.get("/projects", (req, res) => {
  res.send("Projects Page");
});

app.get("/contact", (req, res) => {
  res.send("Contact Page");
});


// CRUD API

let users = [
  {
    id: 1,
    name: "Arradana"
  }
];


// GET
app.get("/users", (req, res) => {
  res.json(users);
});


// POST
app.post("/users", (req, res) => {
  const user = req.body;
  users.push(user);
  res.json(user);
});


// PUT
app.put("/users/:id", (req, res) => {

  const id = Number(req.params.id);

  const user = users.find(u => u.id === id);

  if(user){
    user.name = req.body.name;
    res.json(user);
  }
  else{
    res.status(404).send("User not found");
  }

});


// DELETE
app.delete("/users/:id", (req, res) => {

  const id = Number(req.params.id);

  users = users.filter(u => u.id !== id);

  res.send("Deleted");

});


// Start server

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});