/**
 * 好友关系模块，用于处理用户之间关注和被关注的关系
 * @constructor
 */
function UserRelation() {

    this.fromAid;
    this.toAid;
    this.groupName;
    this.nickname;

    this.setUserRelation = function (from, to, gName, nName) {
        this.fromAid = from;
        this.toAid = to;
        this.groupName = gName;
        this.nickname = nName;
    }

}

module.exports = UserRelation;