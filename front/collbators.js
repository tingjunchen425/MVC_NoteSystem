import config from "./config.js";
import { updateNotePage } from "./updateNotePage.js";

function updateCollbators(noteID, collbatorID, collbatorRole) {
    let data = {
        'noteID': noteID,
        'collbatorID': collbatorID,
        'collbatorRole': collbatorRole
    };
    let url = config('updateCollbatorRole');
    axios.post(url, Qs.stringify(data))
        .then(res => {
            let response = res['data'];
            console.log(response);
            if (response['status'] == 200) {
                alert('更新成功');
                updateNotePage(noteID);
            } else {
                alert('更新失敗');
            }
        })
        .catch(err => {
            console.log(err);
        });
}

function deleteCollbator(noteID, collbatorID) {
    let data = {
        'noteID': noteID,
        'collbatorID': collbatorID
    };
    let url = config('deleteCollbator');
    axios.post(url, Qs.stringify(data))
        .then(res => {
            let response = res['data'];
            console.log(response);
            if (response['status'] == 200) {
                alert('刪除成功');
                updateNotePage(noteID);
            } else {
                alert('刪除失敗');
            }
        })
        .catch(err => {
            console.log(err);
        });
}

function addCollbator(noteID, collbatorID, collbatorRole) {
    let data = {
        'noteID': noteID,
        'collbatorID': collbatorID,
        'collbatorRole': collbatorRole
    };
    let url = config('newCollbator');
    axios.post(url, Qs.stringify(data))
        .then(res => {
            let response = res['data'];
            console.log(response);
            if (response['status'] == 200) {
                alert('新增成功');
                updateNotePage(noteID);
            } else {
                alert('新增失敗');
            }
        })
        .catch(err => {
            console.log(err);
        });
}

export { updateCollbators, deleteCollbator, addCollbator };