import startPage from "./startPage.js";
import loginPage from "./loginPage.js";
import {getPublicNote} from "./publicNote.js";
import {login} from "./login.js";
import {getMyNote} from "./myNote.js";
import { register } from "./register.js";

window.onload = function() {
    document.getElementById("root").innerHTML = startPage();
    document.getElementById("log_in").onclick = function(){
        document.getElementById("display").innerHTML = loginPage();
    
        document.getElementById("login").onclick = function(){
            let account = document.getElementById("account").value;
            let password = document.getElementById("password").value;
            login(account, password);
        }
        document.getElementById('register').onclick = function() {
            register();
        }
    }
    
    document.getElementById("publicnote").onclick = function(){
        getPublicNote();
    }
    document.getElementById("mynote").onclick = function(){
        getMyNote();
    }
}