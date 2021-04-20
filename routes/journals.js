const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {check, validationResult} = require('express-validator');

const User = require('../models/User');
const Journal = require('../models/Journal');

// @route     GET api/journals
// @desc      Get all users journals
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const journals = await Journal.find({user: req.user.id}).sort({
      date: -1,
    });
    res.json(journals);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/journals
// @desc      Add new journal
// @access    Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const {name, title, body} = req.body;

    try {
      const newJournal = new Journal({
        name,
        title,
        body,
        user: req.user.id,
      });

      const journal = await newJournal.save();

      res.json(journal);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

// @route     PUT api/journals/:id
// @desc      Update journal
// @access    Private
router.put('/:id', auth, async (req, res) => {
  const {name, title, body} = req.body;

  // Build journal object
  const journalFields = {};
  if (name) journalFields.name = name;
  if (title) journalFields.title = title;
  if (body) journalFields.body = body;

  try {
    let journal = await Journal.findById(req.params.id);

    if (!journal) return res.status(404).json({msg: 'Journal not found'});

    // Make sure user owns journal
    if (journal.user.toString() !== req.user.id) {
      return res.status(401).json({msg: 'Not authorized'});
    }

    journal = await Journal.findByIdAndUpdate(
      req.params.id,
      {$set: journalFields},
      {new: true},
    );

    res.json(journal);
  } catch (err) {
    console.error(er.message);
    res.status(500).send('Server Error');
  }
});

// @route     DELETE api/journals/:id
// @desc      Delete journal
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let journal = await Journal.findById(req.params.id);

    if (!journal) return res.status(404).json({msg: 'Journal not found'});

    // Make sure user owns journal
    if (journal.user.toString() !== req.user.id) {
      return res.status(401).json({msg: 'Not authorized'});
    }

    await Journal.findByIdAndRemove(req.params.id);

    res.json({msg: 'Journal removed'});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
