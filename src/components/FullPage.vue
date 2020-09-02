<template>
    <div v-show="loggedIn" class="fullpage">
        <table class="fullpage">
            <tbody class="fullpage">
                <tr class="fullpage">
                    <td class="fullpage serverside">
                        <div class="sizing">
                            <Serverlist :serverSelected="selectServer"/>
                        </div>
                    </td>
                    <td class="fullpage">
                        <div class="sizing">
                            <Properties :selectedServer="selectedServer"/>
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

export default Vue.extend({
    name: "FullPage",
    components: {
        Serverlist,
        Properties
    },
    data: () => {
        return {
            loggedIn: false,
            selectedServer: null
        }
    },
    mounted() {
        this.$root.$on('loginSuccessful', () => this.loggedIn = true);
    },
    methods: {
        selectServer(server) {
            this.selectedServer = server;
            console.log("done");
        }
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