const router = require('express').Router();
const Location = require('../db').import('../models/location.js');

/*********************
** POST/CREATE One Location
**********************/
router.post('/api/locations/add'), (req, res) => {
    const locData = {
        googleId: req.body.googleid,
        name: req.body.name,
        status: false,
        voteCount: 0
    }
    Location.create(locData)
        .then(loc => res.status(200).json(loc))
        .catch(err => res.status(500).json({ error: err }))
}

/*********************
** GET/READ One Location
**********************/
router.get('/api/locations/:id', (req, res) => {
    // DB id or Google API ID?
    Location.findOne({
        where: {
            googleid: req.params.id
        }
    })
        .then(loc => res.status(200).json(loc))
        .catch(err => res.status(500).json({ error: err }));
})

/*********************
** UPDATE One Location
**********************/
router.put('/api/locations/:id'), (req, res) => {
    // using the DB id, not Google unique id, for this
    if (!isNaN(req.params.id)) {
        const locData = {
            status: req.body.status,
            votecount: req.body.votecount
        }

        Location.update(locData, {
            where: {
                id: req.params.id
            }
        })
            .then(loc => res.status(200).json(loc))
            .catch(err => res.status(500).json({ error: err }))

    } else {
        res.status(404).message("Page does not exist");
    }
}


/*
* router export
*/
module.exports = router;