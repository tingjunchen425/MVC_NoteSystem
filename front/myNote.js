import config from "./config.js";
import deleteNote from "./deleteNote.js";
import { updateNotePage } from "./updateNotePage.js";
import { newNotePage } from "./newNote.js";
import { getCollbatorNote } from "./collbatorNote.js";
import userInfo from "./userInfo.js";
import Request from "./Request.js";
import {doLogin} from './doLogin.js';

function getMyNote(){
    let info = userInfo('read');
    // if (info['loginStatus'] == 'false'){
    //     alert('請先登入');
    //     return;
    // }
    let data = {
        'userID': info['userID']
    }
    Request().post(config('getUserNotes'), Qs.stringify(data))
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
            myNotePage(response['result']);
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
            // alert('查詢失敗');
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
                <th><button id="viewCollbatorNote">查看共編筆記</button></th>
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
    document.getElementById("viewCollbatorNote").onclick = function(){
        getCollbatorNote();
    }
}





export {getMyNote};