var currentPhotoGroup;
var targetId;
var userName;
var isUploadOpen = false;
layui.use('layer', function() {
    var $ = layui.jquery, layer = layui.layer;



    $(document).ready(function() {

        targetId = getCookie('otherUserAid');
        //alert(targetId)
        deleCookie('otherUserAid');
        //alert(targetId)
        //获取个人信息
        getUserInfo(targetId);
        getFollowNum(targetId);
        //获取照片分组列表
        getPhotoList(targetId);
        //搜索照片的初始化
        searchFun();
        $(".allPhotoButton").click(function () {
            getAllPhoto(targetId);
        })



    });
});

/**
 * 获取关注数和粉丝数
 * @param id
 */
function getFollowNum(id){
    $.ajax({
        type: "POST",
        url: "/users/getNumByAid",
        data: {user_aid:id},
        success: function(msg){
            $('.followNum').text(msg[0].follow);
            $('.beFollowNum').text(msg[1].beFollow);
            $('.followNum').parent().parent().click(function () {
                layer.msg('个人隐私，不可查看')
            })
            $('.beFollowNum').parent().parent().click(function () {
                layer.msg('个人隐私，不可查看')
            })
        }
    });
}

/**
 * 获取访问客户的信息
 *
 * @param id
 */
function getUserInfo(id) {
    $.ajax({
        type: "POST",
        url: "/users/getUserInfo",
        data: {user_aid:id},
        success: function(msg){
            userName = msg[0].name;
            $('#name').text(msg[0].name)
            $('#desc').text(msg[0].desc)
            $('#aid').text(msg[0].aid)
            $('#birthday').text("生日："+msg[0].birthday)
            $('#sex').text("性别："+msg[0].sex)
            $('#phone').text("电话："+msg[0].phone)
            $('#hobby').text("兴趣爱好："+msg[0].hobby)
            //获取此用户的所有照片
            getAllPhoto(id);
        }
    });
}

/**
 * 获取全部图片
 */
function getAllPhoto(id){
    $.ajax({
        type: "POST",
        url: "/photo/getUserPhoto",
        data: {user_aid:id},
        success: function(msg){
            $("#photoNum").text(msg.length);
            if (msg.length>0){
                showPhoto(msg);
            }else {
                layer.msg('此用户没有上传图片')
            }
        }
    });
}
/**
 * 根据服务器翻来的list，新增不同区的图片
 */
function showPhoto(msg){
    $(".allPhoto").html("");
    var un = $("#name").text();
    for(var i=0;i<msg.length;i++){
        var temp = "<div class='user-photo-block'>\n" +
            "                            <div class='user-small-icon layui-row'>\n" +
            "                                <ul >\n" +
            "                                    <li>\n" +
            "                                        <img src="+msg[i].photoUrl+" >\n" +
            "                                    </li>\n" +
            "                                    <li style='margin-top: 30px'>\n" +
            "                                        <h1>图片名称:"+msg[i].name+"</h1>\n" +
            "                                        <p> 上传时间:"+setTimeFormat(msg[i].uploadTime)+"</p>\n" +
            "                                        <p> 标签:"+msg[i].label+"</p>\n" +
            "                                    </li>\n" +
            "                                </ul>\n" +
            "                            </div>\n" +
            "                            <div class='user-photo layui-row'>\n" +
            "                                <p class='photo-desc'>"+msg[i].desc+"</p>\n" +
            "                                <img src="+msg[i].photoUrl+" >\n" +
            "                            </div>\n" +
            "                            <div class='photo-down' style='padding-left: 100px'>\n" +
            "                                评论区，最后在加功能\n" +
            "                            </div>\n" +
            "                        </div>";
        $(".allPhoto").append(temp);
    }
}

/**
 * ajax获取用户相册列表
 */
function getPhotoList(id){
    $.ajax({
        type: "POST",
        url: "/photo/getPhotoList",
        data: {user_aid:id},
        success: function(msg){
            addPhotoGroup(msg);


        }
    });
}
/**
 * 在相册列表中增加分组名
 * @param groupList
 */
function addPhotoGroup(groupList){
    for (var i=0;i<groupList.length;i++){
        var groupName = groupList[i].groupName;
        var temp = "<dd><a href='javascript:;'>"+groupName+"</a></dd>";
        $(".photo-album").append(temp)
    }
    $(".photo-album").find('dd').click(function () {
        currentPhotoGroup = $(this).find('a').text();
        getPhotoListByGroupName(currentPhotoGroup);
    });
}

/**
 * ajax根据用户照片分组来查询照片
 * @param groupName
 */
function getPhotoListByGroupName(groupName){
    $.ajax({
        type: "POST",
        url: "/photo/getPhotoByGroupName",
        data: {user_aid:targetId,
            groupName : groupName},
        success: function(msg){
            if (msg.length<=0){
                layer.msg('此分组没照片')
            }else {
                showPhoto(msg);
            }
        }
    });
}

/**
 * 模糊搜索的方法
 */
function searchFun(){
    //搜索条件
    $(".search-icon").click(function () {
        $.ajax({
            type:"POST",
            url:"/photo/searchPhoto",
            data:{
                uaid:targetId,
                pName:$("#search-my-photo").val(),
                pDesc:$("#search-desc").val(),
                pLabel:$("#search-label").val(),
                pUpLoadTime:""
            },
            success:function (msg) {
                if (msg.length>0){
                    showPhoto(msg);
                }else {
                    layer.msg('没有满足条件的图片')
                }
            }
        });
    })
    //更多搜索条件的按钮
    $(".search-icon-more").click(function () {
        if (isUploadOpen){
            $(".search-photo-block").hide(1000);
            isUploadOpen = false;
        }else {
            $(".search-photo-block").show(1000);
            isUploadOpen = true;
        }

    });
}
/**
 * 关注操作
 */
function doFollow(toAid,groupNAme,nickname) {
    if (toAid==""){
        layer.msg("出错误了")
    }else{

        $.ajax({
            type : "POST",
            url : "/users/doFollow",
            data :{fromAid:currentId,
                toAid : toAid,
                groupName : groupNAme,
                nickname : nickname},
            success:function (msg) {
                layer.msg(msg);
            }
        });
    }
}