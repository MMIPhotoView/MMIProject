/**
 * 照片模块逻辑处理,先写出从数据库读取数据的方法，以后在进行逻辑判断
 * @type {PhotoDatabase}
 */
var PhotoDatabase = require('../database/PhotoDatabase');
var pd = new PhotoDatabase();
var fs = require('fs')


/**
 * 获取首页推荐列表
 * @param num
 * @param page
 * @param callback
 */
exports.getHotPhotoList = function (num, page,callback) {
    pd.getHotPhoto(num,page,function (result) {
        callback(result);
    })
}

/**
 * 上传照片逻辑层   还要写判断是否存在
 * @param photo
 * @param callback
 */
exports.uploadPhoto = function (photo, file,dir,callback) {

    var uploadPath = file.path;
    var postfix = uploadPath.substring(uploadPath.indexOf('.'));

    var dstPath = dir;
    dstPath = dstPath + photo.pUploadTime  +postfix;
    photo.photoUrl = '..'+dstPath.substring(8);

    fs.rename(uploadPath,dstPath,function (err) {
       if (err){
            callback('更名失败')
       }else {
           pd.uploadPhoto(photo,function (result) {
               callback(result)
           });
       }
    });
}

/**
 * 删除照片
 * @param photo
 * @param callback
 */
exports.deletePhoto = function (photo, callback) {

    pd.deletePhoto(photo,function (result) {
        callback(result);
    });
}

/**
 * 更新照片
 * @param photo
 * @param callback
 */
exports.updatePhoto = function (photo, callback) {
    pd.updatePhoto(photo,function (result) {
        callback(result);
    });
}

/**
 * 根据aid查询所有照片的列表
 * @param aid
 */
exports.queryPhotoListByAid = function (aid,callback) {
    pd.queryPhotoListByAid(aid,function (result) {
        callback(result);
    });
}

/**
 * 根据photo实体类,模糊搜索
 * @param photo
 * @param callback
 */
exports.queryPhotoByAllData = function(photo,callback) {
    if (photo) {
        if (photo.uaid==""){
            photo.uaid=null;
        }
        if (photo.pName=="") {
            photo.pName=null;
        }
        if (photo.pDesc=="") {
            photo.pDesc=null;
        }
        if (photo.pLabel=="") {
            photo.pLabel=null;
        }
        if (photo.pUploadTime=="") {
            photo.pUploadTime=null;
        }
        pd.queryPhotoByAllData(photo,function (result) {
            callback(result);
        })
    }else{

    }

}

/**
 * 获取关注的人的照片,按时间排序分页
 * @param aid
 * @param callback
 */
exports.getFollowsPhoto = function (aid,num,page, callback) {
    pd.getFollowsPhoto(aid,num,page,function (result) {
        callback(result);
    })
}

/**
 * 新增用户分组
 * @param aid
 * @param groupName
 * @param callback
 */
exports.addNewPhotoGroup = function (aid, groupName, callback) {
    pd.addNewPhotoGroup(aid,groupName,function (result) {
        callback(result);
    });
}

/**
 * 删除用户分组
 * @param aid
 * @param groupName
 * @param callback
 */
exports.deletePhotoGroup = function (aid, groupName, callback) {
    pd.deletePhotoGroup(aid,groupName,function (result1) {
        pd.afterUpdateGroup(aid,'未分组',groupName,function (result) {
            callback(result);
        })

    });
}

/**
 * 更新
 * @param aid
 * @param groupName
 * @param groupNameBef
 * @param callback
 */
exports.updateGroup = function (aid, groupName, groupNameBef, callback) {
    pd.updateGroup(aid,groupName,groupNameBef,function (resul) {
        pd.afterUpdateGroup(aid,groupName,groupNameBef,function (result) {
            callback(result);
        });
    });
}

/**
 * 查询照片列表
 * @param aid
 * @param callback
 */
exports.queryGroupListByAid = function (aid, callback) {
    pd.queryGroupListByAid(aid,function (result) {
        callback(result)

    });
}

/**
 * 查询用户的照片分组的照片
 *
 * @param aid
 * @param groupName
 * @param callback
 */
exports.queryGroupPhoto = function (aid, groupName, callback) {
    pd.queryGroupPhoto(aid,groupName,function (result) {
        callback(result)
    });
}