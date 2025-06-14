import Request from "./Request.js";
import config from "./config.js";
import userInfo from "./userInfo.js";
import { viewUsers } from "./manageUser.js";
import { doLogin } from './doLogin.js';
import logout from "./logout.js";

export default function userSetting(userID) {
    let data = {
        'userID': userID
    }
    let info = userInfo('read'); // 修正這裡
    Request().post(config('getUserInfo'), Qs.stringify(data))
    .then(res => {
        const response = res['data'];
        if(response['status'] == 200){
            let userData = response['result'][0];
            document.getElementById("display").innerHTML = `
                <h2>使用者設定</h2>
                <input type="text" id="userName" value="${userData['userName']}" placeholder="使用者名稱">
                <button id="change">修改</button>
            `;
            document.getElementById("change").onclick = function(){
                let userName = document.getElementById("userName").value;
                let data = {
                    'userID': userData['userID'],
                    'userName': userName
                }
                Request().post(config('updateUser'), Qs.stringify(data))
                .then(res => {
                    const response = res['data'];
                    if(response['status'] == 200){
                        alert("使用者名稱已更新");
                        userInfo('write', userData['userID'], userName, info['roleID'], info['roleName']); // 修正這裡
                        // document.getElementById("user_info").innerHTML = `
                        //     <span class="user_name">${userName}</span>
                        //     <span class="user_setting"><button id="setting">⚙️</button></span>
                        //     <span id='logout' class='logout'><button id='logout'>登出</button></span>
                        // `;
                        window.location.reload();
                        document.getElementById('logout').onclick = function () {
                            userInfo("clear");
                            logout();
                            doLogin();
                        }
                        document.getElementById('display').innerHTML = '';
                    }
                    else if(response['status'] == 401){
                        alert("請登入");
                        userInfo("clear");
                        doLogin();
                    }
                    else if(response['status'] == 403){
                        alert("沒有權限修改使用者名稱");
                    }
                })
            }
        }
        else{
            console.error("Error fetching user info:", response['message']);
        }
    })
    .catch(err => {
        console.error("Request failed:", err);
    });
}