/**
 * 设置cookie
 * @param cname
 * @param cvalue
 * @param exdays
 */
function setCookie (cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires+";path=/";
}
/**
 * 获取cookie
 * @param cname
 * @returns {*}
 */
function getCookie(cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name)==0) return c.substring(name.length,c.length);
    }
    return "";
}

/**
 * 删除cookie，注销用
 * @param cname
 */
function deleCookie(cname){
    var d = new Date();
    //d.setTime(d.getTime()+(exdays*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname+"=; "+expires+";path=/";
}

function checkCookie(){
    var user=getCookie("currentUser");
    if (user!=""){
        alert("Welcome again " + user);
    }
    else {
        user = prompt("Please enter your name:","");
        if (user!="" && user!=null){
            setCookie("username",user,30);
        }
    }
}