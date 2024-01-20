import { ElMessageBox } from 'element-plus';
export function onload() {
    if (window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1')) {
        document.title = 'Dev | Text Editor Online';
    }
    const drag_drop = document.getElementById('app');
    const url = new URLSearchParams(window.location.search);
    const titlebox = document.getElementById('title')!;
    const textbox = document.getElementById('text')!;
    const titlechar = document.getElementById('titlechar')!;
    const textchar = document.getElementById('textchar')!;
    const openemojipicker = document.getElementById('openemojipicker')!;
    const previous_session = document.getElementById('previous_session')!;
    const next_session = document.getElementById('next_session')!;
    const titleparam = url.get('title')!;
    const textparam = url.get('content')!;
    const session = url.get('session-id')!;
    const tab = url.get('tab')!;
    titlebox.focus();
    document.getElementById('emojipickerdiv')!.style.display = 'none';
    openemojipicker.style.display = 'block';
    openemojipicker.style.marginTop = '-70px';
    document.getElementById('closeemojipicker')!.style.display = 'none';
    if (titleparam || textparam) {
        previous_session.style.display = 'none';
        next_session.style.display = 'none';
        document.getElementById('custom_session')!.style.display = 'none';
        document.getElementById('tabs')!.style.display = 'none';
        titlebox.value = titleparam;
        textbox.value = textparam;
        titlebox.setAttribute('disabled', 'true');
        titlebox.style.cursor = 'not-allowed';
        textbox.style.cursor = 'not-allowed';
        textbox.setAttribute('disabled', 'true');
        titlechar.innerHTML = titleparam.length as unknown as string;
        textchar.innerHTML = textparam.length as unknown as string;
    }
    if (isNaN(parseInt(session))) {
        previous_session.style.display = 'none';
        next_session.style.display = 'none';
    }
    if (!titleparam && !textparam) {
        if (url.has('tab') && parseInt(tab) >= 1 && parseInt(tab) <= 9) {
            document.getElementById(`${'tab' + url.get('tab')}`)!.style.borderColor = 'orange';
        }
        else if (parseInt(tab) < 1 || parseInt(tab) > 9 || isNaN(parseInt(tab))) {
            location.href = `?session-id=${url.get('session-id') || 1}&tab=1`;
        }
        if (!url.has('session-id')) {
            location.href = `?session-id=1&tab=${url.get('tab') || 1}`;
        }
        else if (!url.has('tab')) {
            location.href = `?session-id=${url.get('session-id') || 1}&tab=1`;
        }
        if (parseInt(session) < 1 || parseInt(session) > 999999999999999 || isNaN(parseInt(session))) {
            location.href = `?session-id=1&tab=${url.get('tab') || 1}`;
        }
        else {
            const titlestorage = localStorage.getItem(`title${session}&${tab}`)!;
            const textstorage = localStorage.getItem(`text${session}&${tab}`)!;
            titlebox.value = titlestorage;
            textbox.value = textstorage;
            titlechar.innerHTML = titlestorage!.length as unknown as string;
            textchar.innerHTML = textstorage!.length as unknown as string;
        }
    }
    else {
        if (titleparam == '$content') {
            titlebox.value = textparam;
            textbox.value = textparam;
            titlechar.innerHTML = textparam!.length as unknown as string;
            textchar.innerHTML = textparam!.length as unknown as string;
        }
        else if (textparam == '$title') {
            titlebox.value = titleparam;
            textbox.value = titleparam;
            titlechar.innerHTML = titleparam!.length as unknown as string;
            textchar.innerHTML = titleparam!.length as unknown as string;
        }
    }
    drag_drop!.addEventListener('drop', e => {
        e.preventDefault();
        const file = e.dataTransfer!.files[0];
        if (file.type != 'text/plain') {
            ElMessageBox.alert('Only txt files are supported', 'Error', { draggable: true, type: 'error', customStyle: { fontFamily: '\'Martian Mono\', monospace' }, distinguishCancelAndClose: true })
                .catch(() => { });
            titlebox.focus();
            return;
        }
        ElMessageBox.confirm('You are about to uploading one file to this website. Are you sure you want to do it?', 'Warning', { draggable: true, type: 'warning', customStyle: { fontFamily: '\'Martian Mono\', monospace' }, distinguishCancelAndClose: true })
            .then(() => {
                const filename = file.name.replace('.txt', '');
                titlebox.value = filename;
                titlechar.innerHTML = filename.length as unknown as string;
                const content = new FileReader();
                content.onload = e => {
                    const target = e.target!.result as string;
                    textbox.value = target;
                    textchar.innerHTML = target.length as unknown as string;
                };
                content.readAsText(file);
            })
            .catch(() => {
                titlebox.focus();
            });
    });
}