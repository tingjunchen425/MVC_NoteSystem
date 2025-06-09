import config from "./config.js";
import Request from "./Request.js";
import {doLogin} from './doLogin.js';
import userInfo from "./userInfo.js";

export default function deletePublicNote(noteID){
    let data = {
        'noteID': noteID
    }
    Request().post(config('deletePublicNote'), Qs.stringify(data))
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
            document.getElementById("display").innerHTML = '';
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
        else if (response['status'] == 403){
            alert('沒有權限');
            return;
        }
    })
}