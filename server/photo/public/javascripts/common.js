
var isLogin = false;
var currentId = null;
var befAlbumName="";
var delAlbum;
/**
 * jquery监听
 */
$(document).ready(function(){
    //用于判断是否有登录的
    if(getCookie("currentId")!="" && getCookie("currentId")!=null){
        currentId = getCookie("currentId");
        isLogin = true;
    }

    $(".myPage").click(function () {

    })

    $(".update").click(function () {
        logout();
    });

    $(".user").click(function () {
        if(currentId!=null){
            layer.msg( currentId);
            logout()
        }else{
            layer.msg('未登录')
        }
    });

    layui.use('layer', function(){ //独立版的layer无需执行这一句
        var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
        //触发事件
        var active = {

            albumMangerFrame : function(){
                layer.open({
                    type: 1,
                    title: ['新增分组', 'font-size:18px;'],
                    area: '500px,400px',
                    closeBtn: false,
                    shadeClose: false,
                    shade: [0.3, '#393D49'],
                    content: $(".manager-album")
                    //['../admin/signIn.html']
                });
            }
        };
        $(".creat").click(function () {
            befAlbumName ="";
            var othis = $(this), method = othis.data('method');
            active[method]($(this)) ? active[method].call(this, othis) : '';
        })

    });
});
//导航条



layui.use('element', function(){
    var element = layui.element;
    element.on('nav(mainBar)', function(elem){


    });
});



/**
 * 弹出层
 */
layui.use('layer', function(){ //独立版的layer无需执行这一句
    var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
    //触发事件
    var active = {

        showLoginFrame : function () {
                layer.open({
                    type: 1,
                    title: ['登录', 'font-size:18px;'],
                    area: '500px,400px',
                    closeBtn: 1,
                    shadeClose: false,
                    shade: [0.3, '#393D49'],
                    content: $(".login")
                        //['../admin/signIn.html']
                });

        }


    };

    $(".user").on('click', function(){
        if(!isLogin){
            var othis = $(this), method = othis.data('method');
            active[method] ? active[method].call(this, othis) : '';
        }else{

            layer.msg("当前用户:"+currentId)
        }

    });
});
/**
 * 表单
 */
layui.use('form', function(){
    var form = layui.form;

    /**
     * 注册表单提交和监听
     */
    form.on('submit(formDemo)', function(data){
        $.ajax({
            type: "POST",
            url: "/accounts/signIn",
            data: {user_account:data.field.user_account,
                user_password:data.field.user_password},
            success: function(msg){
                layer.msg(msg[1])
                if(msg[0]){
                    afterLoginIn(msg[2].id);
                    //$(".login").hide()
                }


            }
        });
        //alert(data.field.user_account);
        return false;
    });

    form.verify({
        username: function(value, item){ //value：表单的值、item：表单的DOM对象
            if(!new RegExp("^[a-zA-Z0-9_s·]+$").test(value)){
                return '用户名不能有特殊字符,不能为中文';
            }
            if(/(^\_)|(\__)|(\_+$)/.test(value)){
                return '用户名首尾不能出现下划线\'_\'';
            }
            if(/^\d+\d+\d$/.test(value)){
                return '用户名不能全为数字';
            }
        }

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        ,pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ]
    });


});
/**
 * 登录之后的操作
 */
function afterLoginIn(id){
    setCookie("currentId",id,15);
    isLogin = true;
    layer.closeAll();
    layer.msg("登录成功！请骚等")
    setTimeout("location.reload()", 1000 )
}

/**
 * 注销
 */
function logout(){
    deleCookie("currentId");
    currentId=null;
    layer.msg("注销账号")
    setTimeout("$(window).attr('location','../index.html')", 1000 )
}



/**
 * 设置时间
 * @param time
 */
function setTimeFormat(time){
    return time.substring(0,4) + "-" +time.substring(4,6)+"-"+time.substring(6,8);

}

/**
 * 访问其他用户的方法
 * @param id
 */
function interviewOtherUser(id){
    setCookie('otherUserAid',id,15);
    //alert(id)
    $(window).attr('location','../user/otherUser.html');
}

/**
 * 根据选择判断打开用户的主界面，还是我的相册 或者我的管理
 * @param dom
 */
