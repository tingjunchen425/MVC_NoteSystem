let currentStatus = {
    'userID': null,
    'userName': null,
    'roleID': null,
    'roleName' : null,
}

export default function userInfo(method, userID  = null, userName  = null, roleID  = null, roleName  = null){
    if (method == 'write'){
        currentStatus = {
            'userID': userID,
            'userName': userName,
            'roleID': roleID,
            'roleName' : roleName,
        }
        window.localStorage.setItem("userInfo", JSON.stringify(currentStatus));
        console.log('userInfo write');
    }
    else if (method == 'read'){
        if (currentStatus == null){
            console.log('status is null');
            return JSON.parse(window.localStorage.getItem("userInfo"));
        }
        else if (currentStatus['userID'] == null){
            console.log('status userID is null');
            console.log(JSON.parse(window.localStorage.getItem("userInfo")));
            if (window.localStorage.getItem("userInfo") == null){
                console.log('localStorage userInfo is null');
                return currentStatus;
            }
            return JSON.parse(window.localStorage.getItem("userInfo"));
        }
        console.log('status is not null');
        console.log(currentStatus);
        return currentStatus;
    }
    else if (method == 'clear'){
        currentStatus = {
            'userID': null,
            'userName': null,
            'roleID': null,
            'roleName' : null,
        }
    }
    else{
        console.log('status method error');
    }
}