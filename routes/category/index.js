const Category = require('../../models/category');
const express = require('express');
const router = express.Router();


// create
router.post('/', (req, res) => {
    const body = req.body;
    const { name } = body;

    const category = new Category({ name });

    category.save((err, savedCategory) => {
        if (err) {
            res.json({
                success : 0,
                message : "save Category Failed",
                err
            })
        } else {
            res.json({
                success : 1,
                message : "save Category Done",
                savedCategory
            })
        }
    })
});

// get All
router.get('/', (req, res) => {
    Category.find((err, allCategory) => {
        if (err) {
            res.json({
                success : 0,
                message : "load all category Failed",
                err
            })
        } else {
            res.json({
                success : 1,
                message : "load all category Done",
                allCategory
            })
        }
    })
})

// get One
router.get('/:id', (req, res) => {
    categoryID = req.params.id;
    Category.findById(categoryID, (err, category) => {
        if (err) {
            res.json({
                success : 0,
                message : "load category Failed",
                err
            })
        } else {
            res.json({
                success : 1,
                message : "load category Done",
                category
            })
        }
    })
})

module.exports = router;
