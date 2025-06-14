import config from "./config.js";
import userInfo from "./userInfo.js";
import Request from "./Request.js";
import { updateNotePage } from "./updateNotePage.js";
import { viewNote } from "./publicNote.js";
import {doLogin} from './doLogin.js';
import updateNote from "./updateNote.js";

function getCollbatorNote(){
    let info = userInfo('read');
    // if (info['loginStatus'] == 'false'){
    //     alert('請先登入');
    //     return;
    // }
    let data = {
        'collbatorID': info['userID']
    }
    Request().post(config('getCollbateNote'), Qs.stringify(data))
    .then(res => {
        let response = res['data'];
        console.log(response);
        if (response['status'] == 200) {
            if (window.localStorage){
                window.localStorage.setItem("jwtToken", response['token']);
            }
            else if (response['status'] == 401){
                alert('請登入');
                userInfo('clear');
                doLogin();
                return;
            }
            else if (response['status'] == 403){
                alert('沒有權限');
                return;
            }
            console.log(response['result']);
            collbatorNotePage(response['result']);
        }
        else {
            // if (window.localStorage){
            //     window.localStorage.setItem("jwtToken", response['token']);
            // }
            // else{
                alert('請登入');
                userInfo('clear');
                doLogin();
                return;
            // }
            // alert('查詢失敗');
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
            if (window.localStorage){
                Request().get("index.php")
                .then(res => {
                    const response = res['data'];
                    if(response['status'] == 200){
                        window.localStorage.setItem("jwtToken", response['token']);
                        let noteID = element.value;
                        console.log(noteID);
                        getUpadateNote(noteID);
                    }
                    else if(response['status'] == 401){
                        console.log(response)
                        userInfo('clear');
                        alert('請登入');
                        doLogin();
                        return;
                     }
                })
                .catch(err => {
                    console.error(err);
                })
            }
            
        }
    })
    document.getElementsByName("view").forEach(element => {
        element.onclick = function(){
            if (window.localStorage){
                Request().get("index.php")
                .then(res => {
                    const response = res['data'];
                    if(response['status'] == 200){
                        window.localStorage.setItem("jwtToken", response['token']);
                        let noteID = element.value;
                        console.log(noteID);
                        viewNote(noteID);
                    }
                    else if(response['status'] == 401){
                        console.log(response)
                        userInfo('clear');
                        alert('請登入');
                        doLogin();
                        return;
                     }
                })
                .catch(err => {
                    console.error(err);
                })
            }
            
        }
    });
}

function getUpadateNote(noteID){
    let data = {
        'noteID': noteID
    }
    Request().post(config('getNotes'), Qs.stringify(data))
    .then(res => {
        let response = res['data'];
        console.log(response);
        if (response['status'] == 200) {
            if (window.localStorage){
                window.localStorage.setItem("jwtToken", response['token']);
            }
            else if (response['status'] == 401){
                alert('請登入');
                userInfo('clear');
                doLogin();
                return;
            }
            else if (response['status'] == 403){
                alert('沒有權限');
                return;
            }
            console.log(response['result']);
            updateCollbatorNotePage(response['result']);
        }
        else {
            console.log(response);
        }
    })
    .catch(err => {
        console.error(err);
    });
}

function updateCollbatorNotePage(response){
    console.log(response);
    let result = response[0];
    let str = `
        <h1><input type="text" id="title" value="${result['title']}"></h1>
        `
    if (result['status'] == 'public'){
        str += `
            <select id="status">
                <option value="public" selected>公開</option>
                <option value="private">私密</option>
            </select>
        `
    }
    else{
        str += `
            <select id="status">
                <option value="public">公開</option>
                <option value="private" selected>私密</option>
            </select>
        `
    }
    str += `
        <textarea id="context" rows="20" cols="100">${result['context']}</textarea>
        <button id="update">更新</button>
    `
    document.getElementById("display").innerHTML = str;
    document.getElementById("update").onclick = function(){
        let title = document.getElementById("title").value;
        let context = document.getElementById("context").value;
        let noteID = result['noteID'];
        let status = document.getElementById("status").value;
        console.log(noteID, title, context, status);
        updateNote(noteID, title, context, status);
    }
    document.getElementsByName("deleteCollbator").forEach(element => {
        element.onclick = function(){
            let collbatorID = element.value;
            deleteCollbator(result['noteID'], collbatorID);
        }
    });
    document.getElementsByName("updateCollbator").forEach(element => {
        element.onclick = function(){
            let collbatorID = element.value;
            let collbatorRole = document.getElementById(collbatorID).value;
            console.log(collbatorID, collbatorRole);
            updateCollbators(result['noteID'], collbatorID, collbatorRole);
        }
    });
}


export { getCollbatorNote };