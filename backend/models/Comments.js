const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema({
  //   commentID: String,
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Questions",
  },
  comment: String,
  created_at: {
    type: Date,
    default: Date.now(),
  },
  user: Object,
});
// console.log("ejkkada Firest",CommentSchema.comment);
module.exports = mongoose.model("Comments", CommentSchema);