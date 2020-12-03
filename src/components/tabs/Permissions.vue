<template>
    <div class="fullpage">
        <h3>Your Permissions</h3>
        <ul id="permsself">
            <li v-for="perm in permissionList" :key="perm">{{ perm }}</li>
        </ul>
        <div id="permeditavailible" v-if="permeditavailible">
            <div class="divider"></div>
            <div id="permeditor" class="flexfill" v-if="$store.state.servers[this.$store.state.selectedServer]" >
                <div id="permuserlist">
                    <ListItem :fillavailable="true" v-for="(user, index) in $store.state.servers[this.$store.state.selectedServer].allowedUsers" :key="user.name" :selected="index === selectedUser">
                        <UserlistItem :index="index" :obj="user" :selected="selectUser"></UserlistItem>
                    </ListItem>
                </div>
                <div class="vertdivider"></div>
                <perm-list :setView="setValue(LocalPermissions.CAN_VIEW)"
                    :setConsole="setValue(LocalPermissions.CAN_USE_CONSOLE)"
                    :setEditProps="setValue(LocalPermissions.CAN_EDIT_PROPERTIES)"
                    :setCreateWorlds="setValue(LocalPermissions.CAN_CREATE_WORLDS)"
                    :setDeleteWorlds="setValue(LocalPermissions.CAN_DELETE_WORLDS)"
                    :setSetStatus="setValue(LocalPermissions.CAN_SET_STATUS)"
                    :setEditPerms="setValue(LocalPermissions.CAN_EDIT_PERMISSIONS)"
                    :users="$store.state.servers[this.$store.state.selectedServer].allowedUsers" 
                    :selectedUser="selectedUser" 
                    :key="selectedUser" />
            </div>
        </div>
    </div>
</template>

<script>
import { LocalPermissions } from '../../constants';
import ListItem from '../pieces/ListItem.vue';
import UserlistItem from '../pieces/UserlistItem.vue';
import permList from '../elements/permList.vue';

export default {
    name: 'Permissions',
    components: {
        permList,
        ListItem,
        UserlistItem
    },
    data: () => {
        return {
            selectedUser: 0,
            LocalPermissions
        }
    },
    computed: {
        permissionList() {
            const server = this.$store.getters.currentServer;
            if(!server) return [];
            const perm = server.access;
            const perms = [];
            if(perm & LocalPermissions.CAN_VIEW) perms.push("View");
            if(perm & LocalPermissions.CAN_USE_CONSOLE) perms.push("Use Console");
            if(perm & LocalPermissions.CAN_EDIT_PROPERTIES) perms.push("Edit Properties");
            if(perm & LocalPermissions.CAN_CREATE_WORLDS) perms.push("Create Worlds");
            if(perm & LocalPermissions.CAN_DELETE_WORLDS) perms.push("Delete Worlds");
            if(perm & LocalPermissions.CAN_EDIT_PERMISSIONS) perms.push("Edit User Permissions");
            return perms;
        },
        permeditavailible() {
            if(this.$store.getters.currentServer == null) return false;
            return this.$store.getters.currentServer.access & LocalPermissions.CAN_EDIT_PERMISSIONS;
        }
    },
    methods: {
        selectUser(id) {
            this.selectedUser = id;
        }, // TODO: listen for socket error and give error box
        setValue(permission) {
            // Must be inline to preserve special vue `this` variable
            return ({ target }) => {
                let { checked } = target;

                if(checked) this.$store.state.servers[this.$store.state.selectedServer].allowedUsers[this.selectedUser].access |= permission;
                else this.$store.state.servers[this.$store.state.selectedServer].allowedUsers[this.selectedUser].access &= ~permission;
                this.$socket.client.emit('setPermission', {
                    userId: this.$store.state.servers[this.$store.state.selectedServer].allowedUsers[this.selectedUser].id,
                    perm: this.$store.state.servers[this.$store.state.selectedServer].allowedUsers[this.selectedUser].access,
                    serverId: this.$store.getters.currentServer.id
                });
            }
        }
    }
}
</script>
<style scoped>
tbody {
    width: 100%;
}
.listcontent {
    background-color: #c6c6c6;
    color: #505050;
    border-right: #656465 2px solid;
    border-bottom: #656465 2px solid;
    border-top: #f7f7f7 2px solid;
    border-left: #f7f7f7 2px solid;
    padding: 0.5em;
}
.listcontent.selected {
    background-color: #c6c6c6;
    color: #505050;
    border-left: #656465 2px solid;
    border-top: #656465 2px solid;
    border-right: #f7f7f7 2px solid;
    border-bottom: #f7f7f7 2px solid;
    padding: 0.5em;
}
.listcontent:hover {
    background-color: #218306;
}
#permeditavailible {
    flex: 1 1 auto;
    display: flex;
    flex-flow: column;
}
#permuserlist {
    min-width: 25%;
    display: inline-block;
    vertical-align: top;
}

#permsself {
    columns: 2;
    flex: 0 1 auto;
}
#permeditor {
    bottom: 4px;
    position: relative;
}
.vertdivider {
    height: 100%;
    width: 2px;
    background-color: #c6c6c6;
    display: inline-block;
    margin-inline-start: 5px;
}
.divider {
    background-color: #c6c6c6;
    height: 2px;
    margin-top: 1em;
    margin-bottom: 1em;
}
.fullpage {
    display: flex;
    flex-flow: column;
    height: 100%;
}
.flexfill {
    flex: 1 1 auto;
}
.width100 {
    width: 100%;
    display: block;
}
</style>