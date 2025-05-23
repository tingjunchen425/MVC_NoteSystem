import config from "./config.js";
import status from "./status.js";

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
    let info = status('read');
    let title = document.getElementById("title").value;
    let context = document.getElementById("context").value;
    let noteStatus = document.getElementById("status").value;
    let ownerID = info['userID'];
    let url = config('newNote');
    let data = {
        'ownerID': ownerID,
        'title': title,
        'context': context,
        'status': noteStatus    
    }
    axios.post(url, Qs.stringify(data))
    .then(res => {
        let response = res['data'];
        console.log(response);
        if (response['status'] == 200) {
            alert('新增成功');
            document.getElementById("display").innerHTML = '';
        }
        else {
            alert('新增失敗');
        }
    })
    .catch(err => {
        console.log(err);
    })
}
export {newNotePage}
