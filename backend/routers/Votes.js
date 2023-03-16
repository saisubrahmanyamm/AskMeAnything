const express = require('express');
const router = express.Router();
const VoteCount = require('../models/VoteCount');


// Upvote a question
router.post('/:questionId/upvote', async (req, res) => {
  
    try {
        const voteCount = await VoteCount.findOneAndUpdate(
          { questionId: req.params.questionId },
          { $inc: { voteCount: 1 }},
            {user : req.body.user },
          { new: true, upsert: true }
        );
        if (!voteCount) {
          const newVoteCount = new VoteCount({
            questionId: req.params.questionId,
            voteCount: 1,
            user: req.body.user
          });
          await newVoteCount.save();
          res.json({
            voteCount: newVoteCount,
            isUpvoted: true,
            isDownvoted: false,
           votes: (newVoteCount.voteCount) + 1
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
router.post('/:questionId/downvote', async (req, res) => {
//   try {
//     const voteCount = await VoteCount.findOneAndUpdate(
//       { questionId: req.params.questionId },
//       { $inc: { voteCount: -1 } },
//       { user: req.body.user},
//       { new: true, upsert: true }
//     );
//     const isUpvoted = false;
//     const isDownvoted = true;
//     const votes = (voteCount.voteCount) - 1;
//     res.json({ voteCount, isUpvoted, isDownvoted, votes });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send('Server error');
//   }

try {
    const voteCount = await VoteCount.findOneAndUpdate(
      { questionId: req.params.questionId },
      { $inc: { voteCount: -1 }},
        {user : req.body.user },
      { new: true, upsert: true }
    );
    if (!voteCount) {
      const newVoteCount = new VoteCount({
        questionId: req.params.questionId,
        voteCount: -1,
        user: req.body.user
      });
      await newVoteCount.save();
      res.json({
        voteCount: newVoteCount,
        isUpvoted: false,
        isDownvoted: true,
        votes : (newVoteCount.voteCount) -1
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
