const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST request to add a new user to the database
router.post('/', async (req, res) => {
  try {
    const { displayName, uid, email, photoURL } = req.body;

    const user = new User({
      displayName,
      uid,
      email,
      photoURL
    });

    await user.save();

    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET request to retrieve all users from the database
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET request to retrieve a single user from the database by id
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.put("/:email", async (req, res) => {
  const { email } = req.params;
  const { points } = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $inc: { reputationPoints: points } },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
