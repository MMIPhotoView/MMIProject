var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var accountService = require('../service/AccountService')
var UserAccount = require('../model/UserAccount')

router.use(bodyParser.urlencoded({ extended: false }));

/**
 * 登录的路由
 */
router.post('/signIn', function(req, res, next) {
    console.log('客户端'+req.body.user_account)
    var userAccount = new UserAccount();
    userAccount.setAccount(req.body.user_account.toString());
    userAccount.setPassword(req.body.user_password.toString());
    accountService.login(userAccount,function (result) {

        console.log(result)
        var ret = {};
        ret.isLogin = result[0];
        if(result[0]) {
            ret.account = result[2];
        }

        res.json(ret);
    });
});


router.post('/a',function (req, res, next) {
    res.json("123");
})

/**
 * 注册的路由
 */
router.post('/signUp',function (req, res, next) {
    var userAccount = new UserAccount();
    userAccount.setAccount(req.body.signup_account.toString());
    userAccount.setPassword(req.body.signup_password.toString());
    accountService.signUp(userAccount,function (result) {
        console.log(result)
        res.json(result)
    });
    //res.json("123");

});






module.exports = router;