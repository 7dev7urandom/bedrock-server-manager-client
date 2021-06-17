<template>
    <Dialog :cancel="cancel" height="90%" width="80%">
        <text-field title="Username" placeholder="username" :change="setName" :value="$store.state.users[$store.state.selectedUser].username" />
        <text-field title="Password" placeholder="password" :password="true" :change="setPass" value="xxxxxx"/>
        <text-field title="Title" placeholder="Nerd" :change="setPerm" :value="$store.state.users[$store.state.selectedUser].perm" />
        <mc-switch :change="setPermission(GlobalPermissions.CAN_CREATE_SERVER)" :value="$store.state.users[$store.state.selectedUser].globalPermissions & GlobalPermissions.CAN_CREATE_SERVER">Can Create Servers</mc-switch>
        <mc-switch :change="setPermission(GlobalPermissions.CAN_DELETE_SERVER)" :value="$store.state.users[$store.state.selectedUser].globalPermissions & GlobalPermissions.CAN_DELETE_SERVER">Can Delete Servers</mc-switch>
        <mc-switch :change="setPermission(GlobalPermissions.CAN_OVERRIDE_LOCAL)" :value="$store.state.users[$store.state.selectedUser].globalPermissions & GlobalPermissions.CAN_OVERRIDE_LOCAL">Can Override Local Permissions</mc-switch>
        <mc-switch :change="setPermission(GlobalPermissions.CAN_REFRESH_DB)" :value="$store.state.users[$store.state.selectedUser].globalPermissions & GlobalPermissions.CAN_REFRESH_DB">Can Refresh the Database</mc-switch>
        <mc-switch :change="setPermission(GlobalPermissions.CAN_MANAGE_OTHER_USERS)" :value="$store.state.users[$store.state.selectedUser].globalPermissions & GlobalPermissions.CAN_MANAGE_OTHER_USERS">Can Create/Modify other users</mc-switch>
        <mc-switch :change="setPermission(GlobalPermissions.CAN_MANAGE_SCRIPTS)" :value="$store.state.users[$store.state.selectedUser].globalPermissions & GlobalPermissions.CAN_MANAGE_SCRIPTS">Can Manage Scripting and Plugins</mc-switch>

        <mc-button :click="submit">Submit</mc-button>
    </Dialog>    
</template>

<script>
import textField from '../elements/textField.vue';
import mcButton from '../elements/mcButton.vue';
import mcSwitch from '../elements/MCSwitch.vue';
import { GlobalPermissions } from '../../constants';
import Dialog from './Dialog.vue';


export default {
    props: ['cancel'],
    components: {
        textField,
        mcButton,
        mcSwitch,
        Dialog
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
            const data = {
                username: this.name === this.$store.state.users[this.$store.state.selectedUser].username ? undefined : this.name,
                password: this.passEdited ? this.pass : undefined,
                globalPermissions: this.globalPerms,
                perm: this.perm,
                id: this.$store.state.users[this.$store.state.selectedUser].id
            };
            console.log(data);
            this.$socket.client.emit("userSetData", data);
        }
    },
    data() {
        return {
            name: '',
            pass: '',
            perm: '',
            globalPerms: 0,
            GlobalPermissions,
            passEdited: false
        }
    },
    mounted() {
        this.version = this.globalMCVersions[0];
    },
    sockets: {
        userlist() {
            this.cancel();
        }
    }
}
</script>