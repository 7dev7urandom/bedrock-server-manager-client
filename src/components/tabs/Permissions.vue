<template>
    <div class="fullpage">
        <h3>Your Permissions</h3>
        <ul id="permsself">
            <li v-for="perm in permissionList" :key="perm">{{ perm }}</li>
        </ul>
        <div id="permeditavailible" v-show="permeditavailible">
            <div class="divider"></div>
            <div id="permeditor" class="flexfill">
                
                    <!-- <tr>
                        <td>
                            <table id="permuserlist">
                                <tbody class="width100">
                                    <tr class="server-row listwhite width100"><td class="width100">
                                        <div class="listcontent"><div class="dark">Micah</div><div>Creator</div></div>
                                    </td></tr>
                                    <tr class="server-row listwhite width100"><td class="width100">
                                        <div class="listcontent"><div class="dark">Ian</div><div>Admin</div></div>
                                    </td></tr>
                                </tbody>
                            </table>
                        </td>
                        <td> -->
                            <div id="permuserlist">
                                <ListItem :fillavailable="true" v-for="user in users" :key="user.name" :selected="user.id === selectedUser">
                                    <UserlistItem :obj="user" :selected="selectUser"></UserlistItem>
                                </ListItem>
                            </div>
                            <div class="vertdivider"></div>
                        <!-- </td>
                        <td> -->
                            <div id="permlist">
                                <MCSwitch>Num1</MCSwitch>
                                <MCSwitch>Num2</MCSwitch>
                            </div>
                        <!--</td>
                    </tr>-->

            </div>
        </div>
    </div>
</template>

<script>
import { LocalPermissions } from '../../constants';
import MCSwitch from '../elements/MCSwitch.vue';
import ListItem from '../pieces/ListItem.vue';
import UserlistItem from '../pieces/UserlistItem.vue';

export default {
    name: 'Permissions',
    components: {
        MCSwitch,
        ListItem,
        UserlistItem
    },
    data: () => {
        return {
            users: [
                { name: "Micah", title: "Creator", access: 255, id: 0 },
                { name: "Ian", title: "Admin", access: 255, id: 1 }
            ],
            selectedUser: 0
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
        }
    }
}
</script>
<style scoped>
tbody {
    width: 100%;
}
/* .server-row:hover {
    border: 2px white solid;
    width: 100%;
} */
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
/* .listcontent:hover {
    border: 2px white solid;
} */
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
#permlist {
    display: inline-block;
    margin-inline-start: 5px;
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