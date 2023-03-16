const mongoose = require('mongoose');

const ansVoteCountSchema = new mongoose.Schema({
  answerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Answers",
  }, 
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Questions",
  },
  voteCount: {
    type: Number,
    default: 0
  },
  user: Object
});

module.exports= mongoose.model('AnsVoteCount', ansVoteCountSchema);
