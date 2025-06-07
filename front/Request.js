export default function Request(){
    let jwtToken = window.localStorage.getItem("jwtToken");
    if(!jwtToken){
         jwtToken = '111';
    }
    const req = axios.create({
        baseURL: 'http://localhost/final/backend/public',
        headers: { 'Auth': jwtToken}
    })
    return req;
}
