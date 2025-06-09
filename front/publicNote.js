import config from "./config.js";
import Request from "./Request.js";
import userInfo from "./userInfo.js";
import deleteNote from "./deletePublicNote.js";
import {doLogin} from './doLogin.js';
import deletePublicNote from "./deletePublicNote.js";
import userSetting from "./userSetting.js";

function getPublicNote() {
    Request().get(config('getPublicNotes'))
    .then(res => {
        let response = res['data'];
        console.log(response);
        if (response['status'] == 200) {

            if (window.localStorage){
                window.localStorage.setItem("jwtToken", response['token']);
            }
            else{
                onsole.log(response)
                userInfo('clear');
            }

            
        }
        else{
            console.log(response['message']);
        }
        console.log(response);
        let result = response['result'];
        console.log(result);
        publicNotePage(result);
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
    console.log(result);
    result.forEach(element => {
        str += `
                <tr>
                    <td>${element['title']}</td>
                    <td>${element['userName']}</td>
                    <td>${element['updateTime']}</td>
                    <td><button name="viewNote" value=${element['noteID']}>查看</button></td>
                    <td><button name='deleteNote' value=${element['noteID']}>移除</button></td>
                </tr>
                `
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
    document.getElementsByName("deleteNote").forEach(element => {
        element.onclick = function(){
            let noteID = element.value;
            console.log(noteID);
            deletePublicNote(noteID);
        }
    });
    
        
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
            if (window.localStorage){
                window.localStorage.setItem("jwtToken", response['token']);
            }
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