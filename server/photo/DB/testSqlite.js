var UserAccountDatabase =require('../database/UserAccountDatabase');
var UserinfoDatabase = require('../database/UserinfoDatabase');
var UserRelationDatabase = require('../database/UserRelationDatabase');
var PhotoDatabase = require('../database/PhotoDatabase');


var UserAccount= require('../model/UserAccount');
var Userinfo = require('../model/Userinfo');
var UserRelation = require('../model/UserRelation');
var Photo = require('../model/Photo')


var usrAD = new UserAccountDatabase();
var UID = new UserinfoDatabase();
var URD  = new UserRelationDatabase();
var pdb = new PhotoDatabase();



//相片模块的sql测试
var photo = new Photo();



//
// //测试好友关系
// var userRelation = new UserRelation();
// userRelation.setUserRelation(1,2,'儿子','一号')
// // URD.update(userRelation)
//
// //查询用户的用户列表
// URD.checkIsFollow(userRelation,function (result) {
//     console.log(result)
// });

// //查询关注数和被关注数
// URD.queryFollowNums(2,function (result) {
//     URD.queryBeFollowNums(2,function (fansNum) {
//         console.log([result.resultSet,fansNum.resultSet])
//     });
// });



/*
用户信息的数据库测试

// var userinfo = new Userinfo();
// userinfo.setUser(2,99,'男',null,null,'phone','1996/02/09','电影')
//
// //模糊查询
// UID.queryPartUserinfo(userinfo)



// // 根据aid查询某个用户的信息
// UID.queryOneUserinfo(1,function (result) {
//     console.log(result)
// })


// //查询用户信息
// UID.queryAllUserinfo(function (result) {
//    console.log(result)
// });


// // 修改用户资料的测试
// UID.modifyUserinfo(userinfo)

// // 新增用户资料的测试，用于用户注册的时候，其余值都设为空
// UID.addUserinfo(userinfo)



*/







/*****************/


// //用户账号的测试
// var userAccount = new UserAccount();
// userAccount.setPassword('2');
// userAccount.setAccount('test1');
// userAccount.setId(2);




//console.log(userAccount.getId());
//修改密码
//usrAcIm.modify(userAccount);
//查询一个数据



//查询某条账户信息
// usrAcIm.queryAccount(userAccount,function (data) {
//  console.log(data)
// });
// console.log(b);

// //查询所有
// usrAcIm.queryAllAcount(function(data){
//     console.log(data)
// });

// //删除部分
// usrAcIm.deleteAccount(userAccount,function () {
//
// });


