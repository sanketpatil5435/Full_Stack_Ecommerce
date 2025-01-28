import express from "express";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.json());

// Route to create a new user
app.post("/users", async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);

  try {
    // Create a new user in the database
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password, // In a real app, hash this password!
      },
    });

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating user" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
