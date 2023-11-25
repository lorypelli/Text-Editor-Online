<script lang="ts">
import Navbar from './src/components/Navbar.vue';
import Tabs from './src/components/Tabs.vue';
import Textareas from './src/components/Textareas.vue';
import Buttons from './src/components/Buttons.vue';
import { h } from 'vue';
import { ElMessageBox } from 'element-plus';
export default {
    name: 'App',
    components: {
        Navbar,
        Tabs,
        Textareas,
        Buttons
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
                            document.getElementById('textchar')!.innerHTML = (e.target!.result as string).length as unknown as string;
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
        onContextMenu(e: MouseEvent) {
            e.preventDefault();
            this.$contextmenu({
                x: e.x,
                y: e.y,
                items: [
                    {
                        label: 'Save',
                        icon: h('img', {
                            src: 'https://raw.githubusercontent.com/element-plus/element-plus-icons/971f292c776717e6c682f3f806a4a85d97f709a1/packages/svg/download.svg',
                            style: {
                                width: '20px',
                                height: '20px'
                            }
                        }),
                        onClick: () => {
                            this.save();
                        }
                    },
                    {
                        id: 'File',
                        label: 'Load',
                        icon: h('img', {
                            src: 'https://raw.githubusercontent.com/element-plus/element-plus-icons/971f292c776717e6c682f3f806a4a85d97f709a1/packages/svg/upload.svg',
                            style: {
                                width: '20px',
                                height: '20px'
                            }
                        }),
                        onClick: () => {
                            let url = new URLSearchParams(window.location.search);
                            if (url.has('title') || url.has('content')) {
                                ElMessageBox.alert('You can\'t use this because of titleparam or textparam', 'Error', { draggable: true, type: 'error', customStyle: { fontFamily: '\'Martian Mono\', monospace' }, distinguishCancelAndClose: true })
                                    .catch(() => { });
                                document.getElementById('title')!.focus();
                                return;
                            }
                            this.loadFile();
                        }
                    },
                    {
                        label: 'Share',
                        icon: h('img', {
                            src: 'https://raw.githubusercontent.com/element-plus/element-plus-icons/971f292c776717e6c682f3f806a4a85d97f709a1/packages/svg/share.svg',
                            style: {
                                width: '20px',
                                height: '20px'
                            }
                        }),
                        onClick: () => {
                            this.share();
                        }
                    },
                ]
            });
        }
    }
};
</script>
<script setup lang="ts">
import { onload } from './src/scripts/onload';
import { keys } from './src/scripts/keys';
import { tabs } from './src/scripts/tabs';
import { count, rowCount } from './src/scripts/count';
import { onMounted } from 'vue';
onMounted(() => {
    onload(),
    keys(),
    tabs();
    setInterval(count, 50);
    setInterval(rowCount, 50);
});
</script>
<template>
  <div id="app" @contextmenu="onContextMenu($event)">
    <Navbar />
    <Tabs />
    <Textareas />
    <Buttons />
  </div>
</template>