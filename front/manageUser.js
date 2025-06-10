import Request from "./Request.js";
import config from "./config.js";
import logout from "./logout.js";

function viewUsers(){
    Request().get(config('getUsers'))
    .then(res => {
        const response = res['data'];
        if(response['status'] == 200){
            let users = response['result'];
            let userTable = `<table>
                                <tr>
                                    <th>使用者ID</th>
                                    <th>使用者名稱</th>
                                </tr>`;
            users.forEach(user => {
                userTable += `<tr>
                                <td>${user['userID']}</td>
                                <td>${user['userName']}</td>
                              </tr>`;
            });
            userTable += `</table>`;
            document.getElementById("display").innerHTML = userTable;
        }
        else if(response['status'] == 401){
            alert("請重新登入");
            logout();
        }
        else if(response['status'] == 403){
            alert("沒有權限查看使用者列表");
        }
    })
}

export {viewUsers};