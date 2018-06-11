
//路径user
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));

var urs = require('../service/UserRelationService');
var uis = require('../service/UserInfoService')
var UserInfo = require('../model/Userinfo')
var UserRelation = require('../model/UserRelation')
/*/!* GET users listing. *!/
router.get('/gg', function(req, res, next) {
    res.send('respond with a resource');
    console.log(123)

});*/

/**
 * 重定向
 */
router.get('/',function (req, res, next) {
    res.redirect('/user/userMain.html');

});

router.get('/css3_3d.css\n' +
    'jq22.css\n' +
    'reset.css',function (req, res, next) {
    res.redirect('/user/otherUser.html');
})


/**
 * 获取用户个人信息的路由
 */
router.post('/getUserInfo',function(req,res,next){
    // console.log('获取个人信息')
    // console.log(req.body.user_aid)
    var aid = req.body.user_aid;   //主界面传过来user_aid
    uis.queryUserinfoByAid(aid,function (result) {
        //console.log(result)
        res.json(result);
        // res.send(result)
    });

});

/**
 * 更新用户个人信息的路由
 */
router.post('/updateUserInfo',function (req, res, next) {
    var userInfo = new UserInfo();

    userInfo.setUser(req.body.aid,req.body.age,req.body.sex,req.body.name,req.body.desc,
                        req.body.phone,req.body.birthday,req.body.hobby);
    uis.updateUserinfo(userInfo,function (result) {
        res.json(result);
    })


});

/**
 * 关注别人
 */
router.post('/doFollow',function (req, res, next) {
    var userRelation = new UserRelation();
    var fromAid = req.body.fromAid;
    var toAid = req.body.toAid;
    var groupName = req.body.groupName;
    var nickname = req.body.nickname;
    userRelation.setUserRelation(fromAid,toAid,groupName,nickname)
    console.log(userRelation)
    urs.doFollowOne(userRelation,function (result) {
        res.json(result);
    });
});

/**
 * 取消关注
 */
router.post('/unDoFollow',function (req, res, next) {
    var userRelation = new UserRelation();
    var fromAid = req.body.fromAid;
    var toAid = req.body.toAid;
    var groupName = req.body.groupName;
    var nickname = req.body.nickname;
    userRelation.setUserRelation(fromAid,toAid,groupName,nickname)
    urs.undoFollowOne(userRelation,function (result) {

        res.json(result);
    });
});

/**
 * 查询粉丝数和关注数
 */
router.post('/getNumByAid',function (req, res, next) {
    var aid = req.body.user_aid;

    urs.getFollowAndBeFollowNum(aid,function (result) {
        //console.log(result)
        res.json(result);
    });
});

/**
 * 更新好友信息
 */
router.post('/updateURByAid',function (req,res,next){
    var ur = new UserRelation();
    ur.setUserRelation(req.body.fromAid,req.body.toAid,req.body.groupName,req.body.nickname);
    urs.modifyGroupOrNickname(ur,function (result) {
        res.json(result);
    })
});

/**
 * 查询关注的人的资料,返回的应该是list
 */
router.post('/getFollowList',function (req, res, next) {
    var aid = req.cookies.currentId;
    urs.queryFollowData(aid,function (result) {
        //console.log(result)
        res.json(result);
    });
});


/**
 * 查询粉丝的资料，返回的应该是list
 */
router.post('/getBeFollowList',function (req, res, next) {
    var aid = req.cookies.currentId;
    urs.queryBeFollowData(aid,function (result) {
        //console.log(result)
        res.json(result);
    });
});

/**
 * 查询用户的好友分组列表
 */
router.post('/queryUserGroupList',function (req, res, next) {
    var aid = req.body.user_aid;
    urs.queryUserRelationList(aid,function (result) {
        //console.log(result)
        res.json(result);
    });
});

/**
 * 新增用户的分组
 */
router.post('/addUserGroup',function (req, res, next) {
    var aid = req.body.user_aid;
    var groupName = req.body.groupName;
    urs.addUserRelationList(aid,groupName,function (result) {
        //console.log(result)
        res.json(result);
    });

});

/**
 * 删除用户分组
 */
router.post('removeUserGroup',function (req, res, next) {
    var aid = req.body.aid;
    var groupName = req.body.groupName;
    urs.removeUserRelationList(aid,groupName,function (result) {
        res.json(result);
    });
});

/**
 * 更新用户分组的信息
 */
router.post('/updateUserGroup',function (req, res, next) {
    var aid = req.body.aid;
    var groupName = req.body.groupName;
    var groupNameBef = req.body.groupName;
    urs.updateUserRelationList(aid,groupName,groupNameBef,function (result) {
        res.json(result);
    });
});

/**
 * 根据用户的aid与分组名查询某分组的用户资料
 */
router.post('/queryListUsers',function (req,res,next) {
   var aid = req.cookies.currentId;
   var groupName = req.body.groupName;
   console.log(groupName)
   urs.queryUserDataByGroupName(aid,groupName,function (result) {
       //console.log(result)
       res.json(result);
   })
});


/**
 * 模糊查询一些用户的资料
 */
router.post('/queryUserByData',function (req, res, next) {
    var name = req.body.user_name;
    var userInfo = new UserInfo();
    userInfo.setUser(null,null,null,name,null,null,null,null);
    uis.queryPartUserInfo(userInfo,function (result) {
        console.log(result);
        res.json(result);
    })
})


module.exports = router;
