const router = require('express').Router();
const User = require('../db').import('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/*********************
** POST/CREATE One User
**********************/
router.post('/register', (req, res) => {
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
** UPDATE One User
**********************/
router.put('/:id', (req, res) => {
    if (!isNaN(req.params.id)) {

        const paramPass = bcrypt.hashSync(req.body.user.password, 10);

        // Incoming data from the page/form
        const userData = {
            id: req.params.id,
            fullname: req.body.user.fullname,
            email: req.body.user.email,
            password: paramPass
        }

        User.findOne({
            where: {
                id: userData.id
            }
        })
            .then(user => {
                if (user) {
                    // This is the object of data from the DB
                    const dbData = {
                        fullname: user.fullname,
                        email: user.email,
                        password: user.password
                    }

                    // This is the object that will be updated into the DB
                    let newData = {
                        fullname: dbData.fullname,
                        email: dbData.email,
                        password: dbData.password
                    }

                    // If the incoming data is different from the data in the DB, assign the new values to the newData object
                    // TODO: write these if statements more concise and less hardcoded
                    if (userData.fullname !== dbData.fullname) {
                        newData.fullname = userData.fullname;
                    }
                    if (userData.email !== dbData.email) {
                        newData.email = userData.email;
                    }
                    if (userData.password !== dbData.password) {
                        newData.password = userData.password;
                    }

                    User.update(newData, {
                        where: {
                            id: userData.id
                        }
                    })
                        .then(user => {
                            res.status(200).json({
                                user: user,
                                message: 'Successfully updated'
                            })
                        })
                        .catch(err => {
                            res.status(500).json({
                                error: err,
                                message: "Updated failed"
                            })
                        })
                } else {
                    res.status(502).send({ error: 'User does not exist' })
                }
            })
    } else {
        res.status(400).send({ error: 'Incorrect id. Need a number.' })
    }
})

/*********************
** DELETE One User
**********************/
router.delete('/delete/:id', (req, res) => {
    if (!isNaN(req.params.id)) {
        User.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(user => res.status(200).send('User Deleted'))
            .catch(err => res.status(500).json({ error: err }))
    } else {
        res.status(400).send({ error: 'Incorrect id. Need a number.' })
    }
})


/*
* 404 Catch All
*/
router.get('*', (req, res) => {
    res.status(404).send("*User page does not exist.");
})


/*********************
router export
**********************/
module.exports = router;