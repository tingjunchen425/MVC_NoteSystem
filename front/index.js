import Request from './Request.js';
import {doLogin} from './doLogin.js';
import startPage from './startPage.js';
import userPage from './userPage.js';
import { getPublicNote } from './publicNote.js';

window.onload = function(){
    document.getElementById("root").innerHTML = startPage();
    document.getElementById("publicnote").onclick = function(){
        getPublicNote();
    }
    if(window.localStorage){
        Request().get("index.php")
        .then(res => {
            const response = res['data'];
            if(response['status'] == 200){
                window.localStorage.setItem("jwtToken", response['token']);
                alert("歡迎回來");
                userPage();
            }
            else{
                doLogin();
            }
        })
        .catch(err => {
            console.error(err); 
        })
    }
}
