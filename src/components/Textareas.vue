<script>
import EmojiPicker from "vue3-emoji-picker"
import "vue3-emoji-picker/css"
export default {
    name: "Textareas",
    components: {
        EmojiPicker
    },
    methods: {
        closeemojipicker() {
            document.getElementById("emojipickerdiv").style.display = "none"
            document.getElementById("openemojipicker").style.display = "block"
            document.getElementById("openemojipicker").style.marginTop = "-70px"
            document.getElementById("closeemojipicker").style.display = "none"
            document.getElementById("text").focus()
        },
        openemojipicker() {
            document.getElementById("emojipickerdiv").style.display = "block"
            document.getElementById("openemojipicker").style.display = "none"
            document.getElementById("closeemojipicker").style.display = "block"
            document.getElementById("text").focus()
        },
        clickEmoji(emoji) {
            let url = new URLSearchParams(window.location.search)
            if (url.get("title") || url.get("content")) return
            else {
                document.getElementById("text").value = localStorage.getItem(`text${url.get("session-id")}&${url.get("tab")}`) + emoji.i
                document.getElementById("text").focus()
            }
        }
    }
}
</script>
<template>
    <textarea id="title" placeholder="Title" autocomplete="off"></textarea>
    <h1 id="titlechar">0</h1>
    <textarea id="text" placeholder="Content" autocomplete="off"></textarea>
    <h1 id="textchar">0</h1>
    <h1 id="textrow">0</h1>
    <div id="emojipickerdiv">
        <EmojiPicker theme="dark" :native="true" :hide-search="true" :disable-skin-tones="true" id="emojipicker"
            @select="clickEmoji" />
    </div>
    <h1 id="closeemojipicker" v-on:click="closeemojipicker">★</h1>
    <h1 id="openemojipicker" v-on:click="openemojipicker">☆</h1>
</template>