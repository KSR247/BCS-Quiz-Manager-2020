const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
  questionTitle: { type: String, required: true },
  options: { type: Array, required: true },
  questionType: { type: String, required: true },
  correctOption: { type: Number, required: true },
  addedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Quiz", QuizSchema);
