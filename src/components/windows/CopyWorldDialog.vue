<template>
    <Dialog :cancel="cancel" height="250px" width="800px">
        <h3>Copy World</h3>
        <textfield :value="nameValue" :title="'Name: '" :change="nameChanged"></textfield>
        Server:
        <select v-model="server">
            <option v-for="server of serverNames" :key="server.id" :value="server.id">{{server.properties['server-name']}}</option>
        </select>
        <p v-show="existsError" class='red'>Error: That world already exists</p>
        <p v-show="notGeneratedError" class='red'>Error: That world can't be copied because it hasn't been generated</p>
        <div class="buttons">
            <mcButton :click="doneClicked" :disabled="disabled">Done</mcButton>
            <mcButton :click="cancel">Cancel</mcButton>
        </div>
    </Dialog>    
</template>

<script>
import Dialog from './Dialog.vue';
import textfield from '../elements/textField.vue';
import mcButton from '../elements/mcButton.vue';
export default {
    props: ['done', 'cancel', 'nameValue', 'serverNames', 'curServer'],
    components: {
        Dialog,
        textfield,
        mcButton
    },
    sockets: {
        serverCopyResponse(data) {
            console.log(data);
            if(!data.success) {
                this.existsError = false;
                this.notGeneratedError = false;
                if(data.reason.includes('World exists')) {
                    this.existsError = true;
                }
                if(data.reason.includes('generated yet')) {
                    this.notGeneratedError = true;
                }
                this.disabled = false;
            } else {
                this.cancel();
            }
        }
    },
    methods: {
        doneClicked() {
            // console.log(this.name, this.server);
            this.done(this.name, this.server);
            this.disabled = true;
        },
        nameChanged(val) {
            this.name = val;
        }
    },
    data() {
        return {
            name: '',
            server: this.curServer.id,
            existsError: false,
            notGeneratedError: false,
            disabled: false
        }
    }
}
</script>
<style scoped>
.buttons {
    position: absolute;
    bottom: 15px;
    right: 10px;
}
</style>