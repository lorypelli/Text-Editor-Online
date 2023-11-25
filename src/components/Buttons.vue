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
            let titlevalue = document.getElementById('title')!.value;
            let textvalue = document.getElementById('text')!.value;
            let file = new File([textvalue as string], `${titlevalue}.txt`, {
                type: 'text/plain'
            });
            let titlebox = document.getElementById('title');
            if ((titlevalue as string).length == 0 && (textvalue as string).length == 0) {
                ElMessageBox.alert('I need a title and a content to be saved', 'Error', { draggable: true, type: 'error', customStyle: { fontFamily: '\'Martian Mono\', monospace' }, distinguishCancelAndClose: true })
                    .catch(() => { });
                titlebox!.focus();
                return;
            }
            else if ((titlevalue as string).length == 0) {
                ElMessageBox.alert('I need a title to be saved', 'Error', { draggable: true, type: 'error', customStyle: { fontFamily: '\'Martian Mono\', monospace' }, distinguishCancelAndClose: true })
                    .catch(() => { });
                titlebox!.focus();
                return;
            }
            else if ((textvalue as string).length == 0) {
                ElMessageBox.alert('I need a content to be saved', 'Error', { draggable: true, type: 'error', customStyle: { fontFamily: '\'Martian Mono\', monospace' }, distinguishCancelAndClose: true })
                    .catch(() => { });
                titlebox!.focus();
                return;
            }
            ElMessageBox.confirm('Are you sure you want to save it?', 'Warning', { draggable: true, type: 'warning', customStyle: { fontFamily: '\'Martian Mono\', monospace' }, distinguishCancelAndClose: true })
                .then(() => {
                    let link = document.createElement('a');
                    let url = URL.createObjectURL(file);
                    link.href = url;
                    link.download = file.name;
                    link.click();
                    titlebox!.focus();
                })
                .catch(() => {
                    titlebox!.focus();
                });
        },
        loadFile() {
            let url = new URLSearchParams(window.location.search);
            if (url.has('title') || url.has('content')) {
                ElMessageBox.alert('You can\'t use this because of titleparam or textparam', 'Error', { draggable: true, type: 'error', customStyle: { fontFamily: '\'Martian Mono\', monospace' }, distinguishCancelAndClose: true })
                    .catch(() => { });
                document.getElementById('title')!.focus();
                return;
            }
            let input = document.createElement('input');
            input.type = 'file';
            input.accept = '.txt';
            input.onchange = () => {
                let file = input.files![0];
                document.getElementById('title')!.focus();
                if (file.type != 'text/plain') {
                    ElMessageBox.alert('Only txt files are supported', 'Error', { draggable: true, type: 'error', customStyle: { fontFamily: '\'Martian Mono\', monospace' }, distinguishCancelAndClose: true })
                        .catch(() => { });
                    document.getElementById('title')!.focus();
                    return;
                }
                ElMessageBox.confirm('You are about to uploading one file to this website. Are you sure you want to do it?', 'Warning', { draggable: true, type: 'warning', customStyle: { fontFamily: '\'Martian Mono\', monospace' }, distinguishCancelAndClose: true })
                    .then(() => {
                        document.getElementById('title')!.value = file.name.replace('.txt', '');
                        document.getElementById('titlechar')!.innerHTML = file.name.replace('.txt', '').length as unknown as string;
                        let content = new FileReader();
                        content.onload = e => {
                            document.getElementById('text')!.value = e.target!.result as string;
                            document.getElementById('textchar')!.innerHTML = (e.target!.result! as string).length as unknown as string;
                        };
                        content.readAsText(file);
                    })
                    .catch(() => {
                        document.getElementById('title')!.focus();
                    });
            };
            input.click();
        },
        share() {
            let titlevalue = document.getElementById('title')!.value;
            let textvalue = document.getElementById('text')!.value;
            let url = window.location.hostname;
            let urlbeginning = window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1') ? 'http://' : 'https://';
            if ((titlevalue as string).length == 0 && (textvalue as string).length == 0) {
                let copy = `${urlbeginning}${url}/`;
                navigator.clipboard.writeText(copy);
                ElMessageBox.alert('Successfully copied link, you can now share it with your friends!', 'Success', { draggable: true, type: 'success', customStyle: { fontFamily: '\'Martian Mono\', monospace' }, distinguishCancelAndClose: true })
                    .catch(() => { });
                document.getElementById('title')!.focus();
            }
            else if ((titlevalue as string).length == 0) {
                let copy = `${urlbeginning}${url}?content=${textvalue}`;
                navigator.clipboard.writeText(copy);
                ElMessageBox.alert('Successfully copied link, you can now share it with your friends!', 'Success', { draggable: true, type: 'success', customStyle: { fontFamily: '\'Martian Mono\', monospace' }, distinguishCancelAndClose: true })
                    .catch(() => { });
                document.getElementById('title')!.focus();
            }
            else if ((textvalue as string).length == 0) {
                let copy = `${urlbeginning}${url}?title=${titlevalue}`;
                navigator.clipboard.writeText(copy);
                ElMessageBox.alert('Successfully copied link, you can now share it with your friends!', 'Success', { draggable: true, type: 'success', customStyle: { fontFamily: '\'Martian Mono\', monospace' }, distinguishCancelAndClose: true })
                    .catch(() => { });
                document.getElementById('title')!.focus();
            }
            else {
                if (titlevalue == textvalue) {
                    let copy = `${urlbeginning}${url}?title=${titlevalue}&content=$title`;
                    navigator.clipboard.writeText(copy);
                    ElMessageBox.alert('Successfully copied link, you can now share it with your friends!', 'Success', { draggable: true, type: 'success', customStyle: { fontFamily: '\'Martian Mono\', monospace' }, distinguishCancelAndClose: true })
                        .catch(() => { });
                    document.getElementById('title')!.focus();
                }
                else {
                    let copy = `${urlbeginning}${url}?title=${titlevalue}&content=${textvalue}`;
                    navigator.clipboard.writeText(copy);
                    ElMessageBox.alert('Successfully copied link, you can now share it with your friends!', 'Success', { draggable: true, type: 'success', customStyle: { fontFamily: '\'Martian Mono\', monospace' }, distinguishCancelAndClose: true })
                        .catch(() => { });
                    document.getElementById('title')!.focus();
                }
            }
        },
        previousSession() {
            let urlParams = new URLSearchParams(window.location.search);
            let session = urlParams.get('session-id') as unknown as number;
            if (session == 1) {
                ElMessageBox.alert('Session ID can\'t be < 1', 'Error', { draggable: true, type: 'error', customStyle: { fontFamily: '\'Martian Mono\', monospace' }, distinguishCancelAndClose: true })
                    .catch(() => { });
                document.getElementById('title')!.focus();
                return;
            }
            urlParams.set('session-id', session-- as unknown as string);
            location.href = `?session-id=${session}&tab=1`;
            document.getElementById('title')!.focus();
        },
        nextSession() {
            let urlParams = new URLSearchParams(window.location.search);
            let session = urlParams.get('session-id') as unknown as number;
            if (session == 999999999999999) {
                ElMessageBox.alert('Session ID can\'t be > 999999999999999', 'Error', { draggable: true, type: 'error', customStyle: { fontFamily: '\'Martian Mono\', monospace' }, distinguishCancelAndClose: true })
                    .catch(() => { });
                document.getElementById('title')!.focus();
                return;
            }
            urlParams.set('session-id', session++ as unknown as string);
            location.href = `?session-id=${session}&tab=1`;
            document.getElementById('title')!.focus();
        },
        changeSession() {
            ElMessageBox.prompt('Type Session ID Here', 'Custom Session', { inputPlaceholder: 'Type Here...', draggable: true, type: 'info', customStyle: { fontFamily: '\'Martian Mono\', monospace' }, distinguishCancelAndClose: true })
                .then(({ value }) => {
                    switch (true) {
                    case (value == null): {
                        document.getElementById('title')!.focus();
                    } break;
                    case (value as unknown as number <= 0): {
                        ElMessageBox.alert('Session ID not valid', 'Error', { draggable: true, type: 'error', customStyle: { fontFamily: '\'Martian Mono\', monospace' }, distinguishCancelAndClose: true })
                            .catch(() => { });
                        document.getElementById('title')!.focus();
                    } break;
                    case (value as unknown as number > 999999999999999): {
                        ElMessageBox.alert('Session ID not valid', 'Error', { draggable: true, type: 'error', customStyle: { fontFamily: '\'Martian Mono\', monospace' }, distinguishCancelAndClose: true })
                            .catch(() => { });
                        document.getElementById('title')!.focus();
                    } break;
                    default: {
                        location.href = `?session-id=${value}&tab=1`;
                        document.getElementById('title')!.focus();
                        localStorage.setItem('session', value);
                    } break;
                    }
                })
                .catch(() => {
                    document.getElementById('title')!.focus();
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