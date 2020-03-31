const router = require('express').Router();
const User = require('../db').import('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/*********************
** POST/CREATE One User
**********************/
router.post('/api/users/register', (req, res) => {
    let fullName = req.body.user.fullname;
    let email = req.body.user.email;
    let password = req.body.user.password;

    User.create({
        email: email,
        password: bcrypt.hashSync(password, 10),
        fullname: fullName
    })
        .then(
            createSucccess = user => {
                let token = jwt.sign({
                    id: user.id
                },
                    process.env.JWT_SECRET, {
                    expiresIn: 60 * 60 * 24
                });
                res.json({
                    user: user,
                    message: 'user created',
                    sessionToken: token
                });
            },
            createError = err => {
                res.send(500, err.message);
            }
        )
})

/*********************
** POST Sign In User
**********************/
router.post('/api/users/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.user.email
        }
    })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.user.password, user.password, (err, matches) => {
                    if (matches) {

                        let token = jwt.sign({
                            id: user.id
                        },
                            process.env.JWT_SECRET, {
                            expiresIn: 60 * 60 * 24
                        })

                        res.status(200).json({
                            user: user,
                            message: 'successful authentication',
                            sessionToken: token
                        })

                    } else {

                        res.status(502).send({
                            error: 'matches failure'
                        })

                    }
                });
            } else {
                res.status(500).send({
                    error: 'just plain failed'
                })
            }
        }, err => res.status(501).send({
            error: err
        })
        );
});


/*********************
** GET/READ One User
**********************/
router.get('/api/users/:id', (req, res) => {
    if (!isNaN(req.params.id)) { // if id passed is not a number
        User.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(user => res.status(200).json(user))
            .catch(err => res.status(500).json({ error: err })) // if the id passed is a number, but not valid
    } else {
        res.status(404).send('Page does not exist'); // if id passed is not a number
    }
})

/*********************
** UPDATE One User
**********************/
router.put('/api/users/:id', (req, res) => {
    if (!isNaN(req.params.id)) {
        const userData = {
            fullname: req.body.user.fullname,
            email: req.body.user.email,
            password: bcrypt.hashSync(req.params.password, 10)
        }

        User.update(userData, {
            where: {
                id: req.params.id
            }
        })
            .then(user => {
                res.status(200).json({
                    user: user,
                    message: 'update successful'
                });

            })
            .catch(err => res.status(500).json({ error: err }))
    } else {
        res.status(404).send('Page does not exist');
    }
})

/*********************
** DELETE One User
**********************/
router.delete('/api/users/:id', (req, res) => {
    if (!isNaN(req.params.id)) {
        User.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(user => res.status(200).send('User Deleted'))
            .cath(err => res.status(500).json({ error: err }))
    } else {
        res.status(404).send('Page does not exist');
    }
})


/*
* 404 Catch All
*/
router.get('*', (req, res) => {
    res.send(404).send("Page doesn't exist.");
})


/*********************
router export
**********************/
module.exports = router;