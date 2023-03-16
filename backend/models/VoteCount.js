const mongoose = require('mongoose');

const voteCountSchema = new mongoose.Schema({
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

module.exports= mongoose.model('VoteCount', voteCountSchema);
