<template>
    <div id="serverzone">
        <TabSystem>
            <Tab name="Servers" :selected="true">
                <div>
                    <ServerlistItem v-for="server in servers" v-bind:key="server.id" :serverObj="server" />
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