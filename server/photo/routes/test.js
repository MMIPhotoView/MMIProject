// var urs = require('../service/UserRelationService')
// var UserRelation = require('../model/UserRelation')
// var uis = require('../service/UserInfoService')
var fsHelper = require('../util/fsHelper')

// fsHelper.mkdirsSync('../public/images/2/files')

// uis.queryUserinfoByAid(1,function (result) {
//     console.log(result)
// })
//

// var a = {'a':['b'],'c':['d']}
// a['ax'] = ['x']
//
// console.log(a)


// var ur = new UserRelation();
// ur.setUserRelation(2,5,'兄弟','二愣子')

// //关注人
// urs.doFollowOne(ur,function (result) {
//     console.log(result)
// })

// //取消关注
// urs.undoFollowOne(ur,function (result) {
//     console.log(result)
// })

// //查询粉丝数和关注数
// urs.modifyGroupOrNickname(ur,function (result) {
//     console.log(result)
// })

// //查询关注的个人资料
// urs.queryFollowData(1,function (result) {
//     console.log(result)
// })

// //查询用户的分组列表
// urs.queryUserRelationList(1,function (result) {
//     console.log(result)
// })

// //更新用户列表
// urs.updateUserRelationList(1,'哈哈','儿子',function (result) {
//     console.log(result);
// })

// var ps = require('../service/PhotoService')
// var Photo = require('../model/Photo')
//
// var photo = new Photo();
//
// photo.setPhoto(null,null,'山',null,null,null,null,null);
// //上传测试
// ps.uploadPhoto(photo,function (result) {
//     console.log(result);
// })

// // 删除测试
// ps.deletePhoto(photo,function (result) {
//     console.log(result);
// })

// //测试更新
// ps.updatePhoto(photo,function (result) {
//     console.log(result)
// })

// //查询某aid的相片
// ps.queryPhotoListByAid(2,function (result) {
//     console.log(result)
// })

// //模糊搜索
// ps.queryPhotoByAllData(photo,function (result) {
//     console.log(result)
// })

// // 朋友圈功能，看好友分享的照片
// ps.getFollowsPhoto(4,function (result) {
//     console.log(result)
// })

//新增照片分组
// ps.addNewPhotoGroup(2,'你这个傻逼',function (result) {
//     console.log(result)
// })
//
// //删除照片分组
// ps.deletePhotoGroup(2,'嘿哎',function (result) {
//     console.log(result)
// })

// //更新照片分组
// ps.updateGroup(2,'傻逼生活','null',function (result) {
//     console.log(result)
// })

// //查询照片分组
// ps.queryGroupListByAid(2,function (result) {
//     console.log(result)
// })

// //查询用户照片分组的照片
// ps.queryGroupPhoto(2,"傻逼生活",function (result) {
//     console.log(result)
// })

var time = '20171114231152';
console.log(time.substring(0,4))
console.log(time.substring(5,7))
console.log(time.substring(8,10))