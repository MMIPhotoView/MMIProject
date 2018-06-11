var currentPhotoGroup;
var listGroup;
layui.use('layer', function(){
    var $ = layui.jquery, layer = layui.layer;

    var userName;
    var isUploadOpen = false;
    var isSearch = false;






    //初始化用户界面
    $(document).ready(function(){

        if (isLogin){


            /**
             * 获取个人信息
             */
            $.ajax({
                type: "POST",
                url: "/users/getUserInfo",
                data: {user_aid:currentId},
                success: function(msg){
                    userName = msg[0].name;
                    $('#name').text(msg[0].name)
                    $('#desc').text(msg[0].desc)
                    $('#aid').text(msg[0].aid)
                    $('#birthday').text("生日："+msg[0].birthday)
                    $('#sex').text("性别："+msg[0].sex)
                    $('#phone').text("电话："+msg[0].phone)
                    $('#hobby').text("兴趣爱好："+msg[0].hobby)

                    $('#m-name').val(msg[0].name)
                    $('#m-desc').val(msg[0].desc)
                    $('#m-bir').val(msg[0].birthday)
                    $('#m-phone').val(msg[0].phone)
                    $('#m-age').val(msg[0].age)
                    /**
                     * 获取用户的照片
                     */
                    getAllPhoto();

                }

            });
            //获取照片分组列表
            getPhotoList();
            $(".allPhotoButton").click(function () {
                getAllPhoto();
            })

            /**
             * 获取用户的关注数和粉丝数
             */
            $.ajax({
                type: "POST",
                url: "/users/getNumByAid",
                data: {user_aid:currentId},
                success: function(msg){
                    $('.followNum').text(msg[0].follow);
                    $('.beFollowNum').text(msg[1].beFollow);


                }
            });

            //搜索条件
            $(".search-icon").click(function () {
                searchPhoto();
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

            //上传按钮的监听
            $(".upload-photo").click(function () {
                if (isUploadOpen){
                    $(".upload-photo-block").hide(1000);
                    isUploadOpen = false;
                }else {
                    $(".upload-photo-block").show(1000);
                    isUploadOpen = true;
                }

            });

        }else{

            layer.msg('123')
        }

    });


    layui.use('form', function(){
        var form = layui.form;

        /**
         * 注册表单提交和监听
         */
        form.on('submit(sign-up)', function(data){
            $.ajax({
                type: "POST",
                url: "/accounts/signUp",
                data: {signup_account:data.field.signup_account,
                    signup_password:data.field.signup_password},
                success: function(msg){

                    alert(msg[1])
                }
            });
            //alert(data.field.user_account);
            return false;
        });

        form.verify({
            account: function(value, item){ //value：表单的值、item：表单的DOM对象
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
            ,password: [
                /^[\S]{6,12}$/
                ,'密码必须6到12位，且不能出现空格'
            ]
        });
    });



    layui.use('upload', function() {
        var $ = layui.jquery
            , upload = layui.upload;

        //普通图片上传
        var uploadInst =
            upload.render({
            elem: '#test1'
            , url: '/photo/uploadImage'
            , auto : false
            , bindAction: '#upload'
            , choose: function (obj) {
                var files = obj.pushFile();
                //预读本地文件，如果是多文件，则会遍历。(不支持ie8/9)
                obj.preview(function(index, file, result){
                    $('#demo1').attr('src', result); //图片链接（base64）
                    // alert($(".upload-photo-name").val())
                    // alert($(".upload-photo-group").val())
                    //这里还可以做一些 append 文件列表 DOM 的操作
                    var a = $(".upload-photo-name").val()

                    //obj.upload(index, file); //对上传失败的单个文件重新上传，一般在某个事件中使用
                    //delete files[index]; //删除列表中对应的文件，一般在某个事件中使用
                });
            }
            ,data :{p_name:"未命名",
                    p_desc:"未描述",
                    p_label:"#无",
                    p_groupName:"未分组"
                }
            ,done: function(res, index, upload){
                if (res.code == 0){
                    layer.msg(res.msg)
                    setTimeout("location.reload()", 500 )

                }
            }


        });
    });



});

function doUpload() {
    var form=document.getElementById("uploadForm");
    var formData = new FormData(form);

    $.ajax({
        url: '/photo/uploadImage' ,
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (returndata) {
            alert(returndata);
        },
        error: function (returndata) {
            alert(returndata);
        }
    });
}
/**
 * 新增分组的弹出层
 */
layui.use('layer', function(){ //独立版的layer无需执行这一句
    var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
    //触发事件
    var active = {
        showNewGroupFrame : function(){
            layer.open({
                type: 1,
                title: ['新增分组', 'font-size:18px;'],
                area: '500px,400px',
                closeBtn: false,
                shadeClose: false,
                shade: [0.3, '#393D49'],
                content: $(".new-group-frame")
                //['../admin/signIn.html']
            });
        }
    };
    $(".add-new-group").find("button").on('click', function(){
        var othis = $(this), method = othis.data('method');
        active[method] ? active[method].call(this, othis) : '';
    });
});

/**
 * 新增用户分组
 */
function addNewGroup(){
    var groupName = $(".new-group-name").val()
    if(groupName!=""){
        $.ajax({
            type: "POST",
            url: "/users/addUserGroup",
            data: {user_aid:currentId,
                groupName:groupName},
            success: function(msg){
                if (msg[0]){
                    layer.load();
                    setTimeout(function(){
                        var temp = "<li><a><i class='layui-icon' style='margin-left: 3px;margin-right: 7px;font-size: 12px; color: #1d1d1d;'>&#xe617;</i>"+groupName+"</a></li>";
                        $(".add-new-group").before(temp)
                        layer.msg(msg[1])
                    }, 1000);
                    layer.closeAll()
                }else {
                    layer.msg(msg[1])

                }
            }
        });
    }else{
        layer.msg('分组名不能为空')
    }


}

/**
 * 模糊搜索照片
 */
function searchPhoto(){
    $.ajax({
        type:"POST",
        url:"/photo/searchPhoto",
        data:{
            uaid:currentId,
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
}


/**
 * 获取全部图片
 */
function getAllPhoto(){
    $.ajax({
        type: "POST",
        url: "/photo/getUserPhoto",
        data: {user_aid:currentId},
        success: function(msg){
            $("#photoNum").text(msg.length);
            if (msg.length>0){
                showPhoto(msg);
            }else {
                layer.msg("您没有上传图片")
            }
        }
    });
}

/**
 * ajax获取用户相册列表
 */
function getPhotoList(){
    $.ajax({
        type: "POST",
        url: "/photo/getPhotoList",
        data: {user_aid:currentId},
        success: function(msg){
            listGroup = msg;
            addPhotoGroup(msg);
        }
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
        data: {user_aid:currentId,
                groupName : groupName},
        success: function(msg){

            showPhoto(msg);
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
            "                                    <div class='W_btn_b photo-manage' data-method='photoManage'><a href='javascript:;'   >图片管理</a></div>\n" +
            "                                <ul >\n" +

            "                                    <li>\n" +
            "                                        <img src="+msg[i].photoUrl+" >\n" +
            "                                    </li>\n" +
            "                                    <li style='margin-top: 30px'>\n" +
            "                                        <h1 id='p-name' >图片名称:<a pid='"+msg[i].pid+"'>"+msg[i].name+"</a></h1>\n" +
            "                                        <p id='p-label'> 标签:<a>"+msg[i].label+"</a></p>\n" +
            "                                        <p id='p-group'> 分组:<a>"+msg[i].groupName+"</a></p>\n" +
            "                                        <p > 上传时间:<a>"+setTimeFormat(msg[i].uploadTime)+"</a></p>\n" +
            "                                        <p id='p-desc' class='photo-desc'><a>"+msg[i].desc+"</a></p>\n" +
            "                                    </li>\n" +
            "                                </ul>\n" +
            "                            </div>\n" +
            "                            <div class='user-photo layui-row'>\n" +
            "                                <img src="+msg[i].photoUrl+" >\n" +
            "                            </div>\n" +
            "                            <div class='photo-down' style='padding-left: 100px'>\n" +
            "                                评论区，最后在加功能\n" +
            "                            </div>\n" +
            "                        </div>";
        $(".allPhoto").append(temp);
    }
    layui.use('layer', function(){ //独立版的layer无需执行这一句
        var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
        //触发事件
        var active = {
            photoManage : function () {
                layer.open({
                    type: 1,
                    title: ['照片管理', 'font-size:18px;'],
                    area: '600px,800px',
                    closeBtn: false,
                    shadeClose: false,
                    shade: [0.3, '#393D49'],
                    content: $(".manage-photo-frame")
                    //['../admin/signIn.html']
                });
            }
        };
        $(".photo-manage").on('click', function(){
            $(".manage-photo-name").val($(this).parent().find("#p-name").find('a').text())
            $(".manage-photo-name").attr("pid",$(this).parent().find("#p-name").find('a').attr("pid"))
            $(".manage-photo-name").attr("src",$(this).parent().find("img").attr("src"))
            $(".manage-photo-label").val($(this).parent().find("#p-label").find('a').text())
            $(".manage-photo-desc").val($(this).parent().find("#p-desc").find('a').text())
            $(".manage-photo-group").val($(this).parent().find("#p-group").find('a').text())

            var othis = $(this), method = othis.data('method');
            active[method] ? active[method].call(this, othis) : '';
        });
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

        var temp1 = "<option value='"+groupName+"'>"+groupName+"</option>"
        $(".manage-photo-group").append(temp1);
    }
    $(".photo-album").find('dd').click(function () {
        currentPhotoGroup = $(this).find('a').text();
        getPhotoListByGroupName(currentPhotoGroup);
    });
}

/**
 * 清楚
 */
function cencel(){
    layer.closeAll()
}



layui.use('form', function(){
    var form = layui.form;

    form.on('submit(modify-data)', function(data){
        // alert(data.field.name)
        // alert(data.field.phone)
        // alert(data.field.age)
        // alert(data.field.bir)
        // alert(data.field.sex)
        // alert(data.field.desc)
        $.ajax({
            type: "POST",
            url: "/users/updateUserInfo",
            data: {aid:currentId,
                age:data.field.age,
                sex:data.field.sex,
                name:data.field.name,
                desc:data.field.desc,
                phone:data.field.phone,
                birthday:data.field.bir,
                hobby:""},
            success: function(msg){
                layer.msg(msg)
                setTimeout("location.reload()", 1000 )
            }
        });




        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });

});
/**
 *
 * @param dom
 */
function manager_photo(dom) {
    var pName = dom.parents(".manage-photo-frame").find(".manage-photo-name").val()
    var pGroupName = dom.parents(".manage-photo-frame").find(".manage-photo-group").val()
    var pLabel = dom.parents(".manage-photo-frame").find(".manage-photo-label").val()
    var pDesc = dom.parents(".manage-photo-frame").find(".manage-photo-desc").val()
    var pid = dom.parents(".manage-photo-frame").find(".manage-photo-name").attr("pid")
    if (pGroupName==1){
        layer.msg('请选择分组')
    }else{

        $.ajax({
            type: "POST",
            url: "/photo/updatePhotoData",
            data: {
                p_name:pName,
                p_desc:pDesc,
                p_label:pLabel,
                p_groupName:pGroupName,
                pid:pid
            },
            success: function(msg){

                layer.msg(msg)
                setTimeout("location.reload()", 1000 )


            }
        });
    }
}

/**
 * 删除照片的方法
 * @param dom
 */
function deletePhoto(dom){
    var pid = dom.parents(".manage-photo-frame").find(".manage-photo-name").attr("pid")
    var url = dom.parents(".manage-photo-frame").find(".manage-photo-name").attr("src")

    $.ajax({
        type: "POST",
        url: "/photo/deletePhoto",
        data: {
            p_url:url,
            pid:pid
        },
        success: function(msg){
            layer.msg(msg)
            setTimeout("location.reload()", 1000 )


        }
    });

}