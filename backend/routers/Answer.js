const express = require("express");
const router = express.Router();
const answerDB = require("../models/Answers");

router.post("/", async (req, res) => {
  const answerData = new answerDB({
    question_id: req.body.question_id,
    answer: req.body.answer,
    user: req.body.user,
  });
console.log(answerData);
  await answerData
    .save()
    .then((doc) => {
      res.status(201).send(doc);
    })
    .catch((err) => {
      res.status(400).send({
        message: "Answer not added successfully",
      });
    });
});
router.put("/:id", async (req, res) => {
  const answerID = req.params.id;
  const { correctAnswer } = req.body;
  try {
    const updatedAnswer = await answerDB.findByIdAndUpdate(
      answerID,
      { correctAnswer },
      { new: true },
      {isCorrected : true}
    );
    res.status(200).json(updatedAnswer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;