let currentStatus = {
    'loginStatus': 'false',
    'userID': null,
    'userName': null,
    'roleID': null,
    'roleName' : null,
    'account': null,
    'password': null
}

export default function status(method,loginStatus = null, userID  = null, userName  = null, roleID  = null, roleName  = null, account  = null, password  = null){
    if (method == 'write'){
        currentStatus = {
            'loginStatus': loginStatus,
            'userID': userID,
            'userName': userName,
            'roleID': roleID,
            'roleName' : roleName,
            'account': account,
            'password': password
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
    else{
        console.log('status method error');
    }
}