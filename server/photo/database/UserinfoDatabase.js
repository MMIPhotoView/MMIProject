var dbConfig = require('../DB/databaseConfig')
var database = new dbConfig();

/**
 * user的基础信息
 * @constructor
 */
function UserinfoDatabase(){
    var sqlite3 = require('sqlite3').verbose();
    var db = new dbConfig().dbc;

    /**
     * 新增用户资料的测试，用于用户注册的时候，其余值都设为空
     * @param userinfo
     * @param callback
     */
    this.addUserinfo = function (aid, callback) {
        if (!aid) {
            callback && callback('params error');
            return ;
        }
        db.run("insert into t_userinfo values(?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [null,aid,"请到管理界面修改","请到管理界面修改","请到管理界面修改","请到管理界面修改","请到管理界面修改","请到管理界面修改","请到管理界面修改"],
            function(err) {
                if (err) {
                    console.log('fail on add ' + err);
                    callback && callback(err);
                } else {
                    callback && callback();

                }
            });
    }

    /**
     * 修改个人资料的方法
     * @param userinfo
     * @param callback
     */
    this.modifyUserinfo = function (userinfo, callback) {
        if (!userinfo) {
            callback && callback('params error');
            return ;
        }
        db.run("update t_userinfo set age = ?, sex = ?, name = ?, desc = ?" +
            ", phone = ?, birthday = ?, hobby = ? where aid = ?",
            [userinfo.age,userinfo.sex,userinfo.name,userinfo.desc,userinfo.phone,userinfo.birthday,userinfo.hobby,userinfo.aid],
            function(err){
                if (err){
                    console.log('fail on updating table ' + err);
                    callback && callback(err);
                } else {
                    callback && callback('修改成功');
                    console.log('用户修改个人信息操作,aid为：'+userinfo.aid+'用户名字为:' + userinfo.name);
                }
            });
    }

    /**
     * 查询所有用户资料的方法
     * @param callback
     */
    this.queryAllUserinfo = function(callback){
        var sql = "select * from t_userinfo";
        db.all(sql,function (err,result) {
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
     * 根据user的aid查询整条user的数据
     * @param userinfo
     * @param callback
     */
    this.queryOneUserinfo = function (aid,callback) {
        var sql = "select * from t_userinfo where aid = ?"
        database.query(sql,aid,function (err,result) {
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
     * 根据userinfo的资料，对用户进行搜索，可用于模糊查询
     * @param userinfo
     * @param callback
     */
    this.queryPartUserinfo = function (userinfo, callback) {
        var sql = "select * from t_userinfo";
        var whereSql = "";
        var params = [];
        if (userinfo) {
            if (userinfo.name) {
                whereSql += " name like '%'||?||'%'";
                params.push(userinfo.name);
            }
            if (userinfo.desc) {
                whereSql += ((whereSql) ? ' and ' : ' ') + "desc like '%'||?||'%'";
                //console.log(whereSql)
                params.push(userinfo.desc);
            }
            if (userinfo.hobby) {
                whereSql += ((whereSql) ? ' and ' : ' ') + "hobby like '%'||?||'%'";
                //console.log(whereSql)
                params.push(userinfo.hobby);
            }

        }
        if (whereSql) {
            sql += (" where " + whereSql);
        }
        console.log("sql> " + sql);
        database.query(sql,params,function (err, result) {
            if(err){
                console.log(err)
                callback && callback(err)
            }else{
                console.log(result)
                callback && callback(result);
            }
        });
    }

}

module.exports = UserinfoDatabase;