<template>
    <div>
        <button @click="click()" :class="{ dark: dark, pressed: pressed || false }" :disabled="disabled">
            <slot></slot>
        </button>
    </div>
</template>
<script lang="ts">
import Vue from 'vue' 
export default Vue.extend({
    props: ['dark', 'click', 'pressed', 'disabled']
})
</script>
<style scoped>
div {
    border: black solid 3px;
    padding: 0;
    display: inline-block;
}
button {
    width: 100%;
    height: 100%;
    border-right: #656465 3px solid;
    border-bottom: #656465 3px solid;
    border-top: #f7f7f7 3px solid;
    border-left: #f7f7f7 3px solid;
    font: 400 16px Minecraftia;
    padding: 10px;
    color: #505050;
    background-color: #c6c6c6;
    outline: 2px solid black;
}
button.dark:active {
    border-bottom: 3px #505050 solid;
    border-right: 3px #505050 solid;
    border-left: 3px #2b2b2b solid;
    border-top: 3px #2b2b2b solid;
}
button.dark {
    border-top: 3px #505050 solid;
    border-left: 3px #505050 solid;
    border-right: 3px #2b2b2b solid;
    border-bottom: 3px #2b2b2b solid;
    background-color: #434343;
}
button:focus {
    outline: none;
}
button:hover {
    box-shadow: inset 0 3000px 0px 0 green;
    outline: white 2px solid;
}
button.dark.pressed {
    border-bottom: 3px #505050 solid;
    border-right: 3px #505050 solid;
    border-left: 3px #2b2b2b solid;
    border-top: 3px #2b2b2b solid;
}
button:disabled {
    background-color: #999;
}
button:disabled:hover {
    box-shadow: none;
    outline: none;
}
</style>