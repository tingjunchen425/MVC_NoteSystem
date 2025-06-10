import Request from "./Request.js"
import config from "./config.js"
import userInfo from "./userInfo.js"
import {getMyNote} from "./myNote.js"
import { doLogin } from "./doLogin.js"
import { viewUsers } from "./manageUser.js"
import userSetting from "./userSetting.js"
import { getPublicNote } from "./publicNote.js"
import logout from "./logout.js"

export default function userPage() {
    document.getElementById("display").innerHTML = ""
    let info = userInfo('read');
    console.log(info);
    document.getElementById("user_info").innerHTML = info['userName']
        + `<span class="user_setting"><button id="setting">⚙️</button></span>`
        + `<span class='logout'><button id='logout'>登出</button></span>`;
    document.getElementById("setting").onclick = function () {
        userSetting(info['userID']);
    }
    document.getElementById("mynote").onclick = function () {
        getMyNote();
    }
    document.getElementById('logout').onclick = function () {
        userInfo("clear");
        logout();
    }
    Request().get(config('getUsers'))
    .then(res => {
        const response = res['data'];
        console.log(response);
        if(response['status'] == 200){
        document.getElementById("top_bar").innerHTML = `
            <button id="mynote">我的筆記</button>
            <button id="publicnote">公開筆記</button>
            <button id='viewUsers'>檢視使用者</button>
        `;
        document.getElementById("publicnote").onclick = function(){
            getPublicNote();
        }
        document.getElementById("mynote").onclick = function () {
            getMyNote();
        }
        document.getElementById('viewUsers').onclick = function(){
            viewUsers()
        }
    }
    })                    
}