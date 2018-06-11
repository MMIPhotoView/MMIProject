/**
 * 用户资料的实体类
 * @constructor
 */
 function Userinfo (){
    this.uid;
    this.aid;
    this.age;
    this.sex;
    this.name;
    this.desc;
    this.phone;
    this.birthday;
    this.hobby;
    
    this.setUser = function (faid, fage, fsex, fname, fdesc, fphone, fbirthday, fhobby) {
        this.aid = faid;
        this.age = fage;
        this.sex = fsex;
        this.name = fname;
        this.desc = fdesc;
        this.phone = fphone;
        this.birthday = fbirthday;
        this.hobby = fhobby;
    }



}
module.exports = Userinfo;