import config from "./config.js";


function getAllUsers(){
    let url = config('getSimpleUser');
    axios.get(url)
    .then(res => {
        let response = res['data'];
        if (response['status'] == 200) {
            let result = response['result'];
            let str = `
                <h1>使用者管理</h1>
                <table>
                    <tr>
                        <th>使用者ID</th>
                        <th>使用者名稱</th>
                    </tr>`;
            result.forEach(user => {
                str += `
                    <tr>
                        <td>${user['userID']}</td>
                        <td>${user['userName']}</td>
                        <td><button name="delete" value="${user['userID']}">刪除</button></td>
                    </tr>`;
            });
            str += `</table>`;
            document.getElementById("display").innerHTML = str;
            document.getElementsByName("delete").forEach(element => {
                element.onclick = function() {
                    let userID = this.value;
                    let url = config('removeAccount');
                    let data = {
                        'userID': userID
                    }
                    axios.post(url, Qs.stringify(data))
                    .then(res => {
                        let response = res['data'];
                        if (response['status'] == 200) {
                            alert('刪除成功');
                            getAllUsers();
                        } else {
                            alert('刪除失敗');
                            console.log(response);
                        }
                    })
                }
            });

        } else {
            alert('取得使用者失敗');
        }
    })
}

export {getAllUsers}