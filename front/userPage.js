import Request from "./Request.js"
import config from "./config.js"
import userInfo from "./userInfo.js"
import {getMyNote} from "./myNote.js"
import { doLogin } from "./doLogin.js"

export default function userPage() {
    document.getElementById("display").innerHTML = ""
    let info = userInfo('read');
    console.log(info);
    document.getElementById("user_info").innerHTML = info['userName']
    document.getElementById("mynote").onclick = function () {
        getMyNote();
    }
}