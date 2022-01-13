const mongoose = require("mongoose");
const { Schema } = mongoose;
const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
});
const Student = mongoose.model("student", studentSchema);
module.exports = Student;
