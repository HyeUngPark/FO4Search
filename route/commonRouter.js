/* 
    공통 라우팅
*/
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    console.log("/");

    res.render('index.html');
});

module.exports = router;