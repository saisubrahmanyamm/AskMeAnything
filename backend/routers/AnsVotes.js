const express = require('express');
const router = express.Router();
const VoteCount = require('../models/AnsVoteCount');


// Upvote a question
router.post('/:questionId/:answerId/upvote', async (req, res) => {
  
    try {
        const voteCount = await VoteCount.findOneAndUpdate(
          { answerId: req.params.answerId, 
           questionId: req.params.questionId },
          { $inc: { voteCount: 1 }},
            {user : req.body.user },
          { new: true, upsert: true }
        );
        console.log(voteCount);
        if (!voteCount) {
          const newVoteCount = new VoteCount({
            answerId: req.params.answerId,
            questionId: req.params.questionId ,
            voteCount: 1,
            user: req.body.user
          });
          console.log(voteCount);
          await newVoteCount.save();
          res.json({
            voteCount: newVoteCount,
            isUpvoted: true,
            isDownvoted: false,
           votes: (newVoteCount.voteCount) 
          });
        }  else{
          const isUpvoted = true;
          const isDownvoted = false;
          const votes = (voteCount.voteCount) + 1;
          res.json({ voteCount, isUpvoted, isDownvoted,votes });
        }

      }  catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

// Downvote a question
router.post('/:questionId/:answerId/downvote', async (req, res) => {

try {
    const voteCount = await VoteCount.findOneAndUpdate(
      { answerId: req.params.answerId ,
      questionId: req.params.questionId },
      { $inc: { voteCount: -1 }},
        {user : req.body.user },
      { new: true, upsert: true }
    );
    if (!voteCount) {
      const newVoteCount = new VoteCount({
        answerId: req.params.answerId,
        questionId: req.params.questionId,
        voteCount: -1,
        user: req.body.user
      });
      await newVoteCount.save();
      res.json({
        voteCount: newVoteCount,
        isUpvoted: false,
        isDownvoted: true,
        votes : (newVoteCount.voteCount)
      });
    } else{
      const isUpvoted = false;
      const isDownvoted = true;
       const votes = (voteCount.voteCount) - 1;
      res.json({ voteCount, isUpvoted, isDownvoted,votes });
        }
  }  catch (error) {
console.log(error);
res.status(500).send('Server error');
}

});

module.exports = router;
