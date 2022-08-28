const express = require('express')
const router = express.Router();
const fetchUser = require('../middleware/fetchuser');
const Note = require('../models/Notes')
const {body, validationResult} = require('express-validator')
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    console.log(req.user.id);
    const notes = await Note.findOne({user: req.user.id})
    res.status(200).json(notes);
})


router.post('/addnote', fetchUser, [
    body('title').isLength({ min: 5 }),
    body('description').isLength({ min: 5 })
], async (req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json(error);
    const {title, description, tag} = req.body
    const note = new Note({
        title, description,tag, user: req.user.id
    })
    
    note = await note.save();
    res.status(200).json(note)

})


module.exports = router;