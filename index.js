const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const Student = require("./models/Student");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
//routes
app.get("/", (req, res) => {
  res.send("Hi.");
});
//Get all students data
app.get("/all", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.send("Internal Server Error");
  }
});
//Saving new student details to the database
app.post("/add", async (req, res) => {
  try {
    await Student.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      degree: req.body.degree,
    });
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: "error", error: error.message });
  }
});
//Updating a student's information
app.put("/update/:id", async (req, res) => {
  const updatedInfo = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    degree: req.body.degree,
  };
  try {
    let student = await Student.findById(req.params.id);
    if (!student) {
      return res.json({ status: "Error", error: "Not Found" });
    }
    student = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: updatedInfo },
      { new: true }
    );
    res.json(student);
  } catch (error) {
    res.json({ status: "Error", error: error.message });
  }
});
//Delete a Student's information from the database
app.delete("/delete/:id", async (req, res) => {
  try {
    let student = await Student.findById(req.params.id);
    if (!student) {
      return res.json({ status: "Error", error: "Not Found" });
    }
    student = await Student.findByIdAndDelete(req.params.id);
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: "error", error: error.message });
  }
});

//MongoDB connection
mongoose.connect(process.env.DB_URL, () => {
  console.log("MongoDB successfully connected.");
});
//Server Setup
app.listen(process.env.PORT, () => {
  console.log("Server running at PORT : ", process.env.PORT);
});
