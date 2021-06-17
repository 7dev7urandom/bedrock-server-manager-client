<template>
                <div>
                    <list-item :dark="false" :selected="$store.state.selectedServer === -1" v-if="$store.state.currentUserData.globalPermissions & GlobalPermissions.CAN_CREATE_SERVER">
                        <div id="createnewdiv" v-on:click="createServer">Create New</div>
                    </list-item>
                    <ListItem :dark="true" v-for="index in $store.state.servers.length" :selected="$store.state.selectedServer === index - 1" :key="$store.state.servers[index - 1].id">
                        <ServerlistItem :index="index - 1" :obj="$store.state.servers" :key="$store.state.tabReset"></ServerlistItem>
                    </ListItem>
                </div>
            
</template>

<script lang="ts">
import Vue from 'vue';
import ListItem from '../pieces/ListItem.vue';
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
#createnewdiv {
    height: 60px;
    text-align: center;
    line-height: 60px;
    white-space: nowrap;
    padding: 0 15px 0 15px;
}
</style>