import config from "./config.js";
import status from "./status.js";
import { updateNotePage } from "./updateNotePage.js";
import { viewNote } from "./publicNote.js";

function getCollbatorNote(){
    let info = status('read');
    if (info['loginStatus'] == 'false'){
        alert('請先登入');
        return;
    }
    let url = config('getCollbateNote');
    let data = {
        'collbatorID': info['userID']
    }
    axios.post(url, Qs.stringify(data))
    .then(res => {
        let response = res['data'];
        console.log(response);
        if (response['status'] == 200) {
            console.log(response['result']);
            collbatorNotePage(response['result']);
        }
        else {
            alert('查詢失敗');
        }
    })
}

function collbatorNotePage(result){
    if (result.length == 0){
        document.getElementById("display").innerHTML = '<h1>沒有共編筆記</h1>';
        return;
    }
    let str = `
        <table>
            <tr>
                <th>標題</th>
                <th>更新時間</th>
                <th>類型</th>
            <tr>
    `
    result.forEach(element => {
        str += `
            <tr>
                <td>${element['title']}</td>
                <td>${element['updateTime']}</td>
                <td>${element['status']}</td>
        `;
        if (element['collbatorRole'] == 'editor'){
            str += `
                <td><button name="update" value="${element['noteID']}">編輯</button></td>
            `;
        } else if (element['collbatorRole'] == 'viewer'){
            str += `
                <td><button name="view" value="${element['noteID']}">查看</button></td>
            `;
        }
        str += `</tr>`;
    });
    str += '</table>';
    document.getElementById("display").innerHTML = str;
    document.getElementsByName("update").forEach(element => {
        element.onclick = function(){
            let noteID = element.value;
            console.log(noteID);
            updateNotePage(noteID);
        }
    })
    document.getElementsByName("view").forEach(element => {
        element.onclick = function(){
            let noteID = element.value;
            console.log(noteID);
            viewNote(noteID);
        }
    });
}

export { getCollbatorNote };