var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));

var photoService = require('../service/PhotoService')
var Photo = require('../model/Photo')

var multiparty = require('multiparty');
var fs = require('fs');
var fsHelper = require('../util/fsHelper')
var dateUtil = require('../util/dateUtil')



// router.post('/upload', function(req, res) {
    
//     const uploadDir= './public/images/';
//     var form = new multiparty.Form({uploadDir:uploadDir});
//     if (!fs.existsSync(uploadDir)){
//         fsHelper.mkdirsSync(uploadDir)
//     }
//     form.parse(req, function(err, fields, files){
//         console.log(fields)
//         if (err) {
//             console.log(err)
//             res.send({"code":1,"msg":err})
//         } else {
//             console.log(fields)
//         }
//     });
    
    
// });


/**
 * 上传图片
 */
router.post('/uploadImage', function(req, res){
    // var photo = new Photo();
    // const uploadDir= './public/images/files/';
    // var form = new multiparty.Form({uploadDir:uploadDir});
    // console.log(req.body.p_name)
    // console.log(form)
    // if (!fs.existsSync(uploadDir)){
    //     fsHelper.mkdirsSync(uploadDir)
    // }
    // form.parse(req, function(err, fields, files){
    //     if (err){
    //         console.log(err)
    //         res.send({"code":1,"msg":err})

    //     }else {
    //         console.log(fields)
    //         var pName = fields.p_name[0];
    //         var url = "";
    //         var desc = fields.p_desc[0];
    //         var pLabel = fields.p_label[0];
    //         var pGroupName = fields.p_groupName[0];
    //         var pUploadTime = dateUtil.getAllDate(); 
    //         photo.setPhoto(null,'2','name','','desc','#pLabel','pGroupName',pUploadTime);
    //         photoService.uploadPhoto(photo,files.file[0],uploadDir,function (result) {
    //             console.log(result)
    //             res.send({"code":0,"msg":"图片上传成功"})

    //         })

    //     }
    // });

    

});


/**
 * 更新照片信息
 *
 */
router.post('/updatePhotoData',function (req, res, next) {
    var name = req.body.p_name;
    var desc = req.body.p_desc;
    var label = req.body.p_label;
    var groupName = req.body.p_groupName;
    var pid = req.body.pid;
    var photo = new Photo();
    photo.setPhoto(pid,null,name,null,desc,label,groupName,null);
    photoService.updatePhoto(photo,function (result) {
        res.json(result);
    })
});

/**
 * 删除照片
 */
router.post('/deletePhoto',function (req, res, next) {
    var url = req.body.p_url;
    var pid = req.body.pid;
    var photo = new Photo();
    photo.setPhoto(pid,null,null,null,null,null,null,null)
    photoService.deletePhoto(photo,function (result) {
        res.json(result)
    })
});

/**
 * 获取主页的照片列表
 */
router.post('/getIndexPhotoList',function (req, res, next) {
    var num = req.body.pageSize;
    var page = req.body.pageNum;
    photoService.getHotPhotoList(num,page,function (result) {
        console.log(result)
        res.json(result);
    });
});





/**
 * 获取所有关注的人的相册
 */
router.post('/getFollowsPhotoList',function (req, res, next) {
    var id = req.body.user_aid;
    var num = req.body.pageSize;
    var page = req.body.pageNum;
    photoService.getFollowsPhoto(id,num,page,function (result) {
        console.log(result);
        res.json(result)
    })
});

/**
 * 获取用户所有相片的路由
 */
router.post('/getUserPhoto',function (req, res, next) {
    var aid = req.body.user_aid;
    photoService.queryPhotoListByAid(aid,function (result) {
        //console.log(result);
        //console.log(result)
        res.json(result);
    });
});

/**
 * 获取相册列表
 */
router.post('/getPhotoList',function (req, res, next) {
   var aid = req.body.user_aid;
   photoService.queryGroupListByAid(aid,function (result) {
        console.log(result);
       res.json(result);
   })

});

/**
 * 获取用户某个相册分组的照片
 */
router.post('/getPhotoByGroupName',function (req, res, next) {
    var aid = req.body.user_aid;
    var groupName = req.body.groupName;
    photoService.queryGroupPhoto(aid,groupName,function (result) {
        console.log(result)
        res.json(result);
    });
});

/**
 * 模糊搜索照片
 */
router.post('/searchPhoto',function(req, res, next){
    var photo = new Photo();
    // var uAid = req.body.uaid;
    // var pName = req.body.pName;
    // var pDesc = req.body.pDesc;
    var pLabel= req.body.pLabel;
    // var pUpLoadTime = req.body.pUpLoadTime;
    photo.setPhoto(null,null,null,null,null,pLabel,null,null);
    photoService.queryPhotoByAllData(photo,function (result) {
        console.log(result)
       res.json(result);
    });
});
/**
 * 修改分组
 */
router.post('/updatePhotoList',function (req, res, next) {
    var bef = req.body.befName;
    var current = req.body.currentName;
    var aid = req.body.user_aid;
    if(bef!=""){
        photoService.updateGroup(aid,current,bef,function (result) {
            //console.log(result);
            res.json(result)
        })
    }else {
        photoService.addNewPhotoGroup(aid,current,function (result) {
            res.json(result)
        })
    }
});

/**
 * 删除相册
 */
router.post('/deleteAlbum',function (req, res, next) {
   var id = req.body.user_aid;
   var albumName = req.body.album_name;
   photoService.deletePhotoGroup(id,albumName,function (result) {
       res.json(result);
   });

});

router.get('/getAllPhoto',function (req, res, next) {

    photoService.getAllPhoto(function(result) {
        res.json(result);
    })
})


module.exports = router;