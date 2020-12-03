<template>
    <div class="modal" @click.prevent.capture="modalClicked" ref="modal">
        <div id="diabox">
            <border :ignoreScroll="true">
                <slot></slot>
                <div class="buttons">
                    <mcbutton :click="done">Done</mcbutton>
                    <mcbutton :click="cancel">Cancel</mcbutton>
                </div>
            </border>
        </div>
    </div>
</template>
<script>
import Border from '../helper/Border.vue';
import mcbutton from '../elements/mcButton.vue';

export default {
    name: "Dialog",
    components: {
        Border,
        mcbutton
    },
    methods: {
        modalClicked(data) {
            if(data.target !== this.$refs.modal) return;
            // console.log(data);
            this.cancel();
        }
    },
    props: ['cancel', 'done']
}
</script>
<style scoped>
#diabox {
    position: fixed;
    left: calc(50% - 300px);
    top: calc(50% - 200px);
    height: 400px;
    width: 600px;
}
.buttons {
    position: absolute;
    bottom: 15px;
    right: 10px;
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