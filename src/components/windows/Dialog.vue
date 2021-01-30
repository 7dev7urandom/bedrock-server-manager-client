<template>
    <div class="modal" @click.capture="modalClicked" ref="modal">
        <div id="diabox" ref="box">
            <border :ignoreScroll="true">
                <slot></slot>
            </border>
        </div>
    </div>
</template>
<script>
import Border from '../helper/Border.vue';

export default {
    name: "Dialog",
    components: {
        Border
    },
    methods: {
        modalClicked(data) {
            // console.log(data);
            if(data.target !== this.$refs.modal) return;
            this.cancel();
        }
    },
    mounted() {
        if(this.width) {
            this.$refs.box.style.setProperty('--element-width', this.width);
        }
        if(this.height) {
            this.$refs.box.style.setProperty('--element-height', this.height);
        }
    },
    props: ['cancel', 'height', 'width']
}
</script>
<style scoped>
#diabox {
    --element-height: 400px;
    --element-width: 600px;
    position: fixed;
    left: calc(50% - var(--element-width) / 2);
    top: calc(50% - var(--element-height) / 2);
    height: var(--element-height);
    width: var(--element-width);
}
.modal {
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.4);
    position: fixed;
    left: 0px;
    top: 0px;

}
</style>