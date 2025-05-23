import config from "./config.js";

export default function updateNote(noteID,ownerID, title, content, status){
    let url = config('updateNote');
    let data = {
        'noteID': noteID,
        'ownerID': ownerID,
        'title': title,
        'context': content,
        'status': status
    }
    axios.post(url, Qs.stringify(data))
    .then(res => {
        let response = res['data'];
        console.log(response);
        if (response['status'] == 200) {
            alert('更新成功');
            document.getElementById("display").innerHTML = '';
        }
        else {
            alert('更新失敗');
        }
    })
}
