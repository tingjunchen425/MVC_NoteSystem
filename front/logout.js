import { doLogin } from "./doLogin.js";

export default function logout() {
    // 清除本地存儲中的用戶信息
    window.localStorage.removeItem("userInfo");
    window.localStorage.removeItem("jwtToken");

    // 更新頁面顯示
    // doLogin();

    // 重新載入頁面或導向到登入頁面
    window.location.reload();
}