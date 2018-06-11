var sqlite3 = require('sqlite3').verbose();


function dvConfig() {

    this.dbc = new sqlite3.Database('webPhoto');

    this.query = function (sql, param, callback) {
        callback = callback || param;
        var db = new sqlite3.Database('webPhoto');//在全局的时候用这个
        //var db = new sqlite3.Database('webPhoto');//测试的时候用这个


        db.all(sql,param,function (err,result) {
            callback(err,result);
            db.close();
        });

    }

    /**
     * 插入数据的数据库模版
     * @param sql
     * @param param
     * @param callback
     */
    this.insert = function (sql, param, callback) {
        callback = callback || param;
        var db = new sqlite3.Database('webPhoto');
        db.run(sql,param,function (err) {
            callback(err);
            db.close();
        });
    }
}





module.exports = dvConfig;