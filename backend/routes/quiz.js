// routes/quiz.js
const router = require("express").Router();
const JavaScriptQuiz = require("../models/quiz.javascript");

router.get("/api/quiz/js", async (req, res) => {
  try {
    const quizzes = await JavaScriptQuiz.find({});
    res.json(quizzes);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
