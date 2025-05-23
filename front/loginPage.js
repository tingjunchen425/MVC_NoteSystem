export default function loginPage(){
    const loginPage = `
        <h1>登入</h1>
        <div class="login">
            <input type="text" id="account" placeholder="帳號">
            <br>
            <input type="password" id="password" placeholder="密碼">
            <br>
            <button id="login">登入</button>
            <button id="register">註冊</button>
        </div>
    `
    return loginPage;
}