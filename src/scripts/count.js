export function count() {
    let titlevalue = document.getElementById('title').value;
    let textvalue = document.getElementById('text').value;
    let url = new URLSearchParams(window.location.search);
    document.getElementById('titlechar').innerHTML = titlevalue.length;
    document.getElementById('textchar').innerHTML = textvalue.length;
    if (url.has('title') || url.has('text') || url.get('session-id') == null || url.get('tab') == null) return;
    else {
        localStorage.setItem(`title${url.get('session-id')}&${url.get('tab')}`, titlevalue);
        localStorage.setItem(`text${url.get('session-id')}&${url.get('tab')}`, textvalue);
    }
}
export function rowCount() {
    let textvalue = document.getElementById('text').value.split('\n');
    document.getElementById('textrow').innerHTML = textvalue.length;
}