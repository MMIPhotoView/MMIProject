//用户账号增删改查类


var dbConfig = require('../DB/databaseConfig')
var database = new dbConfig();
/**
 *
 * @constructor
 */
function UserAccountDatabase (){
    var sqlite3 = require('sqlite3').verbose();
    var db = new dbConfig().dbc;
    var UserAccount = require('../model/UserAccount')

    /**
     * 新增账号，只更新数据库，在逻辑层查询是否已有账号
     * @param user
     * @param callback
     */
    this.signUp = function(user,callback) {
        //这里只做写入操作，查重操作在逻辑层地方完成
        if (!user) {
            callback && callback('params error');
            return ;
        }
        db.run("insert into t_user_account values(?, ?, ?)",
            [null,user.getAccount(),user.getPassword()],
            function(err) {
                if (err) {
                    console.log('fail on add ' + err);
                    callback && callback(err);
                } else {
                    callback('用户:'+user.getAccount()+'注册成功');
                }
            });

        // var sql = "insert into t_user_account values(?, ?, ?)";
        // database.insert(sql,'null',user.getAccount(),user.getPassword(),function (err) {
        //     if(err){
        //         console.log(err)
        //         callback && callback(err)
        //     }else{
        //         console.log('用户:'+user.getAccount()+'注册成功');
        //
        //     }
        // });

    }

    /**
     * 修改账户密码操作,验证在逻辑层做,这里只做更新数据库
     * @param user
     * @param callback
     */
    this.modify = function(user,callback){
        console.log('修改操作');
        if (!user) {
            callback && callback('params error');
            return ;
        }
        db.run("update t_user_account set user_password = ? where id = ?",
            [user.getPassword(),user.getId()],
            function(err){
                if (err){
                    console.log('fail on updating table ' + err);
                    callback && callback(err);
                } else {
                    callback && callback(null);
                    console.log('用户账号修改密码操作,id为：'+user.getId()+'用户账号名为:' + user.getAccount());
                }
            });
        // var sql = "update t_user_account set user_password = ? where id = ?";
        // database.query(sql,user.getPassword(),user.getId(),function (err,result) {
        //     if(err){
        //         console.log(err)
        //         callback && callback(err)
        //     }else{
        //         console.log('用户:'+user.getAccount()+'注册成功');
        //         console.log('用户账号修改密码操作,id为：'+user.getId()+'用户账号名为:' + user.getAccount());
        //     }
        // });
    }

    /**
     * 根据账号读一条数据
     * @param user
     * @param callback
     * @returns {*}
     */
    this.queryAccount = function (user, callback) {
        var sql = "select * from t_user_account where user_account = ?"
        database.query(sql,user.getAccount(),function (err,result) {
            if(err){
                console.log(err)
                callback && callback(err)
            }else{
                callback && callback(result);
            }
        });
    }

    /**
     * 查询所有数据
     * @param user
     * @param callback
     */
    this.queryAllAcount = function (callback) {
        var sql = "select * from t_user_account";
        database.query(sql,function (err,result) {
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
     * 部分条件查询
     * @param user
     * @param callback
     */
    this.queryPart = function (user, callback) {
        var sql = "select * from t_user_account";
        var whereSql = "";
        var params = [];
        if (user) {
            if (user.getAccount()) {
                whereSql += ' user_account=?';
                params.push(user.getAccount());
            }
            if (user.getPassword()) {
                console.log(whereSql)
                whereSql += ((whereSql) ? ' and ' : ' ') + "user_password like '%'||?||'%'";
                console.log(whereSql)
                params.push(user.getPassword());
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

    /**
     * 删除账号的数据库操作
     * @param user
     * @param callback
     */
    this.deleteAccount = function (user,callback){
        var sql = 'delete from t_user_account where id = ?';
        if (!user) {
            callback && callback('params error');
            return ;
        }
        db.run(sql,[user.getId()],
            function(err) {
                if (err) {
                    console.log('fail on delete ' + err);
                    callback && callback(err);
                } else {
                    callback && callback();
                    console.log('用户:'+user.getId()+'删除成功');
                }
            });
        // database.query(sql,user.getId(),function (err,result) {
        //     if (err) {
        //         console.log(err)
        //         callback && callback(err)
        //     } else {
        //         console.log('删除了id:'+ user.getId()+'的账号');
        //         callback && callback(result);
        //     }
        // });
    }


}

module.exports = UserAccountDatabase;