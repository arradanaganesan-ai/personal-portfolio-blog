const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

dotenv.config();

const prisma = new PrismaClient();

const app = express();
app.use(cors());
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

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
function authenticateToken(req, res, next) {
  
  ("AUTH HEADER:", authHeader);

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Access denied",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        message: "Invalid token",
      });
    }

    req.user = user;
    next();
  });
}
app.get("/profile", authenticateToken, (req, res) => {
  res.json({
    message: "Welcome to protected route",
    user: req.user,
  });
});

// Start server

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});