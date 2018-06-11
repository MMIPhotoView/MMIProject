var dbConfig = require('../DB/databaseConfig')
var db = new dbConfig().dbc;
var Photo = require('../model/Photo')

/**
 * 相片模块的数据库实现
 * @constructor
 */
function PhotoDatabase(){

    /**
     * 分页查询
     * @param num
     * @param page
     */
    this.getHotPhoto = function (num,page,callback) {
        var pageNum = (page-1) * num;
        // console.log(num)
        // console.log(pageNum)
        var sql = 'select tui.aid,tp.photoUrl,tp.desc,tui.name as user_name,tp.name as photo_name,tui.name,tp.uploadTime from t_photo tp , t_userinfo tui where tp.aid = tui.aid order by tp.uploadTime desc LIMIT ? OFFSET ?';
        db.all(sql,[num,pageNum],function (err,result) {
                if (err) {
                    console.log('fail on add ' + err);
                    callback && callback(err);
                } else {
                    callback(result)
                }
            }
        );
    }


    /**
     * 上传照片
     * @param photo
     */
    this.uploadPhoto = function (photo,callback) {
        var sql = 'insert into t_photo values(?, ?, ?, ?, ?,?,?,?)';
        db.run(sql,
            [null,photo.pAid,photo.pName,photo.photoUrl,photo.pDesc,photo.pLabel,photo.pGroupName,photo.pUploadTime],
            function(err) {
                if (err) {
                    console.log('fail on add ' + err);
                    callback && callback(err);
                } else {
                    callback && callback('上传成功');
                    //console.log('用户:'+uR.fromAid +' 关注了用户：' + uR.toAid);
                }
            }
        );
    }

    /**
     * 删除照片，只要传相片的pid就行
     * @param photo
     */
    this.deletePhoto = function (photo, callback) {
        var sql = 'delete from t_photo where pid = ?';
        db.run(sql,
            [photo.pid],
            function(err) {
                if (err) {
                    console.log('fail on delete ' + err);
                    callback && callback(err);
                } else {
                    callback && callback('删除成功');
                    //console.log('用户:'+uR.fromAid +' 关注了用户：' + uR.toAid);
                }
            }
        );
    }

    /**
     * 更新照片
     * @param photo
     */
    this.updatePhoto = function (photo, callback) {
        db.run("update t_photo set name = ?, desc = ?, label = ? , groupName = ?  where pid = ?",
            [photo.pName,photo.pDesc,photo.pLabel,photo.pGroupName,photo.pid],
            function(err){
                if (err){
                    console.log('fail on updating table ' + err);
                    callback && callback(err);
                } else {
                    callback && callback('更新照片成功');
                    //console.log('用户aid：'+ur.fromAid+'修改用户aid：' + ur.toAid + '备注名');
                }
            }
        );
    }

    /**
     * 根据aid查询某个用户的所有相
     * @param aid
     */
    this.queryPhotoListByAid = function(aid, callback){
        var sql = "select * from t_photo where aid = ?"
        db.all(sql, [aid],
            function(err,result){
                if (err){
                    console.log('fail on query table ' + err);
                    callback && callback(err);
                } else {
                    callback && callback(result);
                    //console.log('用户aid：'+ur.fromAid+'修改用户aid：' + ur.toAid + '备注名');
                }
            }
        );
    }

    /**
     * 根据传入的photo来进行部分查询,模糊查询
     * @param photo
     */
    this.queryPhotoByAllData = function (photo, callback) {
        var sql = "select * from t_photo";
        var whereSql = "";
        var params = [];
        if (photo) {
            if (photo.pAid) {
                whereSql += ' aid=?';
                params.push(photo.pAid);
            }
            if (photo.pName) {
                //console.log(whereSql)
                whereSql += ((whereSql) ? ' and ' : ' ') + "name like '%'||?||'%'";
                //console.log(whereSql)
                params.push(photo.pName);
            }
            if (photo.pDesc) {
                //console.log(whereSql)
                whereSql += ((whereSql) ? ' and ' : ' ') + "desc like '%'||?||'%'";
                //console.log(whereSql)
                params.push(photo.pDesc);
            }
            if (photo.pLabel) {
                whereSql += ((whereSql) ? ' and ' : ' ') + "label like '%'||?||'%'";
                params.push(photo.pLabel);
            }
            if (photo.pUploadTime) {
                whereSql += ((whereSql) ? ' and ' : ' ') + "uploadTime like '%'||?||'%'";
                params.push(photo.pUploadTime);
            }

        }
        if (whereSql) {
            sql += (" where " + whereSql);
        }
        console.log("sql> " + sql);
        db.all(sql,params,function (err, result) {
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
     * 获取关注的人的相片,按时间排序分页
     * @param aid
     */
    this.getFollowsPhoto = function (aid,num,page, callback) {
        var sql = "select tui.aid,tp.photoUrl,tp.desc,tui.name as user_name,tp.name as photo_name,tp.uploadTime from t_photo tp , t_userinfo tui where tp.aid = tui.aid and tp.aid in (select toAid from t_userRelation where fromAid = ?) order by tp.uploadTime desc LIMIT ? OFFSET ?"
        var pageNum = (page-1) * num;
        db.all(sql,[aid,num,pageNum],function (err,result) {
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
     * 新增用户的照片分组
     * @param aid
     * @param photoGroupName
     */
    this.addNewPhotoGroup = function (aid, photoGroupName, callback) {
        var sql = "insert into t_photoGroup values(?, ?, ?)"
        db.run(sql,[null,aid,photoGroupName],function (err) {
                if (err) {
                    console.log('fail on add ' + err);
                    callback && callback(err);
                } else {
                    //console.log(result)
                    callback && callback('新增照片分组成功');
                }
            }
        );
    }

    /**
     * 删除aid用户的的某个组
     * @param aid
     * @param photoGroupName
     */
    this.deletePhotoGroup = function (aid, photoGroupName, callback) {
        var sql = "delete from t_photoGroup where aid = ? and groupName = ?"
        db.run(sql,[aid,photoGroupName],function (err) {
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
     * 更新某个用户相册信息
     * @param aid
     * @param groupName
     * @param groupNameBef
     */
    this.updateGroup = function(aid,groupName,groupNameBef, callback) {
        sql = "update t_photoGroup set groupName = ? where aid = ? and groupName=?"
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
        db.run("update t_photo set groupName = ? where aid = ? and groupName = ?",
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
     * 根据aid查询用户的相册分组列表
     * @param aid
     */
    this.queryGroupListByAid = function (aid, callback) {
        // var sql = "select groupName from t_photoGroup where aid = ?";
        var sql = "select tpg.groupName,0 as count,'../images/bridge.jpg' as photoUrl from t_photoGroup tpg where tpg.aid = ? and tpg.groupName not in (select tp.groupName from t_photo tp where tp.aid = ?) \n" +
            "UNION\n" +
            "select groupName,count(*) as count,photoUrl from t_photo where aid = ? group by groupName";
        db.all(sql,[aid,aid,aid],function (err,result) {
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
     * 根据aid和分组名查询分组内的所有照片
     * @param aid
     * @param groupName
     */
    this.queryGroupPhoto = function (aid, groupName, callback) {
        var sql = "select * from t_photo where aid = ? and groupName = ?";
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
module.exports = PhotoDatabase;