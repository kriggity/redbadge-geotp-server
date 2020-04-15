const router = require('express').Router();
const Location = require('../db').import('../models/location.js');

/*********************
** POST/CREATE One Location
**********************/
router.post('/add', (req, res) => {
    console.log("*** you're in router.post locationcontroller.js")
    console.log(" googleid : ", req.body.location.googleid)
    console.log("name: ", req.body.location.name)
    console.log("status: ", req.body.location.status)
    
    const locData = {
        googleid: req.body.location.googleid,
        name: req.body.location.name,
        status: req.body.location.status,
        votecount: 1
    }
    // res.status(200).json({location: locData});
    Location.create(locData)
        .then(loc => res.status(200).json({ location: loc, message: 'Location successfully added' }))
        .catch(err => res.status(500).json({ error: err, message: 'Location could not be added' }))
})

/*********************
** UPDATE One Location
**********************/
router.put('/:googleid', (req, res) => {
    // using the Google unique id
    const locData = {
        status: req.body.location.status,
        votecount: req.body.location.votecount
    }

    Location.update(locData, {
        where: {
            googleid: req.params.googleid
        }
    })
        .then(loc => res.status(200).json({ location: loc, message: 'Location successfully updated' }))
        .catch(err => res.status(500).json({ error: "Could not update this location" }))

})

/*
* 404 Catch All
*/
router.get(['*', '/'], (req, res) => {
    res.status(404).send("*Location page does exist.");
})

/*
* router export
*/
module.exports = router;