export default function startPage(){
    const startPage = `
        <div class="top_bar">
            <button id="mynote">我的筆記</button>
            <button id="publicnote">公開筆記</button>
            <div id="user_info">
                <button id="log_in">log in</button>
            </div>
        </div>
        <div id="display"></div>
    `
    return startPage;
}