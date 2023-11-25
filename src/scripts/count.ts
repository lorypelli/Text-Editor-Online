export function count() {
    const titlevalue = document.getElementById('title')!.value;
    const textvalue = document.getElementById('text')!.value;
    const url = new URLSearchParams(window.location.search);
    document.getElementById('titlechar')!.innerHTML = (titlevalue as string).length as unknown as string;
    document.getElementById('textchar')!.innerHTML = (textvalue as string).length as unknown as string;
    if (url.has('title') || url.has('text') || url.get('session-id') == null || url.get('tab') == null) return;
    else {
        localStorage.setItem(`title${url.get('session-id')}&${url.get('tab')}`, titlevalue as string);
        localStorage.setItem(`text${url.get('session-id')}&${url.get('tab')}`, textvalue as string);
    }
}
export function rowCount() {
    const textvalue = (document.getElementById('text')!.value as string).split('\n');
    document.getElementById('textrow')!.innerHTML = textvalue.length as unknown as string;
}