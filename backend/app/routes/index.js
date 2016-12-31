'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/users', require('./members'));
router.use('/blog-posts', require('./blog-post'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
