layui.use('layer', function(){
    var $ = layui.jquery, layer = layui.layer;

    $(document).ready(function() {
        queryAllMemList();
        //addFensList()
        if (isLogin){
                /**
                 * 查询用户分组
                 */
                $.ajax({
                    type: "POST",
                    url: "/users/queryUserGroupList",
                    data: {user_aid: currentId},
                    success: function (msg) {
                        for (var i = 0; i < msg.length; i++) {
                            var temp = "<li><a><i class='layui-icon' style='margin-left: 3px;margin-right: 7px;font-size: 12px; color: #1d1d1d;'>&#xe617;</i>" + msg[i].groupName + "</a></li>";
                            $(".add-new-group").before(temp)
                        }
                        $(".user-relation-middle").find('ul').find('li').click(function () {
                            var gName = $(this).text().substring(1);
                            if ($(this).attr("isAdd")==null){
                                queryListMem(gName)
                            }
                        });

                    }
                });

            /**
             * 初始化关注列表
             */
            $.ajax({
                type: "POST",
                url: "/users/getNumByAid",
                data: {user_aid: currentId},
                success: function (msg) {
                    $('.followNum').text(msg[0].follow);
                    $('.beFollowNum').text(msg[1].beFollow);
                }
            });
            /**
             * 关注查询
             */
            $(".user-relation-top").find('h1').click(function () {
                queryAllMemList();
            });
            $(".user-relation-low").find('h1').click(function () {
                queryAllFansList();
            });



            
            
        }else {
            layer.msg('尚未登录')
        }
    });
});

/**
 * 查询所有粉丝的列表
 */
function queryAllFansList() {
    var url = "/users/getBeFollowList";
    $.ajax({
        type: "POSt",
        url: url,
        data: {user_aid:currentId},
        success: function(msg) {

            $(".relation-group-name").find("h3").text("全部粉丝 " + msg.length)
            addFensList(msg)
        }
    });
}

/**
 * 查询关注的人的列表
 * @param sign
 */
function queryAllMemList() {
    var url= "/users/getFollowList";

    $.ajax({
        type: "POST",
        url: url,
        data: {user_aid:currentId},
        success: function(msg) {

            $(".relation-group-name").find("h3").text("全部关注 " + msg.length)
            addMemberList(msg)
        }
    });
}

/**
 * 查询列表的人
 * @param gName
 */
function queryListMem(gName) {
    $.ajax({
        type: "POST",
        url: "/users/queryListUsers",
        data: {groupName:gName},
        success: function(msg){
            $(".relation-group-name").find("h3").text(gName + " " + msg.length)
            addMemberList(msg)
        }
    });
}

/**
 * 点击展示粉丝列表的
 * @param fanList
 */
function addFensList(fansList) {
    $(".follow_list").html("");
    $(".follow1_box").html("");
    for (var i=0;i<fansList.length;i++){
        //alert(fansList[i].aid)
        var temp =
            "                                      <li class='follow_item S_line2'>\n" +
            "                                        <dl class='clearfix'>\n" +
            "                                            <dt class='mod_pic'>\n" +
            "                                                <a target='_blank' title='Vmil25' href='javascript:;' onclick='interviewOtherUser("+fansList[i].aid+")' >\n" +
            "                                                    <img width='50' height='50' alt='Vmil25' src='//tvax2.sinaimg.cn/crop.9.0.494.494.50/8b211c54ly8fgvkveneehj20e80dq0te.jpg'>\n" +
            "                                                </a>\n" +
            "                                            </dt>\n" +
            "                                            <dd class='mod_info S_line1'>\n" +
            "                                                <div class='info_name W_fb W_f14'>\n" +
            "                                                    <a href='javascript:;' onclick='interviewOtherUser("+fansList[i].aid+")' target='_blank' class='S_txt1'>"+fansList[i].name+"</a>\n" +
            "                                                    <a><i class='W_icon icon_female'></i></a>\n" +
            "                                                </div>\n" +
            "\n" +
            "                                                <div class='info_add'><em class='tit S_txt2'>电话</em>"+fansList[i].phone+"</div>\n" +
            "                                                <div class='info_add'><em class='tit S_txt2'>年龄</em>"+fansList[i].age+"</div>\n" +
            "                                                <div class='info_add'><em class='tit S_txt2'>性别</em>"+fansList[i].sex+"</div>\n" +
            "\n" +
            "                                                <div class='info_intro'><em class='tit S_txt2'>简介</em><span>"+fansList[i].desc+"</span></div>\n" +
            "                                            </dd>\n" +
            "                                            <dd class='opt_box'>\n" +
            "                                                <a href='javascript:;' class='W_btn_b user-relation-follow' id="+fansList[i].aid+">关注</a>\n" +
            "                                                <a href='javascript:;' class='W_btn_b user-relation-removeFans' id="+fansList[i].aid+">移除粉丝</a>\n" +
            "                                            </dd>\n" +
            "                                        </dl>\n" +
            "                                    </li>";
        $(".follow_list").append(temp);
    }
    //关注的监听
    $(".user-relation-follow").click(function () {
        //alert($(this).attr('id'))
        doFollow($(this).attr('id'),null,null)

    });
    //移除粉丝的监听
    $(".user-relation-removeFans").click(function () {
        //alert($(this).attr('id'))
        removeFans($(this))

    });




}

