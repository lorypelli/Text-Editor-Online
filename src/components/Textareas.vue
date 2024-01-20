<script lang="ts">
import EmojiPicker, { EmojiExt } from 'vue3-emoji-picker';
import 'vue3-emoji-picker/css';
const emojipickerdiv = document.getElementById('emojipickerdiv')!;
const openemojipicker = document.getElementById('openemojipicker')!;
const closeemojipicker = document.getElementById('closeemojipicker')!;
const text = document.getElementById('text')!;
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Textareas',
    components: {
        EmojiPicker
    },
    methods: {
        closeemojipicker() {
            emojipickerdiv.style.display = 'none';
            openemojipicker.style.display = 'block';
            openemojipicker.style.marginTop = '-70px';
            closeemojipicker.style.display = 'none';
            text.focus();
        },
        openemojipicker() {
            emojipickerdiv.style.display = 'block';
            openemojipicker.style.display = 'none';
            closeemojipicker.style.display = 'block';
            text.focus();
        },
        clickEmoji(emoji: EmojiExt) {
            let url = new URLSearchParams(window.location.search);
            if (url.get('title') || url.get('content')) return;
            else {
                text.value = localStorage.getItem(`text${url.get('session-id')}&${url.get('tab')}`) + emoji.i;
                text.focus();
            }
        }
    }
};
</script>
<template>
    <textarea id="title" placeholder="Title" autocomplete="off"></textarea>
    <h1 id="titlechar">0</h1>
    <textarea id="text" placeholder="Content" autocomplete="off"></textarea>
    <h1 id="textchar">0</h1>
    <h1 id="textrow">0</h1>
    <div id="emojipickerdiv">
        <EmojiPicker theme="dark" :native="true" id="emojipicker" @select="clickEmoji" />
    </div>
    <h1 id="closeemojipicker" v-on:click="closeemojipicker">★</h1>
    <h1 id="openemojipicker" v-on:click="openemojipicker">☆</h1>
</template>