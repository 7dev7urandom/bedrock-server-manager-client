<template>
    <tab-system>
        <tab name="Create User" :selected="true">
            <!-- <div ref="progressWindow" v-if="creating">
                <Dialog :cancel="() => {}" :text="progressText" :progress="progressBar"></Dialog>
            </div> -->
            <text-field title="Username" placeholder="username" :change="setName" />
            <text-field title="Password" placeholder="password" :password="true" :change="setPass" />
            <text-field title="Title" placeholder="Nerd" :change="setPerm" />
            <mc-switch :change="setPermission(GlobalPermissions.CAN_CREATE_SERVER)">Can Create Servers</mc-switch>
            <mc-switch :change="setPermission(GlobalPermissions.CAN_DELETE_SERVER)">Can Delete Servers</mc-switch>
            <mc-switch :change="setPermission(GlobalPermissions.CAN_OVERRIDE_LOCAL)">Can Override Local Permissions</mc-switch>
            <mc-switch :change="setPermission(GlobalPermissions.CAN_REFRESH_DB)">Can Refresh the Database</mc-switch>
            <mc-switch :change="setPermission(GlobalPermissions.CAN_MANAGE_OTHER_USERS)">Can Create/Modify other users</mc-switch>
            <mc-switch :change="setPermission(GlobalPermissions.CAN_MANAGE_SCRIPTS)">Can Manage Scripting and Plugins</mc-switch>

            <mc-button :click="submit" :disabled="!(name && pass && perm) || creating">Create</mc-button>

            <!-- <mc-button :click="showTestDialog">Test bar</mc-button> -->
        </tab>
    </tab-system>
</template>
<script>
import TabSystem from '../pieces/TabSystem.vue';
import Tab from '../elements/Tab.vue';
import textField from '../elements/textField.vue';
import mcButton from '../elements/mcButton.vue';
import mcSwitch from '../elements/MCSwitch.vue';
import { GlobalPermissions } from '../../constants';

export default {
    components: {
        TabSystem,
        Tab,
        textField,
        mcButton,
        mcSwitch
    },
    methods: {
        setPermission(perm) {
            return value => {
                if(value.target.checked)
                    this.globalPerms |= perm;
                else 
                    this.globalPerms &= ~perm;
            }
        },
        setName(val) {
            this.name = val;
        },
        setPass(val) {
            this.pass = val;
        },
        setPerm(val) {
            this.perm = val;
        },
        submit() {
            this.$socket.client.emit("userAdd", {
                username: this.name,
                password: this.pass,
                globalPermissions: this.globalPerms,
                perm: this.perm
            });
        }
    },
    data() {
        return {
            name: '',
            pass: '',
            version: '',
            perm: '',
            globalPerms: 0,
            creating: false,
            GlobalPermissions
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