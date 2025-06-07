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
    }
    else if (method == 'read'){
        if (currentStatus == null){
            console.log('status is null');
            return null;
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