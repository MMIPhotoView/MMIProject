var dbConfig = require('../DB/databaseConfig')
var database = new dbConfig();

/**
 * userRelation数据库读取基本功能
 * @constructor
 */
function UserRelationDatabase() {
    //var sqlite3 = require('sqlite3').verbose();
    var db = new dbConfig().dbc;

    /**
     * 关注的数据库写入
     * @param userRelation
     * @param callback
     */
    this.doFollow = function (uR, callback) {
        //这里只做写入操作，查重操作在逻辑层地方完成
        if (!uR) {
            callback && callback('params error');
            return ;
        }
        db.run("insert into t_userRelation values(?, ?, ?, ?, ?)",
            [null,uR.fromAid,uR.toAid,uR.groupName,uR.nickname],
            function(err) {
                if (err) {
                    console.log('fail on add ' + err);
                    callback && callback(err);
                } else {
                    callback && callback('关注成功');
                    console.log('用户:'+uR.fromAid +' 关注了用户：' + uR.toAid);
                }
            }
        );
    }
    /**
     * 取消关注
     * @param ur
     * @param callback
     */
    this.undoFollow = function (ur,callback) {
        var sql = 'delete from t_userRelation where fromAid = ? and toAid = ?';
        if (!ur) {
            callback && callback('params error');
            return ;
        }
        db.run(sql,[ur.fromAid,ur.toAid],
            function(err) {
                if (err) {
                    console.log('fail on delete ' + err);
                    callback && callback(err);
                } else {
                    console.log('用户id：'+ur.fromAid+'取消了对用户：'+ur.toAid+'的关注');
                    callback && callback('取消关注成功');

                }
            }
        );
    }

    /**
     * 用于查询是否关注或者被关注
     * @param fromAid
     * @param toAid
     * @param callback
     */
    this.checkIsFollow = function (ur, callback) {
        var sql = "select * from t_userRelation where fromAid = ? and toAid = ?"
        db.all(sql,[ur.fromAid,ur.toAid],function (err,result) {
            if (err){
                console.log('fail on updating table ' + err);
                callback && callback(err);
            } else {
                callback && callback(result);

            }
        });
    }

    /**
     * 修改好友关系的数据库列表
     * @param ur
     * @param callback
     */
    this.updateUserRelation = function(ur,callback){
        if (!ur) {
            callback && callback('params error');
            return ;
        }
        db.run("update t_userRelation set groupName = ? , nickname = ? where fromAid = ? and toAid = ?",
            [ur.groupName,ur.nickname,ur.fromAid,ur.toAid],
            function(err){
                if (err){
                    console.log('fail on updating table ' + err);
                    callback && callback(err);
                } else {
                    callback && callback('修改备注或者分组成功');
                    console.log('用户aid：'+ur.fromAid+'修改用户aid：' + ur.toAid + '备注名');
                }
            }
        );
    }

    /**
     * 关注的人的资料
     * @param fromAid
     * @param callback
     */
    this.queryFollowByAid = function (fromAid, callback) {
        var sql = "select * from t_userinfo where aid in (select toAid from t_userRelation where fromAid = ? ORDER BY toAid ASC)"
        //var sql = "select toAid from t_userRelation where fromAid = ? ORDER BY toAid ASC";//此条上条子查询的内容
        database.query(sql,fromAid,function (err,result) {
            if(err){
                console.log(err)
                callback && callback(err)
            }else{
                //console.log(result)
                callback && callback(result);
            }
        });
    }

    /**
     * 粉丝的个人资料
     * @param toAid
     * @param callback
     */
    this.queryBeFollowByAid = function (toAid, callback) {
        var sql = "select * from t_userinfo where aid in (select fromAid from t_userRelation where toAid = ? ORDER BY toAid ASC)"
        //var sql = "select toAid from t_userRelation where fromAid = ? ORDER BY toAid ASC";//此条上条子查询的内容
        database.query(sql,toAid,function (err,result) {
            if(err){
                console.log(err)
                callback && callback(err)
            }else{
                //console.log(result)
                callback && callback(result);
            }
        });
    }

    /**
     * 查询关注了多少人
     * @param aid
     * @param callback
     */
    this.queryFollowNums = function (aid,callback) {
        var sql = "select count(*) as 'follow' from t_userRelation  where fromAid=?"
        db.get(sql, [aid],
            function(err,result) {
                if (err) {
                    console.log('fail on add ' + err);
                    callback && callback(err);
                } else {
                    //console.log(result)
                    callback && callback(result);

                }
            }
        );
    }


    /**
     * 查询粉丝数
     * @param aid
     * @param callback
     */
    this.queryBeFollowNums = function (aid,callback) {
        var sql = "select count (*) as 'beFollow' from t_userRelation where toAid =?"
        db.get(sql, [aid],
            function(err,result) {
                if (err) {
                    console.log('fail on add ' + err);
                    callback && callback(err);
                } else {
                    //console.log(result)
                    callback && callback(result);

                }
            }
        );
    }

    /**
     * 查询某个用户的用户列表
     * @param aid
     * @param callback
     */
    this.queryGroupList = function(aid,callback){
        var sql = "select groupName from t_userGroup where aid = ?";
        db.all(sql,[aid],function (err,result) {
            if (err) {
                console.log('fail on add ' + err);
                callback && callback(err);
            } else {
                //console.log(result)
                callback && callback(result);

            }
        });

    }

    /**
     * 新增一个用户的分组
     * @param aid
     * @param groudName
     * @param callback
     */
    this.addGroup = function (aid,groupName,callback){
        var sql = "insert into t_userGroup values(?, ?, ?)"
        db.run(sql,[null,aid,groupName],function (err) {
            if (err) {
                console.log('fail on add ' + err);
                callback && callback(err);
            } else {
                //console.log(result)
                callback && callback('新增用户分组成功');
            }
        }
        );
    }

    /**
     * 查询是否存在这个组
     * @param aid
     * @param groupName
     * @param callback
     */
    this.isExistGroup = function (aid, groupName, callback) {
        var sql = "select * from t_userGroup where aid = ? and groupName = ?"
        db.all(sql,[aid,groupName],function (err,result) {
            if (err) {
                console.log('fail on add ' + err);
                callback && callback(err);
            } else {
                //console.log(result)
                callback && callback(result);
            }
        })
    }

    /**
     * 移除某个用户的分组
     * @param aid
     * @param groupName
     * @param callback
     */
    this.removeGroup = function (aid,groupName,callback) {
        var sql = "delete from t_userGroup where aid = ? and groupName = ?"
        db.run(sql,[aid,groupName],function (err) {
            if (err) {
                console.log('fail on add ' + err);
                callback && callback(err);
            } else {
                //console.log(result)
                callback && callback('删除此分组成功');
            }
        });
    }

    

    /**
     * 修改分组名
     * @param aid
     * @param groupName
     * @param groupNameBef
     * @param callback
     */
    this.updateGroup = function(aid,groupName,groupNameBef,callback){
        sql = "update t_userGroup set groupName = ? where aid = ? and groupName=?"
        db.run(sql,[groupName,aid,groupNameBef],function (err) {
            if (err) {
                console.log('fail on add ' + err);
                callback && callback(err);
            } else {
                //console.log(result)
                callback && callback('修改成功');
            }
        }

        );
    }

    /**
     * 修改更新组名之后对关系表的操作
     * @param aid
     * @param groupName
     * @param groupNameBef
     * @param callback
     */
    this.afterUpdateGroup = function (aid, groupName, groupNameBef, callback) {
        db.run("update t_userRelation set groupName = ? where fromAid = ? and groupName = ?",
            [groupName,aid,groupNameBef],
            function(err){
                if (err){
                    console.log('fail on updating table ' + err);
                    callback && callback(err);
                } else {
                    callback && callback('更新成功');

                }
            }
        );
    }


    /**
     * 查询某个分组的好友的个人资料
     * @param aid
     * @param groupName
     * @param callback
     */
    this.queryGroupUser = function (aid,groupName,callback) {
        var sql = "select * from t_userinfo ui where ui.aid in (select toAid from t_userRelation ur where ur.fromAid = ? and ur.groupName = ?)"
        db.all(sql,[aid,groupName],function (err,result) {
            if (err) {
                console.log('fail on add ' + err);
                callback && callback(err);
            } else {
                //console.log(result)
                callback && callback(result);
            }
        });
    }
}


module.exports = UserRelationDatabase;