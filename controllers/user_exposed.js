const router = require('express').Router();
const User = require('../db').import('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

console.log("you're in user_exposed.js")

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
** POST Sign In User
**********************/
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.user.email
        }
    })
        .then(user => {
            console.log(".then in router.post in user_exposed.js")
            if (user) {
                console.log("in the if(user) of the .then in router.post")
                bcrypt.compare(req.body.user.password, user.password, (err, matches) => {
                    if (matches) {
                        console.log("in if(matches) within if(user) of the .then in router.post")

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
                        console.log("in the else of if(matches) inside if(user) in router.post ")

                        res.status(502).send({
                            error: 'Password does not match'
                        })
                    }
                });
            } else {
                console.log("in the else of if(user) in router.post")
                res.status(500).send({
                    error: 'User does not exist'
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
router.get('/:id', (req, res) => {
    if (!isNaN(req.params.id)) { // if id passed is not a number
        User.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(user => {
                if (user) {
                    res.status(200).json(user);
                } else {
                    res.status(500).send({
                        message: 'User does not exist'
                    })
                }
            })
    } else {
        res.status(404).send('Page does not exist'); // if id passed is not a number
    }
})

/*
* 404 Catch All
*/
router.get('*', (req, res) => {
    res.status(404).send("*ex User page does not exist.");
})


/*********************
router export
**********************/
module.exports = router;