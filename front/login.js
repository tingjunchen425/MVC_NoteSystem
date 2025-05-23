import config from "./config.js";
import status from "./status.js";

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
    const userPage = `
        ${info['userName']}
        <button id='setting'>⚙️</button>
    `
    document.getElementById("user_info").innerHTML = userPage;
}


export {login};