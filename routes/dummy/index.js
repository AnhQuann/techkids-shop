var Dummy = require('../../models/dummy');
var express = require('express');
var router = express.Router();


//get All
router.get('/', (req, res) => {
    Dummy.find((err, allDummy) => {
        if (err) {
            res.json({
                success : 0,
                message : "load Failed"
            })
        } else {
            res.json({
                success : 1,
                message : "load OK",
                dummy : allDummy
            })
        }
    })
});


// get One
router.get('/:id', (req, res) => {
    const dummyID = req.params.id
    Dummy.findById(dummyID, (err, dummy) => {
        if (err) {
            res.json({
                success : 0,
                message : "load Failed",
                err
            })
        } else {
            res.json({
                success : 1,
                message : "load OK",
                dummy 
            })
        }
    })
})


//edit
router.patch('/:id', (req, res) => {
    const dummyID = req.params.id
    Dummy.findById(dummyID, (err, dummy) => {
        if (err) {
            res.json({
                success : 0,
                message : "load Failed",
                err
            })
        } else {
            let { title, content } = req.body;
            title = title ? title : dummy.title;
            content = content ? content : dummy.content;

            Dummy.findByIdAndUpdate(dummyID, 
                { title, content }, 
                { new : true }, 
                (err, dummy) => {
                if (err) {
                    res.json({
                        success : 0,
                        message : "update Failed",
                        err
                    })
                } else {
                    res.json({
                        success : 1,
                        message : "update OK",
                        dummy
                    })
                }
            })
        }
    })
})


// delete
router.delete('/:id', (req, res) => {
    const dummyID = req.params.id
    Dummy.findByIdAndRemove(dummyID, (err, dummy) => {
        if (err) {
            res.json({
                success : 0,
                message : "delete failed"
            })   
        } else {
            res.json({
                success : 1,
                message : "delete OK"
            })
        }
    })
})

// save
router.post('/', (req, res) => {
    const body = req.body
    const { title, content } = body

    const dummy = new Dummy({title, content})
    dummy.save((err, savedDummy) => {
        if (err) {
            res.json({
                success : 0,
                message : "save Failed"
            })
        } else {
            res.json({
                success: 1,
                message : "save OK",
                dummy : savedDummy
            })
        }
    })

});

module.exports = router;