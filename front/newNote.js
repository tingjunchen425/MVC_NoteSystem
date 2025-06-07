import config from "./config.js";
import userInfo from "./userInfo.js";
import Request from "./Request.js";
import {doLogin} from './doLogin.js';

function newNotePage(){
    let str = `
        <div>
            <h1>新增筆記</h1>
            <input type="text" id="title" placeholder="標題">
            <select id="status">
                <option value="public">公開</option>
                <option value="private">私密</option>
            </select>
            <p>公開筆記可供所有人查看，私密筆記僅供自己查看</p>
            <p>請注意：公開筆記將會被所有人看到，請勿上傳任何個人隱私資料</p>
            <textarea id="context" rows="20" cols="100" placeholder="內容"></textarea>
            <button id="newNote">新增</button>
        </div>
    `;
    document.getElementById("display").innerHTML = str;
    document.getElementById("newNote").onclick = function(){
        newNote();
    }
}

function newNote(){
    let info = userInfo('read');
    let title = document.getElementById("title").value;
    let context = document.getElementById("context").value;
    let noteStatus = document.getElementById("status").value;
    let ownerID = info['userID'];
    let data = {
        'ownerID': ownerID,
        'title': title,
        'context': context,
        'status': noteStatus    
    }
    Request().post(config('newNote'), Qs.stringify(data))
    .then(res => {
        let response = res['data'];
        console.log(response);
        if (response['status'] == 200) {
            if (window.localStorage){
                window.localStorage.setItem("jwtToken", response['token']);
            }
            else{
                alert('請重新登入');
                userInfo('clear');
                doLogin();
                return;
            }
            alert('新增成功');
            document.getElementById("display").innerHTML = '';
        }
        else {
            // if (window.localStorage){
            //     window.localStorage.setItem("jwtToken", response['token']);
            // }
            // else{
                alert('請重新登入');
                userInfo('clear');
                doLogin();
                return;
            // }
            // alert('新增失敗');
        }
    })
    .catch(err => {
        console.log(err);
    })
}
export {newNotePage}
