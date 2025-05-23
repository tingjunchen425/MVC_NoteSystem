import status from "./status.js";
import config from "./config.js";
import deleteNote from "./deleteNote.js";
import { updateNotePage } from "./updateNotePage.js";
import { newNotePage } from "./newNote.js";

function getMyNote(){
    let info = status('read');
    if (info['loginStatus'] == 'false'){
        alert('請先登入');
        return;
    }
    let url = config('getUserNotes');
    let data = {
        'userID': info['userID']
    }
    axios.post(url, Qs.stringify(data))
    .then(res => {
        let response = res['data'];
        console.log(response);
        if (response['status'] == 200) {
            console.log(response['result']);
            myNotePage(response['result']);
        }
        else {
            alert('查詢失敗');
        }
    })
    .catch(err => {
        console.log(err);
    })
}

function myNotePage(result){
    let str = `
        <table>
            <tr>
                <th>標題</th>
                <th>更新時間</th>
                <th>類型</th>
                <th><button id="newNote">新增筆記</button></th>
            <tr>
    `
    result.forEach(element => {
        str += `
                <tr>
                    <td>${element['title']}</td>
                    <td>${element['updateTime']}</td>
                    <td>${element['status']}</td>
                    <td><button name="doUpdate" value=${element['noteID']}>查看&編輯</button></td>
                    <td><button name="doDelete" value=${element['noteID']}>刪除</button></td>
                `
        str += "</tr>"
    });
    str += '</table>';
    document.getElementById("display").innerHTML = str;
    document.getElementsByName("doUpdate").forEach(element => {
        element.onclick = function(){
            let noteID = element.value;
            console.log(noteID);
            updateNotePage(noteID);
        }
    });
    document.getElementsByName("doDelete").forEach(element => {
        element.onclick = function(){
            let noteID = element.value;
            console.log(noteID);
            deleteNote(noteID);
        }
    });
    document.getElementById("newNote").onclick = function(){
        newNotePage();
    }
}





export {getMyNote};