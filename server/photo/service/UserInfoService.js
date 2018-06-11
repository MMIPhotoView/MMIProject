var UserAccountDatabase =require('../database/UserAccountDatabase');
var userADB = new UserAccountDatabase();
var UserinfoDatabase = require('../database/UserinfoDatabase')
var userinfoDB = new UserinfoDatabase();



/**
 * 逻辑层，从路由传aid过来，在此查询用户信息
 * @param aid
 * @param callback
 */
exports.queryUserinfoByAid = function (aid, callback) {
    userinfoDB.queryOneUserinfo(aid,function (result) {
       callback(result);
    });

}

/**
 * 逻辑层：服务器获取请求，返回所有用户的列表
 * @param callback
 */
exports.queryAllUserinfo = function (callback) {
    userinfoDB.queryAllUserinfo(function (result) {
        callback(result);
    })
}

/**
 * 逻辑层：传入userinfo然后更新数据库
 * @param userinfo
 * @param callback
 */
exports.updateUserinfo = function (userinfo, callback) {
    userinfoDB.modifyUserinfo(userinfo,function (result) {
        callback(result);
    });
}


/**
 * 根据userinfo的model对此进行模糊查询
 * @param userinfo
 * @param callback
 */
exports.queryPartUserInfo = function (userinfo, callback) {
    userinfoDB.queryPartUserinfo(userinfo,function (result) {
        callback(result);
    });
}