const express = require('express')
const {body, validationResult} = require('express-validator')
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const JWT_SECRET = 'krishna';
const jwt = require('jsonwebtoken')
router.get('/createuser', [
   body('email').isEmail(),
   body('password').isLength({ min: 5 }),
], async (req, res) => {
   // Finds the validation errors in this request and wraps them in an object with handy functions
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }
   // const user = User(req.body)
   // user.save();
   let user = await User.findOne({email: req.body.email})
   console.log(user);
   if(user)
   {
      return res.status(400).json({error: 'an user already exists with this email id'})
   }
   const salt = await bcrypt.genSalt(10)
   const hash = await bcrypt.hash(req.body.password, salt);
   user = await User.create({
      name: req.body.name,
      email: req.body.email,  
      password: hash
   })

   const data = {
      id: 'sd',
   }
   const jwtData = jwt.sign(data, JWT_SECRET)
   console.log(jwtData);
   // .then(user => res.json(user))
   // .catch(err => res.json(err.message))
   res.json(user)
})

module.exports = router;