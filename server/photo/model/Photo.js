/**
 * 照片的实体类
 * @constructor
 */
function Photo() {
    this.pid;
    this.pAid;
    this.pName;
    this.photoUrl;
    this.pDesc;
    this.pLabel;
    this.pGroupName;
    this.pUploadTime;
    this.setPhoto = function(id,aid,name,photoUrl,desc,label,groupName,uploadTime){
        this.pid = id;
        this.pAid = aid;
        this.pName = name;
        this.photoUrl = photoUrl;
        this.pDesc = desc;
        this.pLabel = label;
        this.pGroupName = groupName;
        this.pUploadTime = uploadTime;
    }
}
module.exports = Photo;