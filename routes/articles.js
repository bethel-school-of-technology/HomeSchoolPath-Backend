const express = require('express');
const router = express.Router();
const Articles = require('../models/articles');

// request get all articles
router.get('/', (req, res) => {
    Articles.find()
    .then(article =>
        res.json(article))
        .catch(err => res.status(400).json(`Error: ${err}`));
});
// request to add A new article
router.post("/add", (req, res) => {
    const newArticle = new Articles({
        title: req.body.title,
        article: req.body.article,
        authorname: req.body.authorname    
    })

    newArticle
    .save()
    .then(() => res.json("The new Article posted successfully!"))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

// find and request article by id
router.get('/:id', (req, res) => {
    Articles.findById(req.params.id)
    .then(article => res.json(article))
    .catch(err => res.status(400).json(`Error: ${err}`)); 
});

// find and request article by id then update
router.put('/update/:id', (req, res) => {
    Articles.findById(req.params.id)
    .then(article => {
        article.title = req.body.title,
        article.article = req.body.article,
        article.authorname = req.body.authorname
        
        article
          .save()
          .then(() => res.json("The Article has been UPDATED successfully!"))
          .catch(err => res.status(400).json(`Error: ${err}`))
    })
    // catch error inside promise the schema above and below for outside defined by id
    .catch(err => res.status(400).json(`Error: ${err}`));
});

// find and request article by id then delete
router.delete('/:id', (req, res) => {
    Articles.findByIdAndDelete(req.params.id)
    .then(() => res.json("The article has been DELETED!"))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
