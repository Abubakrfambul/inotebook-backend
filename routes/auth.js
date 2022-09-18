const express = require('express')
const {body, validationResult} = require('express-validator')
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const JWT_SECRET = 'krishna';
const jwt = require('jsonwebtoken')
const fetchUser = require('../middleware/fetchUser')
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

/*****************User Login**************/
router.post('/login',  [
   body('email').isEmail(),
   body('password').isLength({ min: 5 }),
], async (req, res) => {
   let success = false;
   // Finds the validation errors in this request and wraps them in an object with handy functions
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }
   const user = await User.findOne({email: req.body.email})
   if(!user) return res.status(400).json({error: 'Please provide correct credentials'});
   const comparePassword = await bcrypt.compare(req.body.password, user.password);

   if(!comparePassword)
   {
      return res.status(400).json({success, error: 'Please provide correct credentials'});
   }
   const data = {
      user: {
         id: user.id
      }
   }
   const jwtString = jwt.sign(data, JWT_SECRET);
   success = true;
   res.json({success, token: jwtString});
})


/*******Get User Details *******/
router.post('/getuser', fetchUser, async (req, res)=> {
   try
   {
      const user = await User.findById(req.user.id).select('-password');
      res.send(user);
   }
   catch(error) 
   {
      res.status(500).json({error: 'internal server error'});
   }
   

})
module.exports = router;