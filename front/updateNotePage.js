import updateNote from './updateNote.js';
import config from "./config.js";
import { updateCollbators, deleteCollbator, addCollbator} from "./collbators.js";
import Request from './Request.js';
import {doLogin} from './doLogin.js';
import userInfo from "./userInfo.js";

function updateNotePage(noteID){
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
            else{
                alert('請重新登入');
                userInfo('clear');
                doLogin();
                return;
            }
            console.log(response['result']);
            data = {
                'noteID': noteID
            }
            Request().post(config('getCollbators'), Qs.stringify(data))
            .then(res => {
                let collbator = res['data'];
                console.log(collbator);
                if (collbator['status'] == 200) {
                    if (window.localStorage){
                        window.localStorage.setItem("jwtToken", collbator['token']);
                    }
                    else{
                        alert('請重新登入');
                        userInfo('clear');
                        doLogin();
                        return;
                    }
                    updatePage(response['result'], collbator['result']);
                }
                else if (collbator['status'] == 401) {
                    // if (window.localStorage){
                    //     window.localStorage.setItem("jwtToken", collbator['token']);
                    // }
                    // else{
                        alert('請重新登入');
                        userInfo('clear');
                        doLogin();
                        return;
                    // }
                    // alert('查詢共編者失敗');
                }
            })
        }
        else {
            alert('查詢失敗');
        }
    })
}

function updatePage(response,collbator){
    console.log(response);
    let result = response[0];
    let str = `
        <h1><input type="text" id="title" value="${result['title']}"></h1>
        `
    str += `
        <table>
            <tr>
                <th>共編者</th>
                <th>名稱</th>
                <th>權限</th>
                <th></th>
                <th><button id="addCollbator">新增共編者</button></th>
            </tr>
            <tr id="newCollbatorInfo"></tr>
    `
    if (collbator.length != 0){
        collbator.forEach(element => {
            str += `
                <tr>
                    <td>${element['collbatorID']}</td>
                    <td>${element['userName']}</td>
            `
            if (element['collbatorRole'] == 'viewer'){
                str += `
                    <td>
                        <select name="collbatorRole" id="${element['collbatorID']}">
                            <option value="viewer" selected>檢視者</option>
                            <option value="editor">編輯者</option>
                        </select>
                    </td>
                `
            }
            else if (element['collbatorRole'] == 'editor'){
                str += `
                    <td>
                        <select name="collbatorRole" id="${element['collbatorID']}">
                            <option value="viewer">檢視者</option>
                            <option value="editor" selected>編輯者</option>
                        </select>
                    </td>
                `
            }
            str += `
                    <td><button name="deleteCollbator" value=${element['collbatorID']}>刪除</button></td>
                    <td><button name="updateCollbator" value=${element['collbatorID']}>更新</button></td>
                </tr>
            `
        });
        
    }
    str += `</table>`;
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
    document.getElementById('addCollbator').onclick = function(){
        let str = `
            <td><input type="text" id="newCollbatorID"></td>
            <td>-</td>
            <td>
                <select name="collbatorRole" id="newCollbatorRole">
                    <option value="viewer">檢視者</option>
                    <option value="editor">編輯者</option>
                </select>
            </td>
            <td></td>
            <td><button id="add">新增</button></td>
        `
        document.getElementById("newCollbatorInfo").innerHTML = str;
        document.getElementById("add").onclick = function(){
            let collbatorID = document.getElementById("newCollbatorID").value;
            let collbatorRole = document.getElementById("newCollbatorRole").value;
            console.log(collbatorID, collbatorRole);
            addCollbator(result['noteID'], collbatorID, collbatorRole);
        }
    }
}

export {updateNotePage};