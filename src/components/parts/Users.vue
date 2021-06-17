<template>
    <!-- <div> -->
        <tab-system>
            <tab name="Users" :selected="true">
                <edit-user-permission-level :cancel="() => editing = false" v-if="editing" />
                <h3>{{ $store.state.users[$store.state.selectedUser].username }}</h3>
                <div style="color: gray">{{ $store.state.users[$store.state.selectedUser].perm }}</div>
                <br>
                Permissions:
                <ul id="permsself">
                    <li v-for="perm in permissionList" :key="perm">{{ perm }}</li>
                </ul>
                <div v-show="!permissionList.length">None<br></div>
                <mc-button :click="() => editing = true" v-show="$store.state.currentUserData.id !== $store.state.users[$store.state.selectedUser].id">Edit</mc-button>
                <mc-button :click="deleteUser" v-show="$store.state.currentUserData.id !== $store.state.users[$store.state.selectedUser].id" class="red">Delete</mc-button>
            </tab>
        </tab-system>
    <!-- </div> -->
</template>
<script>
import TabSystem from '../pieces/TabSystem.vue';
import Tab from '../elements/Tab.vue';
import { GlobalPermissions } from '../../constants';
import EditUserPermissionLevel from '../windows/EditUserPermissions.vue';
import mcButton from '../elements/mcButton.vue';

export default {
    components: {
        TabSystem,
        Tab,
        EditUserPermissionLevel,
        mcButton
        // textField,
        // mcButton,
        // Dialog
    },
    data() {
        return {
            editing: false
        }
    },
    computed: {
        permissionList() {
            const user = this.$store.state.users[this.$store.state.selectedUser];
            if(!user) return [];
            const perm = user.globalPermissions;
            const perms = [];
            if(perm & GlobalPermissions.CAN_CREATE_SERVER) perms.push("Create servers");
            if(perm & GlobalPermissions.CAN_DELETE_SERVER) perms.push("Delete servers");
            if(perm & GlobalPermissions.CAN_MANAGE_OTHER_USERS) perms.push("Manage users");
            if(perm & GlobalPermissions.CAN_OVERRIDE_LOCAL) perms.push("Override local permissions");
            if(perm & GlobalPermissions.CAN_REFRESH_DB) perms.push("Refresh the database");
            if(perm & GlobalPermissions.CAN_MANAGE_SCRIPTS) perms.push("Manage scripts");
            return perms;
        }
    },
    methods: {
        deleteUser() {
            this.$socket.client.emit("userDelete", {
                id: this.$store.state.users[this.$store.state.selectedUser].id
            });
        }
    }
}
</script>