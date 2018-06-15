var express = require('express');
var router = express.Router();

// Sub-routers
var dummyRouter = require('./dummy');
const userRouter = require('./user');
const categoryRouter = require('./category');

router.use( "/dummy", dummyRouter)
router.use( "/user", userRouter)
router.use( "/category", categoryRouter)

module.exports = router;