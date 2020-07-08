const express = require('express');
const router = express.Router();

const axios=require('axios')
// bring in normalize to give us a proper url, regardless of what user entered
const normalize = require('normalize-url');

const User = require('../models/User');

const request = require('request');
const config = require('config');

const Profile = require('../models/Profile');

const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Post = require('../models/Post');

//@route GET /api/profile
//@desc  Get profile
//@access Private

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'No such profile with this id' });
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server errors');
  }
});

//@route post /api/profile
//@desc  Get profile
//@access Private

router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required')
        .not()
        .isEmpty(),
      check('skills', 'Skills is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      company,
      location,
      website,
      bio,
      skills,
      status,
      githubusername,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook
    } = req.body;

    //Build Profile Fields
    const profileFields = {
      user: req.user.id,
      company,
      location,
      website:
        website && website !== ''
          ? normalize(website, { forceHttps: true })
          : '',
      bio,
      skills: Array.isArray(skills)
        ? skills
        : skills.split(',').map(skill => ' ' + skill.trim()),
      status,
      githubusername
    };
    //build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        //update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }

      //create Profile
      profile = await new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.msg);
      res.status(500).send('server error');
    }
  }
);

//@route GET /api/profile
//@desc  Get profile
//@access Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);

    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server Errors');
  }
});

//@route GET /api/profile/user/:user_id
//@desc  Get user profile by its id
//@access Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(400).json('Profile not found');
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json('Profile not found');
    }
    res.status(500).send('server Errors');
  }
});

//@route DELETE /api/profile
//@desc  DELETE profile
//@access Private
router.delete('/', auth, async (req, res) => {
  try {
    //remove users post
    await Post.deleteMany({ user: req.user.id });
    //remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json('User Deleted');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server Errors');
  }
});

//@route PUT /api/profile/experience
//@desc  Add exerience to profile
//@access Private

router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required')
        .not()
        .isEmpty(),
      check('company', 'Company is required')
        .not()
        .isEmpty(),
      check('from', 'from date  is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      title,
      from,
      to,
      current,
      description,
      company,
      location
    } = req.body;
    const newEdu = {
      title,
      from,
      to,
      current,
      description,
      company,
      location
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newEdu);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).json('Server error');
    }
  }
);

//@route DELETE /api/profile/experience/exp_id
//@desc  Remove Experience
//@access Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
  const profile = await Profile.findOne({ user: req.user.id });
  const removeIndex = profile.experience
    .map(item => item.id)
    .indexOf(req.params.exp_id);

  profile.experience.splice(removeIndex, 1);

  await profile.save();
  res.json(profile);
});

///*****education */
//@route PUT /api/profile/education
//@desc  Add education to profile
//@access Private

router.put(
  '/education',
  [
    auth,
    [
      check('school', 'School is required')
        .not()
        .isEmpty(),
      check('degree', 'Degree is required')
        .not()
        .isEmpty(),
      check('fieldofstudy', 'Field Of Study is required')
        .not()
        .isEmpty(),
      check('from', 'from date  is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      school,
      degree,
      from,
      fieldofstudy,
      to,
      current,
      description
    } = req.body;
    const newEdu = {
      school,
      degree,
      from,
      fieldofstudy,
      to,
      current,
      description
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEdu);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).json('Server error');
    }
  }
);

//@route    GET /api/profile/ github/"username"
//@desc       Get github repos
//@access      Public
router.get('/github/:username', async(req, res) => {
  try {
    const uri = encodeURI(
      `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
    );
    const headers = {
      'user-agent': 'node.js',
      Authorization: `token ${config.get('githubToken')}`
    };

    const gitHubResponse = await axios.get(uri, { headers });
    return res.json(gitHubResponse.data);
  } catch (err) {
    console.error(err.message);
    return res.status(404).json({ msg: 'No Github profile found' });
  }
});
module.exports = router;
