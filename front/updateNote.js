import config from "./config.js";

export default function updateNote(noteID, title, context, status){
    let url = config('updateNote');
    console.log(noteID, title, context, status);
    let data = {
        'noteID': noteID,
        'title': title,
        'context': context,
        'status': status
    }
    console.log(data);
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
