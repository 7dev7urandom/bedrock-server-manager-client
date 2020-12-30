<template>
    <Dialog :cancel="cancel" height="150px" width="600px">
        <div class="container">
            <h3>{{ text }} {{ progress }}%</h3>
            <div class="progressbar"><div class="filledbar" :style="`width: ${progress}%`"></div></div>
        </div>
    </Dialog>    
</template>

<script>
import Dialog from './Dialog.vue';

export default {
    props: ['text', 'progress', 'cancel'],
    components: {
        Dialog
    }
}
</script>
<style scoped>
.progressbar {
    background-image: url('/loadingbar.png');
    width: 90%;
    height: 9px;
    background-size: auto 100%;
    image-rendering: pixelated;
    border: 1px solid black;
    margin: auto;
}
.filledbar {
    background-image: url('/loadingbarfilled.png');
    height: 9px;
    background-size: auto 100%;
    image-rendering: pixelated;
}
.container {
    align-content: center;
    text-align: center;
}
</style>