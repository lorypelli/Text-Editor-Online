import { ElMessageBox } from 'element-plus';
export function onload() {
    if (window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1')) {
        document.title = 'Dev | Text Editor Online';
    }
    let drag_drop = document.getElementById('app');
    let url = new URLSearchParams(window.location.search);
    let titlebox = document.getElementById('title');
    let titleparam = url.get('title');
    let textparam = url.get('content');
    document.getElementById('title').focus();
    document.getElementById('emojipickerdiv').style.display = 'none';
    document.getElementById('openemojipicker').style.display = 'block';
    document.getElementById('openemojipicker').style.marginTop = '-70px';
    document.getElementById('closeemojipicker').style.display = 'none';
    if (titleparam || textparam) {
        document.getElementById('previous_session').style.display = 'none';
        document.getElementById('next_session').style.display = 'none';
        document.getElementById('custom_session').style.display = 'none';
        document.getElementById('tabs').style.display = 'none';
        document.getElementById('title').value = titleparam;
        document.getElementById('text').value = textparam;
        document.getElementById('title').setAttribute('disabled', true);
        document.getElementById('title').style.cursor = 'not-allowed';
        document.getElementById('text').style.cursor = 'not-allowed';
        document.getElementById('text').setAttribute('disabled', true);
        document.getElementById('titlechar').innerHTML = titleparam?.length;
        document.getElementById('textchar').innerHTML = textparam?.length;
    }
    if (!Number(url.get('session-id'))) {
        document.getElementById('previous_session').style.display = 'none';
        document.getElementById('next_session').style.display = 'none';
    }
    if (!titleparam && !textparam) {
        if (url.has('tab') && url.get('tab') >= 1 && url.get('tab') <= 9) document.getElementById(`${'tab' + url.get('tab')}`).style.borderColor = 'orange';
        if (url.get('tab') < 1 || url.get('tab') > 9 || !Number(url.get('tab'))) location.href = `?session-id=${url.get('session-id') || 1}&tab=1`;
        if (!url.has('session-id')) location.href = `?session-id=1&tab=${url.get('tab') || 1}`;
        else if (!url.has('tab')) location.href = `?session-id=${url.get('session-id') || 1}&tab=1`;
        // eslint-disable-next-line no-dupe-else-if
        else if (!url.has('session-id') && !url.has('tab')) location.href = '?session-id=1&tab=1';
        if (url.get('session-id') < 1 || url.get('session-id') > 999999999999999) location.href = `?session-id=1&tab=${url.get('tab') || 1}`;
        else {
            document.getElementById('title').value = localStorage.getItem(`title${url.get('session-id')}&${url.get('tab')}`);
            document.getElementById('text').value = localStorage.getItem(`text${url.get('session-id')}&${url.get('tab')}`);
        }
        document.getElementById('titlechar').innerHTML = localStorage.getItem(`title${url.get('session-id')}&${url.get('tab')}`)?.length;
        document.getElementById('textchar').innerHTML = localStorage.getItem(`text${url.get('session-id')}&${url.get('tab')}`)?.length;
    }
    else {
        if (titleparam == '$content') {
            document.getElementById('title').value = textparam;
            document.getElementById('text').value = textparam;
            document.getElementById('titlechar').innerHTML = textparam.length;
            document.getElementById('textchar').innerHTML = textparam.length;
        }
        else if (textparam == '$title') {
            document.getElementById('title').value = titleparam;
            document.getElementById('text').value = titleparam;
            document.getElementById('titlechar').innerHTML = titleparam.length;
            document.getElementById('textchar').innerHTML = titleparam.length;
        }
    }
    drag_drop.addEventListener('drop', e => {
        e.preventDefault();
        let file = e.dataTransfer.files[0];
        if (file.type != 'text/plain') {
            ElMessageBox.alert('Only txt files are supported', 'Error', { draggable: true, type: 'error', customStyle: { fontFamily: '\'Martian Mono\', monospace' }, distinguishCancelAndClose: true })
                .catch(() => { });
            document.getElementById('title').focus();
            return;
        }
        ElMessageBox.confirm('You are about to uploading one file to this website. Are you sure you want to do it?', 'Warning', { draggable: true, type: 'warning', customStyle: { fontFamily: '\'Martian Mono\', monospace' }, distinguishCancelAndClose: true })
            .then(() => {
                document.getElementById('title').value = file.name.replace('.txt', '');
                document.getElementById('titlechar').innerHTML = file.name.replace('.txt', '').length;
                let content = new FileReader();
                content.onload = e => {
                    document.getElementById('text').value = e.target.result;
                    document.getElementById('textchar').innerHTML = e.target.result.length;
                };
                content.readAsText(file);
            })
            .catch(() => {
                titlebox.focus();
            });
    });
}