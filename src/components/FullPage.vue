<template>
    <div v-show="$store.state.loggedIn" class="fullpage">
        <!-- <Dialog /> -->
        <table class="fullpage">
            <tbody class="fullpage">
                <tr class="fullpage">
                    <td class="fullpage serverside">
                        <div class="sizing">
                            <div id="serverzone">
                                <TabSystem v-show="$store.state.ready" :selected="tabSelected" :key="$store.state.tabReset">
                                    <Tab name="Servers" :selected="currentPage === 'Servers'">
                                        <Serverlist />
                                    </Tab>
                                    <Tab name="Users" v-if="$store.state.users" :selected="currentPage === 'Users'">
                                        <UsersList />
                                    </Tab>
                                </TabSystem>
                            </div>
                        </div>
                    </td>
                    <td class="fullpage">
                        <div class="sizing">
                            <Properties v-if="$store.state.servers[$store.state.selectedServer]" v-show="currentPage === 'Servers'" />
                            <create-server v-if="$store.state.selectedServer === -1" v-show="currentPage === 'Servers'" />
                            <Users v-if="$store.state.users && $store.state.users[$store.state.selectedUser]" :key="$store.state.tabReset" v-show="currentPage === 'Users'" />
                            <CreateUser v-show="currentPage === 'Users'" v-if="$store.state.selectedUser === -1" />
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Serverlist from './parts/Serverlist.vue'
import Properties from './parts/Properties.vue'
import CreateServer from './parts/CreateServer.vue'
import Tab from './elements/Tab.vue';
import TabSystem from './pieces/TabSystem.vue';
import Users from './parts/Users.vue';
import UsersList from './parts/Userlist.vue';
import CreateUser from './parts/CreateUser.vue';

// import Dialog from './windows/Dialog.vue'

export default Vue.extend({
    name: "FullPage",
    components: {
        Serverlist,
        Properties,
        CreateServer,
        TabSystem,
        Tab,
        UsersList,
        Users,
        CreateUser
    },
    data() {
        return {
            currentPage: 'Servers'
        }
    },
    methods: {
        tabSelected({ name }: { name: string }) {
            this.currentPage = name;
        }
    }
})
</script>

<style scoped>
#serverzone {
    height: 100%;
    float: left;
    /* position: static; */
}
table.fullpage {
    padding: 5px;
}
.serverside {
    width: fit-content;
}
td.fullpage {
    display: table-cell;
}
.sizing {
    height: calc(100vh - 62px);
}
</style>

<style>
.position-div {
    height: 100%;
    margin-top: -2px;
}

</style>