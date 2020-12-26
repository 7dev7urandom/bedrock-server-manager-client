<template>
    <div v-show="$store.state.loggedIn" class="fullpage">
        <!-- <Dialog /> -->
        <table class="fullpage">
            <tbody class="fullpage">
                <tr class="fullpage">
                    <td class="fullpage serverside">
                        <div class="sizing">
                            <Serverlist />
                        </div>
                    </td>
                    <td class="fullpage">
                        <div class="sizing">
                            <Properties v-if="$store.state.servers[$store.state.selectedServer]" />
                            <create-server v-if="$store.state.selectedServer === -1" />
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
// import Dialog from './windows/Dialog.vue'

export default Vue.extend({
    name: "FullPage",
    components: {
        Serverlist,
        Properties,
        CreateServer
        // Dialog
    }
})
</script>

<style scoped>
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