import config from "./config.js";
import Request from "./Request.js";
import userInfo from "./userInfo.js";
import deleteNote from "./deleteNote.js";
import {doLogin} from './doLogin.js';

function getPublicNote() {
    Request().get(config('getPublicNotes'))
    .then(res => {
        let response = res['data'];
        console.log(response);
        if (response['status'] == 200) {

            if (window.localStorage){
                Request().get("index.php")
                .then(res => {
                    const response = res['data'];
                    if(response['status'] == 200){
                        window.localStorage.setItem("jwtToken", response['token']);
                    }
                    else{
                        userInfo('clear');
                    }
                })
                .catch(err => {
                    console.error(err);
                })
            }

            let result = response['result'];
            console.log(result);
            publicNotePage(result);
        }
        else{
            console.log(response['message']);
        }
    })
    .catch(err => {
        console.log(err);
    });
}

function publicNotePage(result){
    let str = `
        <table>
            <tr>
                <th>標題</th>
                <th>作者</th>
                <th>更新時間</th>
            <tr>
    `
    let res = userInfo('read');
    console.log(res)
    result.forEach(element => {
        str += `
                <tr>
                    <td>${element['title']}</td>
                    <td>${element['userName']}</td>
                    <td>${element['updateTime']}</td>
                    <td><button name="viewNote" value=${element['noteID']}>查看</button></td>
                `
        if (res['roleID'] == '001'){
            str += `<td><button name='deleteNote' value=${element['noteID']}>移除</button></td>` 
        }
        str += "</tr>"
    });
    str += '</table>';
    document.getElementById("display").innerHTML = str;
    document.getElementsByName("viewNote").forEach(element => {
        element.onclick = function(){
            let noteID = element.value;
            console.log(noteID);
            viewNote(noteID);
        }
    });
    if (res['roleID'] == '001'){
        document.getElementsByName("deleteNote").forEach(element => {
            element.onclick = function(){
                let noteID = element.value;
                console.log(noteID);
                deleteNote(noteID);
            }
        });
    }
        
}

function viewNote(noteID){
    let data = {
        'noteID': noteID
    }
    console.log(data);
    Request().post(config('viewNote'), Qs.stringify(data))
    .then(res => {
        let response = res['data'];
        console.log(response);
        if (response['status'] == 200) {
            let result = response['result'];
            console.log(result);
            viewNotePage(result);
        }
        else{
            console.log(response['message']);
        }
    })
}

function viewNotePage(result){
    let res = result[0];
    console.log(res);
    let str = `
        <h1>${res['title']}</h1>
        <p>作者：${res['userName']}</p>
        <p>更新時間：${res['updateTime']}</p>
        <div class="note">
            <p>${res['context']}</p>
        </div>
    `
    document.getElementById("display").innerHTML = str;
}

export {getPublicNote, viewNote};