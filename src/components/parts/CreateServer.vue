<template>
    <tab-system>
        <tab name="Create Server" :selected="true">
            <div ref="progressWindow" v-if="creating">
                <Dialog :cancel="() => {}" :text="progressText" :progress="progressBar"></Dialog>
            </div>
            <text-field title="Name" placeholder="Dedicated Server" :change="setName" />
            <text-field title="Description" placeholder="My server" :change="setDesc" />
            <!--
                BDSX is currently broken with wine. Just disable it for now -->
            Type
            <select v-model="type">
                <option value="vanilla">Vanilla</option>
                 <option value="bdsx">BDSx</option> 
            </select>
            <br />
            <div v-show="type !== 'bdsx'">
                Version
                <select v-model="version">
                    <option v-for="versionI of ( type === 'bdsx' ? bdsxVersions : globalMCVersions)" :key="versionI" :value="versionI">{{ versionI }}</option>
                </select>
            </div>
            <mc-button :click="submit" :disabled="!(name && description && version && type)">Create</mc-button>
            <!-- <mc-button :click="showTestDialog">Test bar</mc-button> -->
        </tab>
    </tab-system>
</template>
<script>
import TabSystem from '../pieces/TabSystem.vue';
import Tab from '../elements/Tab.vue';
import textField from '../elements/textField.vue';
import mcButton from '../elements/mcButton.vue';
import Dialog from '../windows/ProgressBarDialog.vue';
import { v4 as uuidv4 } from 'uuid';

export default {
    components: {
        TabSystem,
        Tab,
        textField,
        mcButton,
        Dialog
    },
    methods: {
        setName(val) {
            this.name = val;
        },
        setDesc(val) {
            this.description = val;
        },
        submit() {
            this.progressId = uuidv4();
            this.$socket.client.emit("createServer", {
                name: this.name,
                description: this.description,
                version: this.version,
                type: this.type,
                progressBarId: this.progressId
            });
            this.showProgressBar();
        },
        showProgressBar() {
            this.creating = true;
        }
    },
    data() {
        return {
            name: '',
            description: '',
            version: '',
            type: 'vanilla',
            creating: false,
            progressBar: 0,
            progressId: '',
            progressText: 'Loading...'
        }
    },
    mounted() {
        this.version = this.globalMCVersions[0];
    },
    sockets: {
        progressBar({ id, text, progress }) {
            if(id !== this.progressId) return;
            this.progressBar = progress;
            this.progressText = text;
        },
        progressBarFinished({ id }) {
            if(id === this.progressId) this.creating = false;
        }
    },
    watch: {
        type(newVal) {
            if(newVal === 'bdsx' && this.bdsxVersions.indexOf(this.version) < 0) this.version = this.bdsxVersions[0];
        }
    }
}
</script>