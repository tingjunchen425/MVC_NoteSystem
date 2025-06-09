import config from "./config.js";
import { updateNotePage } from "./updateNotePage.js";
import Request from "./Request.js";
import {doLogin} from './doLogin.js';
import userInfo from "./userInfo.js";

function updateCollbators(noteID, collbatorID, collbatorRole) {
    let data = {
        'noteID': noteID,
        'collbatorID': collbatorID,
        'collbatorRole': collbatorRole
    };
    Request().post(config('updateCollbatorRole'), Qs.stringify(data))
        .then(res => {
            let response = res['data'];
            console.log(response);
            
            if (response['status'] == 200) {
                if (window.localStorage){
                window.localStorage.setItem("jwtToken", response['token']);
                }
                else if (response['status'] == 401){
                    // if (window.localStorage){
                    alert('請重新登入');
                    userInfo('clear');
                    doLogin();
                    return;
                }
                alert('更新成功');
                updateNotePage(noteID);
            } else {
                // alert('更新失敗');
                // if (window.localStorage){
                // window.localStorage.setItem("jwtToken", response['token']);
                // }
                // else{
                    alert('請重新登入');
                    userInfo('clear');
                    doLogin();
                    return;
                // }
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
    Request().post(config('deleteCollbator'), Qs.stringify(data))
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
                alert('刪除成功');
                updateNotePage(noteID);
            } 
            else if (response['status'] == 401) {
                // if (window.localStorage){
                //     window.localStorage.setItem("jwtToken", response['token']);
                // }
                // else{
                    alert('請重新登入');
                    userInfo('clear');
                    doLogin();
                    return;
                // }
                // alert('刪除失敗');
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
    Request().post(config('newCollbator'), Qs.stringify(data))
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
                alert('新增成功');
                updateNotePage(noteID);
            } else {
                // if (window.localStorage){
                //     window.localStorage.setItem("jwtToken", response['token']);
                // }
                // else{
                    alert('請重新登入');
                    userInfo('clear');
                    doLogin();
                    return;
                // }
                // alert('新增失敗');
            }
        })
        .catch(err => {
            console.log(err);
        });
}

export { updateCollbators, deleteCollbator, addCollbator };