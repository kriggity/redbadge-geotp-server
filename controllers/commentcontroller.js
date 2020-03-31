const router = require('express').Router();
const Comment = require('../db').import('../models/comment.js');

/*********************
** POST/CREATE One Comment
**********************/
router.put('/api/comments/add', (req, res) => {
    const commentData = {
        locid: req.body.locid,
        userid: req.body.userid,
        comment: req.params.comments
    }
    Comment.create(commentData)
        .then(comment => res.status(200).json(comment))
        .catch(err => res.status(500).json({ error: err }))
})

/*********************
** GET/READ All Comments for One Location
**********************/
router.get('/api/comments/:locid', (req, res) => {
    Comment.findAll({
        where: {
            locid: req.params.locid
        }
    })
        .then(comments => res.status(200).json(comments))
        .catch(err => res.status(500).json({ error: err }))
})

/*
* router export
*/
module.exports = router;