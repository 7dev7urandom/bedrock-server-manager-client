<template>
    <div id="serverzone">
        <TabSystem v-show="$store.state.ready">
            <Tab name="Servers" :selected="true">
                <div>
                    <ListItem :dark="true" v-for="index in $store.state.servers.length" :selected="$store.state.selectedServer === index - 1" :key="$store.state.servers[index - 1].id">
                        <ServerListItem :index="index - 1" :obj="$store.state.servers" :key="$store.state.tabReset"></ServerListItem>
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
import ServerListItem from '../pieces/ServerListItem.vue';

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
            })
            this.$store.state.ready = true;
        }
    },
    components: {
        ListItem,
        Tab,
        TabSystem,
        ServerListItem
    }
})
</script>

<style scoped>
#serverzone {
    height: 100%;
    float: left;
    /* position: static; */
}
</style>