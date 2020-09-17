<template>
    <div id="serverzone">
        <TabSystem v-show="$store.state.ready">
            <Tab name="Servers" :selected="true">
                <div>
                    <ServerlistItem v-for="index in $store.state.servers.length" :key="$store.state.servers[index - 1].id" :index="index - 1" :obj="$store.state.servers" />
                </div>
            </Tab>
        </TabSystem>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ServerlistItem from '../pieces/ServerlistItem.vue'
import Tab from '../elements/Tab.vue'
import TabSystem from '../pieces/TabSystem.vue'

export default Vue.extend({
    // @ts-ignore
    sockets: {
        serverList: function(acceptedServers) {
            this.$store.state.servers = acceptedServers; //.map(server => { server.refresh = 0; return server});
            this.$store.state.ready = true;
        }
    },
    components: {
        ServerlistItem,
        Tab,
        TabSystem
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