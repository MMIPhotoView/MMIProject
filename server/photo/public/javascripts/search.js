/**
 * 搜索用户的方法
 * @param dom
 */
function searchUser(dom){
    var name = dom.parents(".photo-search-bar").find("input").val()
    if(name==""){
        layer.msg('搜索栏不能为空')
    }else{
        $.ajax({
            type : "POST",
            url : "/users/queryUserByData",
            data :{user_name:name},
            success:function (msg) {
                if (msg.length>0){
                    addList(msg)
                }else{
                    layer.msg("查无此人");
                }

            }

        });
    }
}

/**
 * 查询列表
 * @param list
 */
function addList(list) {
    $(".search-list").html("")
    for (var i = 0;i<list.length;i++){
        var temp = stringUser(list[i]);
        $(".search-list").append(temp)
    }

    $(".follow").click(function () {
        doFollow($(this).attr('id'),'未分组','无')
    })
}

/**
 * 返回格式化之后的列表
 * @param msg
 */
function stringUser(msg){
    return  "                                      <li class='follow_item S_line2'>\n" +
        "                                        <dl class='clearfix'>\n" +
        "                                            <dt class='mod_pic'>\n" +
        "                                                <a target='_blank' title='Vmil25' href='/u/2334202964?refer_flag=1005050005_'>\n" +
        "                                                    <img width='50' height='50' alt='Vmil25' src='//tvax2.sinaimg.cn/crop.9.0.494.494.50/8b211c54ly8fgvkveneehj20e80dq0te.jpg'>\n" +
        "                                                </a>\n" +
        "                                            </dt>\n" +
        "                                            <dd class='mod_info S_line1'>\n" +
        "                                                <div class='info_name W_fb W_f14'>\n" +
        "                                                    <a target='_blank' class='S_txt1 ' onclick='interviewOtherUser("+msg.aid+")'>"+msg.name+"</a>\n" +
        "                                                    <a><i class='W_icon icon_female'></i></a>\n" +
        "                                                </div>\n" +
        "\n" +
        "                                                <div class='info_add'><em class='tit S_txt2'>电话</em>"+msg.phone+"</div>\n" +
        "                                                <div class='info_add'><em class='tit S_txt2'>年龄</em>"+msg.age+"</div>\n" +
        "                                                <div class='info_add'><em class='tit S_txt2'>性别</em>"+msg.sex+"</div>\n" +
        "\n" +
        "                                                <div class='info_intro'><em class='tit S_txt2'>简介</em><span>"+msg.desc+"</span></div>\n" +
        "                                            </dd>\n" +
        "                                            <dd class='opt_box'>\n" +
        "                                                <a href='javascript:;' class='W_btn_b follow' id="+msg.aid+">关注</a>\n" +
        "                                            </dd>\n" +
        "                                        </dl>\n" +
        "                                    </li>";
}

/**
 * 关注操作
 */
function doFollow(toAid,groupNAme,nickname) {
    if (currentId==null){
        layer.msg('你还没登录呢')
    }else {

        $.ajax({
            type: "POST",
            url: "/users/doFollow",
            data: {
                fromAid: currentId,
                toAid: toAid,
                groupName: groupNAme,
                nickname: nickname
            },
            success: function (msg) {
                layer.msg(msg);
            }
        });
    }
}