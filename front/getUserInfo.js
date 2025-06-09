import Request from "./Request.js";
import config from "./config.js";
import userInfo from "./userInfo.js";

export default function getUserInfo(account){
    let data = {
        'account': account
    }
    Request().post(config('getUserID'), Qs.stringify(data))
    .then(res => {
        const response = res['data'];
        console.log(response);
        if(response['status'] == 200){
            let userID =  response['result'][0]['userID'];
            data = {
                'userID': userID
            }
            Request().post(config('getUserInfo'), Qs.stringify(data))
            .then(res => {
                const response = res['data'];
                if(response['status'] == 200){
                    let info = response['result'][0];
                    userInfo('write', 
                        info['userID'], 
                        info['userName'], 
                        info['roleID'], 
                        info['roleName']
                    );
                    window.localStorage.setItem("jwtToken", response['token']);
                    document.getElementById("user_info").innerHTML = `
                        <span class="user_name">${info['userName']}</span>
                    `;
                }
                else{
                    console.error("Error fetching user info:", response['message']);
                    return null;
                }
            })
        }
        else{
            console.error("Error fetching user ID:", response['message']);
            return null;
        }
    })
}