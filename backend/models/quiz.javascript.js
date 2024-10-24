const mongoose = require('mongoose');

const javascriptQuizSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true }, 
  correctAnswer: { type: String, required: true },
}, { timestamps: true });

const JavaScriptQuiz = mongoose.model('JavaScriptQuiz', javascriptQuizSchema, 'javascriptquizzes');

module.exports = JavaScriptQuiz;
