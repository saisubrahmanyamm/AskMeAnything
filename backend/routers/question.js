const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const QuestionDB = require("../models/Questions");

router.post("/", async (req, res) => {
  const questionData = new QuestionDB({
    title: req.body.title,
    body: req.body.body,
    tags: req.body.tag,
    user: req.body.user,
  });

  await questionData
    .save()
    .then((doc) => {
      res.status(201).send(doc);
    })
    .catch((err) => {
      res.status(400).send({
        message: "Question not added successfully",
      });
    });
});


  

router.get("/", async (req, res) => {
    const error = {
      message: "Error in retrieving questions",
      error: "Bad request",
    };
  
    QuestionDB.aggregate([
      {
        $lookup: {
          from: "comments",
          let: { question_id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$question_id", "$$question_id"],
                },
              },
            },
            {
              $project: {
                _id: 1,
                // user_id: 1,
                comment: 1,
                created_at: 1,
                // question_id: 1,
              },
            },
          ],
          as: "comments",
        },
      },
      {
        $lookup: {
          from: "answers",
          let: { question_id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$question_id", "$$question_id"],
                },
              },
            },
            
            {
              $project: {
                _id: 1,
                // user_id: 1,
                // answer: 1,
                // created_at: 1,
                // question_id: 1,
                // created_at: 1,
              },
            },
          ],
          as: "answerDetails",
        },
      },
      {
        $lookup: {
          from: "votecounts",
          let: { question_id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$questionId", "$$question_id"],
                },
              },
            },
            {
              $project: {
                _id: 1,
                
                voteCount: 1,
                
                
              },
            },
          ],
          as: "voteDetails",
        },
      },
      // {
      //   $unwind: {
      //     path: "$answerDetails",
      //     preserveNullAndEmptyArrays: true,
      //   },
      // },
      {
        $project: {
          __v: 0,
          // _id: "$_id",
          // answerDetails: { $first: "$answerDetails" },
        },
      },
    ])
      .exec()
      .then((questionDetails) => {
        res.status(200).send(questionDetails);
      })
      .catch((e) => {
        console.log("Error: ", e);
        res.status(400).send(error);
      });
    });

    router.get("/:id", async (req, res) => {
        try {
          // const question = await QuestionDB.findOne({ _id: req.params.id });
          // res.status(200).send(question);
          const ObjectId = mongoose.Types.ObjectId;

          QuestionDB.aggregate([
            {
              $match: { _id: new ObjectId(req.params.id) },
            },
            {
              $lookup: {
                from: "answers",
                let: { question_id: "$_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ["$question_id", "$$question_id"],
                      },
                    },
                  },
                  {
                    $lookup: {
                      from: 'ansvotecounts', // The name of the votes collection
                      localField: '_id',
                      foreignField: 'answerId',
                      as: 'votes'
                    }
                  },
                  {
                    $project: {
                      _id: 1,
                      user: 1,
                      answer: 1,
                      // created_at: 1,
                      question_id: 1,
                      created_at: 1,
                      votesCount:{ $toString: { $arrayElemAt: ["$votes.voteCount", 0] } }
                    },
                  },
                ],
                as: "answerDetails",
              },
            },
            {
              $lookup: {
                from: "votecounts",
                let: { question_id: "$_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ["$questionId", "$$question_id"],
                      },
                    },
                  },
                  {
                    $project: {
                      _id: 1,
                      user: 1,
                      voteCount: 1,
                      questionId: 1,
                      
                    },
                  },
                ],
                as: "voteDetails",
              },
            },
            {
              $lookup: {
                from: "ansvotecounts",
                let: { question_id: "$_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ["$questionId", "$$question_id"],
                      },
                    },
                  },
                  {
                    $project: {
                      _id: 1,
                      user: 1,
                      voteCount: 1,
                      questionId: 1,
                      answerId: 1,
                      
                    },
                  },
                ],
                as: "answerVoteDetails",
              },
            },
            {
              $lookup: {
                from: "comments",
                let: { question_id: "$_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ["$question_id", "$$question_id"],
                      },
                    },
                  },
                  {
                    $project: {
                      _id: 1,
                      question_id: 1,
                      user: 1,
                      comment: 1,
                      // created_at: 1,
                      // question_id: 1,
                      created_at: 1,
                    },
                  },
                ],
                as: "comments",
              },
            },
           
            {
              $project: {
                __v: 0,
                
              },
            },
          ])
            .exec()
            .then((questionDetails) => {
              res.status(200).send(questionDetails);
            })
            .catch((e) => {
              console.log("Error: ", e);
              res.status(400).send(error);
            });
        } catch (err) {
            console.log("error: ",err);
          res.status(400).send({
            message: "Question not found",
          });
        }
      });
module.exports = router;