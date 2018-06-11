var UserAccountDatabase =require('../database/UserAccountDatabase');
var usrAcIm = new UserAccountDatabase();
var UserInfoDB = require('../database/UserinfoDatabase')
var uid = new UserInfoDB();


/**
 *  用户登录功能逻辑层实现
 * @param user
 * @param callback
 */
exports.login = function (user,callback) {

    //console.log(user.getAccount());
    usrAcIm.queryAccount(user,function (data) {
        console.log(data[0])
        var result = false;
        if(data.length<1){
            callback([result,'无此账号'])
        }else {

            if(user.getPassword() ==  data[0].user_password.toString()){
                callback([!result,'登录成功',data[0]])
            }else{
                callback([result,'密码错误'])
            }
        }
        //callback(true);

    });


}
/**
 * 用户注册管理
 * @param user
 * @param callback
 */
exports.signUp = function (user, callback) {

    usrAcIm.queryAccount(user,function (data) {
        if(data.length<1){
            //不存在此账号，数据库写入操作
            usrAcIm.signUp(user,function (result) {
                usrAcIm.queryAccount(user,function (r1) {
                    console.log(r1)
                    uid.addUserinfo(r1[0].id,function (r) {
                        callback([true,'注册成功'])
                    })
                });
            })



        }else{
            //已经存在此账号
            callback([false,'账号已存在'])
        }
    });
}