/**
 * 关注操作
 */
function doFollow(toAid,groupNAme,nickname) {
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

/**
 * 移除粉丝
 */
function removeFans (toAid){
    $.ajax({
        type : "POST",
        url : "/users/unDoFollow",
        data :{fromAid:toAid.attr('id'),
            toAid : currentId},
        success:function (msg) {
            layer.msg("移除成功");
            toAid.parents('li').remove();
        }

    });
}

/**
 * 取消关注
 * @param toAid
 */
function undoFollow(toAid){
    $.ajax({
        type : "POST",
        url : "/users/unDoFollow",
        data :{fromAid:currentId,
            toAid : toAid},
        success:function (msg) {
            layer.msg(msg);
        }

    });
}

/**
 * 点击初始化关注列表的方法
 * @param userList
 */
function addMemberList(userList){
    if (userList.length==0){
        layer.msg('此分组没人')
    }
    $(".follow_list").html("");
    $(".follow1_box").html("");

    for (var i=0;i<userList.length/2 -0.5 ; i++){

        setFollow("src",userList[i*2]);
        setFollow("src",userList[i*2+1]);

    }
    if ((userList.length%2) == 1){
        setFollow("src",userList[userList.length-1]);

    }
    //跳入监听
    $(".gotoOtherPage").click(function () {
        var target= $(this).parents(".relation-user-one").find(".uAid").text()
        interviewOtherUser(target)
    });
    //管理的监听
    $(".follow-manger").click(function () {
        var target = $(this)
        undoFollow(target.parent().find(".uAid").text())
        target.parent().parent().remove()
    })
}



/**
 * 设置关注的人的列表
 * @param src
 * @param id
 * @param name
 * @param desc
 */
function setFollow(src,msg){
    var temp =
        "                   <div class='layui-row'>\n" +
        "                        <div class='relation-user-one layui-row' >\n" +

        "                                   <a href='javascript:;' class='W_btn_b follow-manger' >取消关注</a>\n" +
        "                                   <div><a class='gotoOtherPage' href='javascript:;'><img src='../images/kiwi1.jpeg'></a></div>\n" +
        "                                   <div class='relation-user-desc'>\n" +
        "                                       <a class='gotoOtherPage' href='javascript:;'><h1>"+msg.name+"</h1></a>\n" +
        "                                       <p class='uAid' style='display: none'>"+msg.aid+"</p>\n" +
        "                                       <p style='font-size: 12px;margin-top: 5px'>性别："+msg.sex+"</p>\n" +
        "                                       <p style='font-size: 12px;margin-top: 5px'>年龄："+msg.age+"</p>\n" +
        "                                       <p style='font-size: 12px;margin-top: 5px'>简介："+msg.desc+"</p>\n" +

        "                                   </div>\n" +
        "                        </div>" +
        "                    </div>";
    $(".follow1_box").append(temp);
}

/**
 * 搜索用户的方法
 * @param dom
 */
function searchUser(dom){
    var name = dom.parent().find("input").val()
    if(name==""){
        layer.msg('搜索栏不能为空')
    }else{
        $.ajax({
            type : "POST",
            url : "/users/queryUserByData",
            data :{user_name:name},
            success:function (msg) {
                if (msg.length>0){
                    addMemberList(msg)
                }else{
                    layer.msg("查无此人");
                }

            }

        });
    }
}

