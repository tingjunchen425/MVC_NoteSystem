import updateNote from './updateNote.js';
import config from "./config.js";

function updateNotePage(noteID){
    let url = config('getNotes');
    let data = {
        'noteID': noteID
    }
    axios.post(url, Qs.stringify(data))
    .then(res => {
        let response = res['data'];
        console.log(response);
        if (response['status'] == 200) {
            console.log(response['result']);
            updatePage(response['result']);
        }
        else {
            alert('查詢失敗');
        }
    })
}

function updatePage(response){
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
        let ownerID = result['ownerID'];
        let status = document.getElementById("status").value;
        console.log(noteID, ownerID, title, context, status);
        updateNote(noteID, ownerID, title, context, status);
    }
}

export {updateNotePage};