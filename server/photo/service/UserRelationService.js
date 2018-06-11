/**
 * 用户关系模块的逻辑层处理类
 * @type {UserRelationDatabase}
 */
var UserRelationDatabase = require('../database/UserRelationDatabase')
var UserReltion = require('../model/UserRelation')

var urd = new UserRelationDatabase();


/**
 * 从路由层传入userRelation模型检查是否有被关注
 * @param ur 用户关注信息
 * @param callback
 */
exports.doFollowOne = function (ur, callback) {
    urd.checkIsFollow(ur,function (data) {
        if(data.length < 1){//还没关注，可以操作
            urd.doFollow(ur,function (result) {
                callback(result);
            })
        }else {
            callback('已经关注过了')
        }
    })
}

/**
 * 从路由层传入userRelation模型检查是否被关注，关注了就能取消关注
 * @param ur
 * @param callback
 */
exports.undoFollowOne = function (ur, callback) {
    urd.checkIsFollow(ur,function (data) {
        if(data.length < 1) {//还没关注
            callback("没关注此人")
        }else {//关注了，取消关注
            urd.undoFollow(ur,function (result) {
                callback(result);
            })

        }
    });
}

/**
 * 查询关注数和粉丝数
 * @param aid
 * @param callback
 */
exports.getFollowAndBeFollowNum = function (aid,callback) {
    urd.queryFollowNums(aid,function (follow) {
       urd.queryBeFollowNums(aid,function (beFollow) {
           callback([follow,beFollow]);
       });
    });
}


/**
 * 修改用户好友信息的逻辑层实现，ur不能有空值
 * @param ur
 * @param callback
 */
exports.modifyGroupOrNickname = function (ur, callback) {
    urd.updateUserRelation(ur,function (result) {
        callback(result);
    });
}

/**
 * 查询关注的人的资料
 * @param aid
 * @param callback
 */
exports.queryFollowData = function (aid, callback) {
    urd.queryFollowByAid(aid,function (result) {
        callback(result);
    })
}

/**
 * 查询粉丝的个人资料
 * @param aid
 * @param callback
 */
exports.queryBeFollowData = function (aid, callback) {
    urd.queryBeFollowByAid(aid,function (result) {
        callback(result);
    })
}

/**
 * 查询用户的关系分组
 * @param aid
 * @param callback
 */
exports.queryUserRelationList = function (aid, callback) {
    urd.queryGroupList(aid,function (result) {
        callback(result);
    })
}
/**
 * 新增用户的一个分组
 * @param aid
 * @param groupName
 * @param callback
 */
exports.addUserRelationList = function (aid, groupName, callback) {
    urd.isExistGroup(aid,groupName,function (result) {
       if (result.length>0){
           callback([false,'已经存在此分组'])
       }else {
           urd.addGroup(aid,groupName,function (result) {
               callback([true,result]);
           })
       }
       console.log(result.length)

    });

}

/**
 * 移除某个用户的分组
 * @param aid
 * @param groupName
 * @param callback
 */
exports.removeUserRelationList = function (aid, groupName, callback) {
    urd.removeGroup(aid,groupName,function (result) {
        urd.afterUpdateGroup(aid,'null',groupName,function (result1) {
            callback(result1);
        });
    });
}

/**
 * 更新某个用户的分组
 * @param aid
 * @param groupName
 * @param groupNameBef
 * @param callback
 */
exports.updateUserRelationList = function (aid, groupName, groupNameBef, callback) {
    urd.updateGroup(aid,groupName,groupNameBef,function (result) {
        urd.afterUpdateGroup(aid,groupName,groupNameBef,function (result) {
            callback(result)
        })
    })
}

/**
 * 查询某用户的列表的其他用户资料
 * @param aid
 * @param groupName
 * @param callback
 */
exports.queryUserDataByGroupName = function (aid, groupName, callback) {


    urd.queryGroupUser(aid,groupName,function (result) {
        callback(result);
    });
}