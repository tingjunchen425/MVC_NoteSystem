import config from "./config.js";

function register(){
    let str =`
        <h2>註冊</h2>
        <table>
            <tr>
                <td>帳號</td>
                <td><input type="text" id="account"></td>
            </tr>
            <tr>
                <td>密碼</td>
                <td><input type="password" id="password"></td>
            </tr>
            <tr>
                <td>確認密碼</td>
                <td><input type="password" id="confirm_password"></td>
            </tr>
        </table>
        <p id='message'></p>
        <button id="new">註冊</button>
    `
    document.getElementById("display").innerHTML = str;
    document.getElementById("new").onclick = function() {
        newAccount();
    }
}

function newAccount(){
    let account = document.getElementById("account").value;
    let password = document.getElementById("password").value;
    let confirm_password = document.getElementById("confirm_password").value;
    if (!account || !password || !confirm_password) {
        document.getElementById("message").innerText = "請填寫所有欄位";
        return;
    }
    if (password !== confirm_password) {
        document.getElementById("message").innerText = "密碼不一致，請重新輸入";
        return;
    }
    // 這裡可以添加註冊的邏輯，例如發送到後端進行處理
    console.log(`註冊帳號: ${account}, 密碼: ${password}`);
    let url = config('newAccount');
    let data = {
        'account': account,
        'password': password
    };
    axios.post(url, Qs.stringify(data))
    .then(res => {
        let response = res['data'];
        console.log(response);
        if (response['status'] == 200) {
            newUser(account)
        } 
        else {
            document.getElementById("message").innerText = "帳號重複，請更改後再嘗試。";
        }
    })
}

function newUser(account){
    let url = config('getUserID');
    let data = {
        'account': account
    };
    axios.post(url, Qs.stringify(data))
    .then(res => {
        let response = res['data'];
        console.log(response);
        if (response['status'] == 200) {
            let result = response['result'][0];
            console.log("使用者ID: " + result['userID']);
            url = config('newUser');
            data = {
                'userID': result['userID'],
                'roleID': '002', // 預設角色為一般使用者
                'userName': account // 使用者名稱預設為帳號
            };
            axios.post(url, Qs.stringify(data))
            .then(res => {
                let response = res['data'];
                console.log(response);
                if (response['status'] == 200) {
                    console.log("使用者註冊成功");
                    document.getElementById("display").innerHTML = `
                        <h1>註冊成功</h1>
                        <p>歡迎，${account}！</p>
                    `;
                } else {
                    console.error("使用者註冊失敗");
                    return null;
                }
            })
        } else {
            console.error("無法獲取使用者ID");
            return null;
        }
    })

}

export {register};