<template>
    <Dialog :cancel="cancel" :done="doneClicked">
        <h3>Copy World</h3>
        <textfield :value="nameValue" :title="'Name: '" :change="nameChanged"></textfield>
        Server:
        <select v-model="server">
            <option v-for="server of serverNames" :key="server.id" :value="server.id">{{server.properties['server-name']}}</option>
        </select>
        <p v-show="existsError" class='red'>Error: That world already exists</p>
        <p v-show="notGeneratedError" class='red'>Error: That world can't be copied because it hasn't been generated</p>
    </Dialog>    
</template>

<script>
import Dialog from './Dialog.vue';
import textfield from '../elements/textField.vue';

export default {
    props: ['done', 'cancel', 'nameValue', 'serverNames', 'curServer'],
    components: {
        Dialog,
        textfield
    },
    sockets: { // SOCKET ISN'T BEING CALLED
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
                // this.closeCopyWorld();
            }
        }
    },
    methods: {
        doneClicked() {
            // console.log(this.name, this.server);
            this.done(this.name, this.server);
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
            notGeneratedError: false
        }
    }
}
</script>