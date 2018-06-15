const User = require('../../models/user');
const express = require('express');
const router = express.Router();


// create new user
router.post('/', (req, res) => {
    const body = req.body;
    const { firstName, lastName, email, username, password, role } = body;

    const user = new User({ firstName, lastName, email, username, password, role });
    
    user.save((err, savedUser) => {
        if (err) {
            res.json({
                success : 0,
                message : "save User Failed",
                err
            })
        } else {
            res.json({
                success : 1,
                message : "save User Done",
                user : savedUser
            })
        }
    })
});


// get All user
router.get('/', (req, res) => {
    User.find((err, allUser) => {
        if (err) {
            res.json({
                success : 0,
                message : "load all user Failed",
                err
            })
        } else {
            res.json({
                success : 1,
                message : "load all user Done",
                allUser
            })
        }
    })
});


//get One User
router.get('/:id', (req, res) => {
    const userID = req.params.id
    User.findById(userID, (err, user) => {
        if (err) {
            res.json({
                success : 0,
                message : "load oneUser Failed",
                err
            })
        } else {
            res.json({
                success : 1,
                message : "load oneUser Done",
                user
            })
        }
    })
})


// edit User
router.patch('/:id', (req, res) => {
    const userID = req.params.id
    User.findById(userID, (err, user) => {
        if (err) {
            res.json({
                success : 0,
                message : "load Failed",
                err
            })
        } else {
            let { firstName, lastName, email, username, password, role } = req.body;
            firstName = firstName ? firstName : user.firstName;
            lastName = lastName ? lastName : user.lastName;
            email = email ? email : user.email;
            username = username ? username : user.username;
            password = password ? password : user.password;
            role = role ? role : user.role;


            User.findByIdAndUpdate( userID,
                {   
                    firstName, 
                    lastName,
                    email, 
                    username, 
                    password, 
                    role 
                },
                { new : true},
                (err, user) => {
                    if (err) {
                        res.json({
                            success : 0,
                            message : "update Failed",
                            err
                        })
                    } else {
                        res.json({
                            success : 1,
                            message : "update DONE",
                            user
                        })
                    }
                })
        }
    })
})


module.exports = router;