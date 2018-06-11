//客户账号的实体类

function UserAccount() {
    var ID;
    var account;
    var password;

    this.setUserAccount = function (id,ac,psd) {
        ID = id;
        account = ac;
        password = psd;
    }

    this.setId = function (id) {
        ID = id;
    }
    this.getId = function () {
        return ID;
    }
    this.setAccount = function (ac) {
        account = ac;
    }
    this.getAccount = function () {
        return account;
    }

    this.setPassword = function (psd) {
        password = psd;
    }
    this.getPassword = function () {
        return password;
    }

}

module.exports = UserAccount;