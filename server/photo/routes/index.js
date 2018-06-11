var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
/* GET home page. */
router.post('/', function(req, res, next) {
  res.end('主页');
  //返回主界面信息

});






module.exports = router;
