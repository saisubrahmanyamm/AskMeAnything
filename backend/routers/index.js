const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const questionRouter = require("./Question");
const answerRouter = require("./Answer");
const commentRouter = require('./Comments');
const votesRouter = require('./Votes');
const ansVotesRouter = require('./AnsVotes');

router.get("/", (req, res) => {
  res.send("Welcome to AMA");
});

router.use("/question", questionRouter);
router.use("/answer", answerRouter);
router.use('/comment', commentRouter);
router.use('/votes', votesRouter);
router.use('/ansvotes', ansVotesRouter);

module.exports = router;