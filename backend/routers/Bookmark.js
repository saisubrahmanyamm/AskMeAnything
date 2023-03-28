const express = require("express");
const router = express.Router();
const bookMarkDB = require("../models/Bookmarks");

router.post("/", async (req, res) => {
    const bookmarkData = new bookMarkDB({
      question_id: req.body.question_id,
      user: req.body.user,
    });
  console.log("kavalsina",bookmarkData);
    await bookmarkData
      .save()
      .then((doc) => {
        res.status(201).send(true);
      })
      .catch((err) => {
        res.status(400).send({
          message: "Bookmark not added successfully",
        });
      });
  });

  router.get("/:questionId/:email", async (req, res) => {
    
try{
    const Bookmark = await bookMarkDB.findOne(
      {question_id: req.params.questionId, 
        "user.email": req.params.email}
      );
    const exists = Bookmark !== null;
    res.send({ exists });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  } 
  
      
  });

  module.exports = router;