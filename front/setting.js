import status from "./status.js";
import config from "./config.js";
import { userPage } from "./login.js";

export default function setting() {
    let info = status('read');
    let url = config('updateUser');
    let data = {
        'userID': info['userID'],
        'userName': info['userName'],
        'roleID': info['roleID'],
        'roleName': info['roleName']
    }
    let str = `
        <h1>使用者設定</h1>
        <table>
            <tr>
                <td>使用者ID</td>
                <td>${info['userID']}</td>
            </tr>
            <tr>
                <td>使用者名稱</td>
                <td><input type="text" id="userName" value="${info['userName']}"></td>
            </tr>
        </table>
        <button id="updateUser">更新使用者</button>
    `
    document.getElementById("display").innerHTML = str;
    document.getElementById("updateUser").onclick = function() {
        let userName = document.getElementById("userName").value;
        if (userName == '') {
            alert('使用者名稱不能為空');
            return;
        }
        data['userName'] = userName;
        axios.post(url, Qs.stringify(data))
        .then(res => {
            let response = res['data'];
            if (response['status'] == 200) {
                alert('更新成功');
                status('write', info['loginStatus'], info['userID'], userName, info['roleID'], info['roleName'], info['account'], info['password']);
                document.getElementById("display").innerHTML = '';
                userPage();
            } else {
                alert('更新失敗');
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
}
