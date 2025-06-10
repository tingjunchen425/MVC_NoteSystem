export default function startPage(){
    const startPage = `
        <div class="top">
            <div class="top_bar" id="top_bar">
                <button id="mynote">我的筆記</button>
                <button id="publicnote">公開筆記</button>
            </div>
            <div id="user_info">
                <button id="doLogin">登入</button>
            </div>
        </div>
        <div id="display"></div>
    `
    return startPage;
}