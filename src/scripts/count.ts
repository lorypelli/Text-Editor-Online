export function count() {
    const url = new URLSearchParams(window.location.search);
    const titlevalue = document.getElementById('title')!.value;
    const textvalue = document.getElementById('text')!.value;
    const session = url.get('session-id');
    const tab = url.get('tab');
    document.getElementById('titlechar')!.innerHTML = (titlevalue as string).length as unknown as string;
    document.getElementById('textchar')!.innerHTML = (textvalue as string).length as unknown as string;
    if (url.has('title') || url.has('text') || !session || !tab) return;
    else {
        localStorage.setItem(`title${session}&${tab}`, titlevalue as string);
        localStorage.setItem(`text${session}&${tab}`, textvalue as string);
    }
}
export function rowCount() {
    const textvalue = (document.getElementById('text')!.value as string).split('\n');
    document.getElementById('textrow')!.innerHTML = textvalue.length as unknown as string;
}