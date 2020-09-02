<template>
    <div id="serverzone">
        <TabSystem>
            <Tab name="Servers" :selected="true">
                <div>
                    <ServerlistItem v-for="server in servers" v-bind:key="server.id" :serverObj="server" :pressed="pressed" />
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
    props: ['serverSelected'],
    // @ts-ignore
    sockets: {
        serverList: function(acceptedServers) {
            console.log(acceptedServers);
            this.servers = acceptedServers;
        }
    },
    data: () => {
        return {
            servers: []
        }
    },
    components: {
        ServerlistItem,
        Tab,
        TabSystem
    },
    methods: {
        pressed: function(server) {
            console.log(server.id);
            this.serverSelected(server);
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
</style>