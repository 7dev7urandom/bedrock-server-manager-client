<template>
    <div id="serverzone">
        <TabSystem v-show="$store.state.ready">
            <Tab name="Servers" :selected="true">
                <div>
                    <list-item :dark="false" :selected="$store.state.selectedServer === -1" v-if="$store.state.currentUserData.globalPermissions & GlobalPermissions.CAN_CREATE_SERVER">
                        <div id="createnewdiv" v-on:click="createServer">Create New</div>
                    </list-item>
                    <ListItem :dark="true" v-for="index in $store.state.servers.length" :selected="$store.state.selectedServer === index - 1" :key="$store.state.servers[index - 1].id">
                        <ServerlistItem :index="index - 1" :obj="$store.state.servers" :key="$store.state.tabReset"></ServerlistItem>
                    </ListItem>
                </div>
            </Tab>
        </TabSystem>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ListItem from '../pieces/ListItem.vue';
import Tab from '../elements/Tab.vue';
import TabSystem from '../pieces/TabSystem.vue';
import ServerlistItem from '../pieces/ServerlistItem.vue';
import { GlobalPermissions } from '../../constants';

export default Vue.extend({
    // @ts-ignore
    sockets: {
        serverList: function(acceptedServers) {
            this.$store.state.servers = acceptedServers; //.map(server => { server.refresh = 0; return server});
            this.$store.state.servers.forEach((s: any) => {
                s.properties = {
                    'server-port': s['server-port'],
                    'max-players': s['max-players'],
                    'server-name': s['server-name']
                }
                s.local = {};
                s['server-port'] = undefined;
                s['max-players'] = undefined;
                s['server-name'] = undefined;
            });
            this.$store.state.ready = true;
            if(this.$store.state.servers.length) {
                this.$socket.client.emit("serverLoad", { serverId: this.$store.state.servers[0].id });
                this.$store.state.selectedServer = 0;
            }
        }
    },
    components: {
        ListItem,
        Tab,
        TabSystem,
        ServerlistItem
    },
    methods: {
        createServer() {
            this.$store.state.selectedServer = -1;
            this.$store.state.tabReset++;
        }
    },
    data() {
        return {
            GlobalPermissions
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
#createnewdiv {
    height: 70px;
    text-align: center;
    line-height: 70px;
    white-space: nowrap;
    padding: 0 15px 0 15px;
}
</style>