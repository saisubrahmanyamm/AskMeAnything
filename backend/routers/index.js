const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const questionRouter = require("./Question");
const answerRouter = require("./Answer");
const commentRouter = require('./Comments');
const votesRouter = require('./Votes');
const ansVotesRouter = require('./AnsVotes');
const userRouter = require('./User');

router.get("/", (req, res) => {
  res.send("Welcome to AMA");
});

router.use("/question", questionRouter);
router.use("/answer", answerRouter);
router.use('/comment', commentRouter);
router.use('/votes', votesRouter);
router.use('/ansvotes', ansVotesRouter);
router.use('/user',userRouter);

module.exports = router;