function switchBBlock(dom) {
    dom.parents("tr").find(".current").removeClass("current");
    dom.parent().addClass("current")
    $(".user-dynamic-data").hide();
    $(".user-photo-album").hide();
    $(".user-data-manage").hide();
    if (dom.parent().attr("type")==1){
        $(".user-dynamic-data").fadeIn(200);
    }else if (dom.parent().attr("type")==2){
        $(".user-photo-album").fadeIn(200);
        if (dom.attr("current")=="own"){
            getPhotoAlbumList(currentId)
        }
    }else if (dom.parent().attr("type")==3){
        $(".user-data-manage").fadeIn(200);
    }else{
        alert(dom.parent().attr("t1"))
    }

}

/**
 * ajax获取用户相册列表
 */
function getPhotoAlbumList(id){
    $.ajax({
        type: "POST",
        url: "/photo/getPhotoList",
        data: {user_aid:id},
        success: function(msg){
            addPhotoAlbum(id,msg);
        }
    });
}

/**
 * 在相册中新增li
 */
function addPhotoAlbum(id,list) {
    $(".photo-album-num").text("共（"+list.length+"）个");
    $(".albumlists").html("")
    for (var i = 0; i < list.length; i++){
        var temp = "<li>\n" +
                "                        <div class='m_fav_album'>\n" +
                "                            <div class='m_cover m_cover_c'>\n" +
                "                                <div class='img_wrap'>\n" +
                "                                    <a title='头像相册' href='javascript:;' undefined=''>\n" +
             "                                        <img width='150' height='150' class='img' src='"+list[i].photoUrl+"'>\n" +
                "                                        <span class='count'>"+list[i].count+" 张</span>\n" +
                "                                    </a>\n" +
                "                                </div>\n" +
                "                            </div>\n" +
                "                            <div class='detail'>\n" +
                "                                <p class=\"title\">\n" +
                "                                    <a class='M_linkb' href='javascript:;' undefined=''>\n" +
                "                                        <strong title="+list[i].groupName+">"+list[i].groupName+"</strong>\n" +
                "                                    </a>\n" +
                "                                </p>\n" +
                "                                <p class='status M_txtb'>\n" +
                "                                    <span title='所有人可见' class='M_ico '></span>\n" +
                "                                    <span class='M_txtb time'></span>\n" +
                "                                </p>\n" +
                "                                <p class='edit M_txtd'></p>\n" +
            "                                    <a href='javascript:;' class='album-manger' data-method='albumMangerFrame'>编辑</a>\n" +
            "                                    <span class=\"M_vline\"></span>\n" +
            "                                    <a href='javascript:;' class='del-Album' data-method='delAlbum'>删除</a>"+
                "                            </div>\n" +
                "                        </div>\n" +
                "                    </li>"
            $(".albumlists").append(temp)
    }
    /**
     *
     * 弹出层
     */
    layui.use('layer', function(){ //独立版的layer无需执行这一句
        var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
        //触发事件
        var active = {

            albumMangerFrame : function(){
                layer.open({
                    type: 1,
                    title: ['新增分组', 'font-size:18px;'],
                    area: '500px,400px',
                    closeBtn: false,
                    shadeClose: false,
                    shade: [0.3, '#393D49'],
                    content: $(".manager-album")
                    //['../admin/signIn.html']
                });
            },

            delAlbum : function (dom) {
                layer.confirm('真的要删除这玩意吗？', {
                    btn: ['确定删除'] //按钮
                }, function(a,b){
                    var groupName = $(dom).parent().find("strong").text();
                    //删除相册
                    deleteAlbum(currentId,groupName,dom)
                    layer.msg('删除了', {icon: 1});
                });
            }
        };

        $(".del-Album").click(function () {
            var othis = $(this), method = othis.data('method');
            active[method] ? active[method].call(this, othis) : '';
        })

        $(".album-manger").click(function () {
            befAlbumName = $(this).parent().find("strong").attr("title")
            $(".album-name").val(befAlbumName)
            var othis = $(this), method = othis.data('method');
            active[method] ? active[method].call(this, othis) : '';
        })



    });

}



/**
 * 更新相册
 */
function updateAlbum(bef,current){
    if(current==""){
        layer.msg('不能为空')
    }else{
        $.ajax({
            type: "POST",
            url: "/photo/updatePhotoList",
            data: {user_aid:currentId,
                befName:bef,
                    currentName: current},
            success: function(msg){

                layer.msg(msg)
                getPhotoAlbumList(currentId)
            }
        });

    }
}

/**
 * 删除相册
 * @param id
 * @param albumName
 */
function deleteAlbum(id,albumName,dom){
    $.ajax({
        type: "POST",
        url: "/photo/deleteAlbum",
        data: {user_aid:id,
            album_name:albumName},
        success: function(msg){
            layer.msg(msg)
            dom.parents("li").remove()
        }
    });
}