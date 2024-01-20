import { ElMessageBox } from 'element-plus';
const titlevalue = document.getElementById('title')!.value;
const textvalue = document.getElementById('text')!.value;
const titlebox = document.getElementById('title')!;
document.addEventListener('keydown', e => {
    if (!e.shiftKey && e.ctrlKey && e.keyCode == 83) {
        e.preventDefault();
        const file = new File([textvalue as string], `${titlevalue}.txt`, {
            type: 'text/plain'
        });
        if ((titlevalue as string).length == 0 && (textvalue as string).length == 0) {
            ElMessageBox.alert('I need a title and a content to be saved', 'Error', { draggable: true, type: 'error', customStyle: { fontFamily: '\'Martian Mono\', monospace' }, distinguishCancelAndClose: true })
                .catch(() => { });
            titlebox.focus();
            return;
        }
        else if ((titlevalue as string).length == 0) {
            ElMessageBox.alert('I need a title to be saved', 'Error', { draggable: true, type: 'error', customStyle: { fontFamily: '\'Martian Mono\', monospace' }, distinguishCancelAndClose: true })
                .catch(() => { });
            titlebox.focus();
            return;
        }
        else if ((textvalue as string).length == 0) {
            ElMessageBox.alert('I need a content to be saved', 'Error', { draggable: true, type: 'error', customStyle: { fontFamily: '\'Martian Mono\', monospace' }, distinguishCancelAndClose: true })
                .catch(() => { });
            titlebox.focus();
            return;
        }
        ElMessageBox.confirm('Are you sure you want to save it? (Use MAIUSC + CTRL + S to save without this message)', 'Warning', { draggable: true, type: 'warning', customStyle: { fontFamily: '\'Martian Mono\', monospace' }, distinguishCancelAndClose: true })
            .then(() => {
                const link = document.createElement('a');
                const url = URL.createObjectURL(file);
                link.href = url;
                link.download = file.name;
                link.click();
                titlebox.focus();
            })
            .catch(() => {
                titlebox.focus();
            });
    }
    else if (e.shiftKey && e.ctrlKey && e.keyCode == 83) {
        e.preventDefault();
        const file = new File([textvalue as string], `${titlevalue}.txt`, {
            type: 'text/plain'
        });
        if ((titlevalue as string).length == 0 && (textvalue as string).length == 0) {
            ElMessageBox.alert('I need a title and a content to be saved', 'Error', { draggable: true, type: 'error', customStyle: { fontFamily: '\'Martian Mono\', monospace' }, distinguishCancelAndClose: true })
                .catch(() => { });
            titlebox.focus();
            return;
        }
        else if ((titlevalue as string).length == 0) {
            ElMessageBox.alert('I need a title to be saved', 'Error', { draggable: true, type: 'error', customStyle: { fontFamily: '\'Martian Mono\', monospace' }, distinguishCancelAndClose: true })
                .catch(() => { });
            titlebox.focus();
            return;
        }
        else if ((textvalue as string).length == 0) {
            ElMessageBox.alert('I need a content to be saved', 'Error', { draggable: true, type: 'error', customStyle: { fontFamily: '\'Martian Mono\', monospace' }, distinguishCancelAndClose: true })
                .catch(() => { });
            titlebox.focus();
            return;
        }
        else {
            const link = document.createElement('a');
            const url = URL.createObjectURL(file);
            link.href = url;
            link.download = file.name;
            link.click();
            titlebox.focus();
        }
    }
});