import config from "./config.js";
import status from "./status.js";
import setting from "./setting.js";
import { getAllUsers } from "./manageUser.js";

function login(account, password) {
    let url = config('login');
    let data = {
        'account': account,
        'password': password
    }
    console.log(data);
    axios.post(url, Qs.stringify(data))
    .then(res => {
        let response = res['data'];
        console.log(response);
        if (response['status'] == 200) {
            document.getElementById("display").innerHTML = `
                <h1>登入成功</h1>
            `;
            let result = response['result'][0];
            status('write','true', result['userID'], result['userName'], result['roleID'], result['roleName'], account, password);
            userPage();
        }
        else {
            alert('登入失敗');
        }
    })
    .catch(err => {
        console.log(err);
    });
}

function userPage() {
    let info = status('read');
    let userPage = `
        ${info['userName']}
        <button id='setting'>⚙️</button>
    `
    if (info['roleID'] == '001') {
        userPage += `<button id='manageuser'>管理使用者</button>`;
    }
    document.getElementById("user_info").innerHTML = userPage;
    document.getElementById("setting").onclick = function() {
        setting();
    }
    if (info['roleID'] == '001') {
        document.getElementById("manageuser").onclick = function() {
            getAllUsers();
        }
    }
}


export {login, userPage};