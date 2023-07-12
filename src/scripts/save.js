import { ElMessageBox } from 'element-plus';
document.addEventListener('keydown', e => {
    if (!e.shiftKey && e.ctrlKey && e.keyCode == '83') {
        e.preventDefault();
        let titlevalue = document.getElementById('title').value;
        let textvalue = document.getElementById('text').value;
        let file = new File([textvalue], `${titlevalue}.txt`, {
            type: 'text/plain'
        });
        let titlebox = document.getElementById('title');
        if (titlevalue.length == 0 && textvalue.length == 0) {
            ElMessageBox.alert('I need a title and a content to be saved', 'Error', { draggable: true, type: 'error', customStyle: { fontFamily: '\'Martian Mono\', monospace' }, distinguishCancelAndClose: true })
                .catch(() => { });
            titlebox.focus();
            return;
        }
        else if (titlevalue.length == 0) {
            ElMessageBox.alert('I need a title to be saved', 'Error', { draggable: true, type: 'error', customStyle: { fontFamily: '\'Martian Mono\', monospace' }, distinguishCancelAndClose: true })
                .catch(() => { });
            titlebox.focus();
            return;
        }
        else if (textvalue.length == 0) {
            ElMessageBox.alert('I need a content to be saved', 'Error', { draggable: true, type: 'error', customStyle: { fontFamily: '\'Martian Mono\', monospace' }, distinguishCancelAndClose: true })
                .catch(() => { });
            titlebox.focus();
            return;
        }
        ElMessageBox.confirm('Are you sure you want to save it? (Use MAIUSC + CTRL + S to save without this message)', 'Warning', { draggable: true, type: 'warning', customStyle: { fontFamily: '\'Martian Mono\', monospace' }, distinguishCancelAndClose: true })
            .then(() => {
                let link = document.createElement('a');
                let url = URL.createObjectURL(file);
                link.href = url;
                link.download = file.name;
                link.click();
                file.save;
                titlebox.focus();
            })
            .catch(() => {
                titlebox.focus();
            });
    }
    else if (e.shiftKey && e.ctrlKey && e.keyCode == '83') {
        e.preventDefault();
        let titlevalue = document.getElementById('title').value;
        let textvalue = document.getElementById('text').value;
        let file = new File([textvalue], `${titlevalue}.txt`, {
            type: 'text/plain'
        });
        let titlebox = document.getElementById('title');
        if (titlevalue.length == 0 && textvalue.length == 0) {
            ElMessageBox.alert('I need a title and a content to be saved', 'Error', { draggable: true, type: 'error', customStyle: { fontFamily: '\'Martian Mono\', monospace' }, distinguishCancelAndClose: true })
                .catch(() => { });
            titlebox.focus();
            return;
        }
        else if (titlevalue.length == 0) {
            ElMessageBox.alert('I need a title to be saved', 'Error', { draggable: true, type: 'error', customStyle: { fontFamily: '\'Martian Mono\', monospace' }, distinguishCancelAndClose: true })
                .catch(() => { });
            titlebox.focus();
            return;
        }
        else if (textvalue.length == 0) {
            ElMessageBox.alert('I need a content to be saved', 'Error', { draggable: true, type: 'error', customStyle: { fontFamily: '\'Martian Mono\', monospace' }, distinguishCancelAndClose: true })
                .catch(() => { });
            titlebox.focus();
            return;
        }
        else {
            let link = document.createElement('a');
            let url = URL.createObjectURL(file);
            link.href = url;
            link.download = file.name;
            link.click();
            file.save;
            titlebox.focus();
        }
    }
});