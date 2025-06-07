import userInfo from "./userInfo.js";
import Request from "./Request.js";
import comfig from "./config.js";
import getUserInfo from "./getUserInfo.js";
import userPage  from "./userPage.js";

function doLogin(){
    document.getElementById("display").innerHTML = loginPage();
    document.getElementById("login").onclick = function(){
        let account = document.getElementById("account").value;
        let password = document.getElementById("password").value;
        let data = {
            account: account,
            password: password
        };
        Request().post(comfig('login'), Qs.stringify(data))
        .then(res => {
            const response = res['data'];
            if(response['status'] == 200){
                window.localStorage.setItem("jwtToken", response['token']);
                getUserInfo(account);
                alert("登入成功");
                console.log(userInfo('read'));
                userPage();
            }
            else{
                document.getElementById("content").innerHTML = "登入失敗，請檢查帳號或密碼";
            }
        })
    }
}

function loginPage(){
    const loginPage = `
        帳號：<input type="text" id="account"><br>
        密碼：<input type="password" id="password"><br>
        <button id="login">登入</button>
        <div id="content"></div>
    `
    return loginPage;
}

export {doLogin};