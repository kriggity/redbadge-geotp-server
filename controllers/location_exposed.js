const router = require('express').Router();
const Location = require('../db').import('../models/location.js');

/*********************
** GET/READ One Location
**********************/
router.get('/:googleid', (req, res) => {
    // Google API id 
    Location.findOne({
        where: {
            googleid: req.params.googleid
        }
    })
        .then(loc => res.status(200).json(loc))
        .catch(err => res.status(500).json({ error: "This location does not exist" }));
})

/*********************
** GET/READ All Locations
**********************/
router.get('/', (req, res) => {
    Location.findAll()
        .then(loc => res.status(200).json(loc))
        .catch(err => res.status(500).json({ error: "No locations exist" }));
})

/*
* 404 Catch All
*/
router.get(['*', '/'], (req, res) => {
    res.status(404).send("*ex Location page does exist.");
})

/*
* router export
*/
module.exports = router;