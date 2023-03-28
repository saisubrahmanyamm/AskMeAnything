const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Questions",
  }, 
  
  user: Object,
  created_at: {type: Date, default: Date.now}
});
bookmarkSchema.index({question_id: 1, "user.email": 1}, {unique: true});

module.exports= mongoose.model('Bookmark', bookmarkSchema);
