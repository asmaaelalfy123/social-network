const express = require('express');
const router = express.Router();
const User = require('../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

//@route Post /api/users
//@desc  register User
//@access Public

router.post(
  '/',
  [
    check('name', 'Name Is Required,Please Add A Name')
      .not()
      .isEmpty(),
    check('email', 'Email Is Require,Please Add an Email').isEmail(),
    check('password', 'Password should be more than 6 chars').isLength({
      min: '6'
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User Already Exists' }] });
      }

      const avatar = gravatar.url(email, {
        s: '200',
        d: 'mm',
        r: 'pg'
      });
      user = new User({ name, email, password, avatar });
      //encrypt password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        config.get('JwtSecret'),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      return res.status(500).json('server errors');
    }
  }
);

module.exports = router;
