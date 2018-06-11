var currentPic = "";
var current ="";
var currentPage = 1;
var pageSize = 100;

//jquery监听
$(document).ready(function(){

    getIndexPhotoList()


});


//自定义function
function showPic() {
    var text = "<img src='"+currentPic+"'>"
    //alert(text);
    $(".Bigpic").html(text);
}

/**
 * 获取主页的照片列表
 */
function getIndexPhotoList(){
    $.ajax({
        type: "POST",
        url: "/photo/getIndexPhotoList",
        data: {pageSize:pageSize,
                pageNum: currentPage},
        success: function(msg){
            setPhotoBlock(msg);
        }
    });
}


/**
 * 获取主页好友的照片列表
 */
function getFollowPhotoList(){
    $.ajax({
        type: "POST",
        url: "/photo/getFollowsPhotoList",
        data: {
            user_aid:currentId,
            pageSize:pageSize,
            pageNum: currentPage},
        success: function(msg){
            setPhotoBlock(msg);
        }
    });
}

/**
 * 设置图片的
 */
function setPhotoBlock(list) {
    var len = list.length;


    for (var i=0;i<len/3-1;i++){
        $(".left-photo").append(add_photo(list[i*3]));
        $(".mid-photo").append(add_photo(list[i*3+1]));
        $(".right-photo").append(add_photo(list[i*3+2]));
    }
    if (len%3 == 1){
        $(".left-photo").append(add_photo(list[len-1]));
    }else if (len%3==2){
        $(".left-photo").append(add_photo(list[len-2]));
        $(".mid-photo").append(add_photo(list[len-1]));
    }else{
        $(".left-photo").append(add_photo(list[len-3]));
        $(".mid-photo").append(add_photo(list[len-2]));
        $(".right-photo").append(add_photo(list[len-1]));

    }
    $(".photo").find("img").click(function () {
        currentPic = $(this).attr("src");
        current = $(this);
        showPic();
    });

    $(".gt_user").click(function () {
        var id = $(this).attr("aid")
        interviewOtherUser(id)
    })
    //layui模版
    layui.use('layer', function(){ //独立版的layer无需执行这一句
        var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句

        //触发事件
        var active = {

            showPhoto: function(){
                //配置一个透明的询问框
                layer.open({
                    type: 1,
                    title: false,
                    closeBtn: 0,
                    area: '780px',
                    skin: 'layui-layer-nobg', //没有背景色
                    shadeClose: true,
                    content: $(".Bigpic")
                });
            }
        };

        $(".photo").find("img").on('click', function(){
            var othis = $(this), method = othis.data('method');
            active[method] ? active[method].call(this, othis) : '';
        });

    });
}

/**
 * 插入照片
 * @param dom
 * @param date
 */
function add_photo(msg){

    return "    <div class='photo'>\n" +
        "        <img data-method='showPhoto' src='"+msg.photoUrl+"' >\n" +
        "            <div id='desc' style='background-color: #fbfff6'>\n" +
        "                <div style='margin-left: 30px;' >\n" +
        "                    <h1 style='font-size: 20px' u_aid='"+msg.aid+"'>"+msg.photo_name+"" +
        "                       <a href='javascript:;' class='gt_user' aid='"+msg.aid+"'>" +
        "                           <span style='font-size: 15px;margin-left: 5px'>( "+msg.user_name+")</span>" +
        "                       </a>" +
        "                   </h1>\n" +
        "                    <p> 描述："+msg.desc+"</p>\n" +
        "                </div>\n" +
        "                <hr class='layui-bg-gray' style='margin-left: 30px; margin-right: 30px;'>\n" +
        "                    <div><i class='layui-icon' style='margin-left: 30px'>&#xe60e;</i> "+setTimeFormat(msg.uploadTime)+"</div>\n" +
        "                    <br>\n" +
        "            </div>\n" +
        "    </div>"
}

/**
 * 交换模版
 * @param dom
 */
function switchMain(dom){
    dom.parents("tr").find(".current-main-block").removeClass("current-main-block");
    dom.parent().addClass("current-main-block")
    currentPage = 1;
    pageSize = 10;
    $(".left-photo").html("");
    $(".mid-photo").html("");
    $(".right-photo").html("");

    if (dom.parent().attr("type")==1){
        getIndexPhotoList();
    }else if (dom.parent().attr("type")==2){
        if (currentId==null){
            layer.msg('未登录，请登录咱尝试')
        }else{
            getFollowPhotoList();
        }

    }

}

