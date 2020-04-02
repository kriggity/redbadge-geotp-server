const router = require('express').Router();
const Comment = require('../db').import('../models/comment.js');

/*****************************************
** GET/READ All Comments for One Location
******************************************/
router.get('/:locid', (req, res) => {
    Comment.findAll({
        where: {
            locid: req.params.locid
        }
    })
        .then(comments => {
            if (comments.length > 0) {
                return res.status(200).json({ comments })
            } else {
                return res.status(204).json({ message: 'No comments for this location' })
            }
        })
        .catch(err => res.status(500).json({
            error: err,
            message: 'Location does not exist'
        }))
})

/*
* 404 Catch All
*/
router.get('*', (req, res) => {
    res.status(404).send("*ex Comment page does exist.");
})

/*
* router export
*/
module.exports = router;