const router = require('express').Router();
const Comment = require('../db').import('../models/comment.js');

/*****************************************
** POST/CREATE One Comment
******************************************/
router.post('/add', (req, res) => {
    const commentData = {
        locid: req.body.comment.locid,
        userid: req.body.comment.userid,
        comment: req.body.comment.comments
    }
    // res.status(200).json({comment: commentData})
    Comment.create(commentData)
        .then(comment => res.status(201).json({ comment: comment, message: 'Comment created' }))
        .catch(err => res.status(500).json({ error: err }))
})

/*****************************************
** DELETE One Comment by id
******************************************/
router.delete('/delete/:id', (req, res) => {
    if (!isNaN(req.params.id)) {
        Comment.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(comment => {
                if (comment) {
                    res.status(200).send({ message: 'comment exists' })
                    Comment.destroy({
                        where: {
                            id: req.params.id
                        }
                    })
                        .then(comment => res.status(200).send('Comment deleted'))
                        .catch(err => res.status(500).json({ error: err }))
                } else {
                    res.status(404).send({ message: 'comment does not exist' })
                }
            })
            .catch(err => res.status(500).json({ error: err }))

    } else {
        res.status(400).send({ error: 'Incorrect id. Need a number' });
    }
})

/*
* 404 Catch All
*/
router.get('*', (req, res) => {
    res.status(404).send("*Comment page does exist.");
})

/*
* router export
*/
module.exports = router;