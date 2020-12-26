<template>
    <tab-system>
        <tab name="Create Server" :selected="true">
            <text-field title="Name" placeholder="Dedicated Server" :change="setName" />
            <text-field title="Description" placeholder="My server" :change="setDesc" />
            Version
            <select v-model="version">
                <option v-for="versionI of globalMCVersions" :key="versionI" :value="versionI">{{ versionI }}</option>
            </select>
            <br />
            Type
            <select v-model="type">
                <option value="vanilla">Vanilla</option>
                <option value="bdsx">BDSx</option>
            </select>
            <br />
            <mc-button :click="submit" :disabled="!(name && description && version && type)">Create</mc-button>
        </tab>
    </tab-system>
</template>
<script>
import TabSystem from '../pieces/TabSystem.vue';
import Tab from '../elements/Tab.vue';
import textField from '../elements/textField.vue';
import mcButton from '../elements/mcButton.vue';

export default {
    components: {
        TabSystem,
        Tab,
        textField,
        mcButton
    },
    methods: {
        setName(val) {
            this.name = val;
        },
        setDesc(val) {
            this.description = val;
        },
        submit() {
            this.$socket.client.emit("createServer", {
                name: this.name,
                description: this.description,
                version: this.version,
                type: this.type
            });
        }
    },
    data() {
        return {
            name: '',
            description: '',
            version: '',
            type: 'vanilla'
        }
    },
    mounted() {
        this.version = this.globalMCVersions[0];
    }
}
</script>