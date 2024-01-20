<script setup lang="ts">
import { Download, Share, Upload, ArrowLeftBold, ArrowRightBold, QuestionFilled } from '@element-plus/icons-vue';
import '../scripts/save';
</script>
<script lang="ts">
import { ElMessageBox, ElButton } from 'element-plus';
import 'element-plus/dist/index.css';
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Buttons',
    components: {
        ElButton
    },
    methods: {
        save() {
            const titlevalue = document.getElementById('title')!.value;
            const textvalue = document.getElementById('text')!.value;
            const titlebox = document.getElementById('title')!;
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
            ElMessageBox.confirm('Are you sure you want to save it?', 'Warning', { draggable: true, type: 'warning', customStyle: { fontFamily: '\'Martian Mono\', monospace' }, distinguishCancelAndClose: true })
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
        },
        loadFile() {
            const titlebox = document.getElementById('title')!;
            const url = new URLSearchParams(window.location.search);
            if (url.has('title') || url.has('content')) {
                ElMessageBox.alert('You can\'t use this because of titleparam or textparam', 'Error', { draggable: true, type: 'error', customStyle: { fontFamily: '\'Martian Mono\', monospace' }, distinguishCancelAndClose: true })
                    .catch(() => { });
                document.getElementById('title')!.focus();
                return;
            }
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.txt';
            input.onchange = () => {
                const file = input.files![0];
                titlebox.focus();
                if (file.type != 'text/plain') {
                    ElMessageBox.alert('Only txt files are supported', 'Error', { draggable: true, type: 'error', customStyle: { fontFamily: '\'Martian Mono\', monospace' }, distinguishCancelAndClose: true })
                        .catch(() => { });
                    titlebox.focus();
                    return;
                }
                ElMessageBox.confirm('You are about to uploading one file to this website. Are you sure you want to do it?', 'Warning', { draggable: true, type: 'warning', customStyle: { fontFamily: '\'Martian Mono\', monospace' }, distinguishCancelAndClose: true })
                    .then(() => {
                        titlebox.value = file.name.replace('.txt', '');
                        document.getElementById('titlechar')!.innerHTML = file.name.replace('.txt', '').length as unknown as string;
                        const content = new FileReader();
                        content.onload = e => {
                            const target = e.target!.result as string;
                            document.getElementById('text')!.value = target;
                            document.getElementById('textchar')!.innerHTML = target.length as unknown as string;
                        };
                        content.readAsText(file);
                    })
                    .catch(() => {
                        titlebox.focus();
                    });
            };
            input.click();
        },
        share() {
            const titlevalue = document.getElementById('title')!.value;
            const textvalue = document.getElementById('text')!.value;
            const titlebox = document.getElementById('title')!;
            const url = window.location.hostname;
            const urlbeginning = window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1') ? 'http://' : 'https://';
            if ((titlevalue as string).length == 0 && (textvalue as string).length == 0) {
                const copy = `${urlbeginning}${url}/`;
                navigator.clipboard.writeText(copy);
                ElMessageBox.alert('Successfully copied link, you can now share it with your friends!', 'Success', { draggable: true, type: 'success', customStyle: { fontFamily: '\'Martian Mono\', monospace' }, distinguishCancelAndClose: true })
                    .catch(() => { });
                titlebox.focus();
            }
            else if ((titlevalue as string).length == 0) {
                const copy = `${urlbeginning}${url}?content=${textvalue}`;
                navigator.clipboard.writeText(copy);
                ElMessageBox.alert('Successfully copied link, you can now share it with your friends!', 'Success', { draggable: true, type: 'success', customStyle: { fontFamily: '\'Martian Mono\', monospace' }, distinguishCancelAndClose: true })
                    .catch(() => { });
                titlebox.focus();
            }
            else if ((textvalue as string).length == 0) {
                const copy = `${urlbeginning}${url}?title=${titlevalue}`;
                navigator.clipboard.writeText(copy);
                ElMessageBox.alert('Successfully copied link, you can now share it with your friends!', 'Success', { draggable: true, type: 'success', customStyle: { fontFamily: '\'Martian Mono\', monospace' }, distinguishCancelAndClose: true })
                    .catch(() => { });
                titlebox.focus();
            }
            else {
                if (titlevalue == textvalue) {
                    const copy = `${urlbeginning}${url}?title=${titlevalue}&content=$title`;
                    navigator.clipboard.writeText(copy);
                    ElMessageBox.alert('Successfully copied link, you can now share it with your friends!', 'Success', { draggable: true, type: 'success', customStyle: { fontFamily: '\'Martian Mono\', monospace' }, distinguishCancelAndClose: true })
                        .catch(() => { });
                    titlebox.focus();
                }
                else {
                    const copy = `${urlbeginning}${url}?title=${titlevalue}&content=${textvalue}`;
                    navigator.clipboard.writeText(copy);
                    ElMessageBox.alert('Successfully copied link, you can now share it with your friends!', 'Success', { draggable: true, type: 'success', customStyle: { fontFamily: '\'Martian Mono\', monospace' }, distinguishCancelAndClose: true })
                        .catch(() => { });
                    titlebox.focus();
                }
            }
        },
        previousSession() {
            const titlebox = document.getElementById('title')!;
            const urlParams = new URLSearchParams(window.location.search);
            let session = urlParams.get('session-id') as unknown as number;
            if (session == 1) {
                ElMessageBox.alert('Session ID can\'t be < 1', 'Error', { draggable: true, type: 'error', customStyle: { fontFamily: '\'Martian Mono\', monospace' }, distinguishCancelAndClose: true })
                    .catch(() => { });
                titlebox.focus();
                return;
            }
            urlParams.set('session-id', session-- as unknown as string);
            location.href = `?session-id=${session}&tab=1`;
            titlebox.focus();
        },
        nextSession() {
            const titlebox = document.getElementById('title')!;
            const urlParams = new URLSearchParams(window.location.search);
            let session = urlParams.get('session-id') as unknown as number;
            if (session == 999999999999999) {
                ElMessageBox.alert('Session ID can\'t be > 999999999999999', 'Error', { draggable: true, type: 'error', customStyle: { fontFamily: '\'Martian Mono\', monospace' }, distinguishCancelAndClose: true })
                    .catch(() => { });
                titlebox.focus();
                return;
            }
            urlParams.set('session-id', session++ as unknown as string);
            location.href = `?session-id=${session}&tab=1`;
            titlebox.focus();
        },
        changeSession() {
            const titlebox = document.getElementById('title')!;
            ElMessageBox.prompt('Type Session ID Here', 'Custom Session', { inputPlaceholder: 'Type Here...', draggable: true, type: 'info', customStyle: { fontFamily: '\'Martian Mono\', monospace' }, distinguishCancelAndClose: true })
                .then(({ value }) => {
                    const number = parseInt(value);
                    if (isNaN(number) || number <= 0 || number > 999999999999999) {
                        ElMessageBox.alert('Session ID not valid', 'Error', { draggable: true, type: 'error', customStyle: { fontFamily: '\'Martian Mono\', monospace' }, distinguishCancelAndClose: true })
                            .catch(() => { });
                        titlebox.focus();
                        return;
                    }
                    location.href = `?session-id=${value}&tab=1`;
                    localStorage.setItem('session', value);
                    titlebox.focus();
                })
                .catch(() => {
                    titlebox.focus();
                });
        }
    }
};
</script>
<template>
    <div id="buttons">
        <ElButton id="save" v-on:click="save" :icon="Download" title="Save">Save</ElButton>
        <ElButton id="file" v-on:click="loadFile" :icon="Upload" title="Load">Load</ElButton>
        <ElButton id="share" v-on:click="share" :icon="Share" title="Share">Share</ElButton>
        <br>
        <ElButton id="previous_session" v-on:click="previousSession" :icon="ArrowLeftBold" title="Previous Session" />
        <ElButton id="custom_session" v-on:click="changeSession" title="Custom Session">...</ElButton>
        <ElButton id="next_session" v-on:click="nextSession" :icon="ArrowRightBold" title="Next Session" />
    </div>
    <div id="help-btn">
        <a href="https://github.com/LoryPelli/Text-Editor-Online/blob/main/readme.md" target="_blank" title="Github Link">
            <ElButton id="help" :icon="QuestionFilled" title="Help" />
        </a>
    </div>
</template>