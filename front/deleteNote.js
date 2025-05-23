import config from "./config.js";

export default function deleteNote(noteID){
    let url = config('removeNote');
    let data = {
        'noteID': noteID
    }
    axios.post(url, Qs.stringify(data))
    .then(res => {
        let response = res['data'];
        console.log(response);
        if (response['status'] == 200) {
            alert('刪除成功');
            document.getElementById("display").innerHTML = '';
        }
        else {
            alert('刪除失敗');
        }
    })
}