<template>
    <div class="serverdata">
        <tab-system>
            <tab name="Info" :selected="true">
                <status-tab :key="$store.state.tabReset" />
            </tab>
            <tab name="Permissions" class="fullpage">
                <permissions-tab :key="$store.state.tabReset" />
            </tab>
            <tab name="Console" class="fullpage">
                <template v-slot="{ selected }">
                <console-tab :selected="selected" :key="$store.state.tabReset" v-if="$store.state.servers[$store.state.selectedServer].local" />
                </template>
            </tab>
            <tab name="Players">
                <operators-tab :key="$store.state.tabReset" />
            </tab>
            <tab name="Worlds" class="fullpage">
                <world-tab :key="$store.state.tabReset"></world-tab>
            </tab>
            <tab name="Properties">
                <properties-tab :key="$store.state.tabReset"></properties-tab>
            </tab>
            <!-- <tab name="Whitelist">
                <whitelist-tab :key="$store.state.tabReset"></whitelist-tab>
            </tab> -->
        </tab-system>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Tab from '../elements/Tab.vue'
import TabSystem from '../pieces/TabSystem.vue'
import StatusTab from '../tabs/Info.vue'
import PermissionsTab from '../tabs/Permissions.vue'
import ConsoleTab from '../tabs/Console.vue'
import WorldTab from '../tabs/Worlds.vue'
import OperatorsTab from '../tabs/Operators.vue'
import PropertiesTab from '../tabs/Properties.vue'
// eslint-disable-next-line
import WhitelistTab from '../tabs/Whitelist.vue'

export default Vue.extend({
    components: {
        Tab,
        TabSystem,
        StatusTab,
        PermissionsTab,
        ConsoleTab,
        WorldTab,
        OperatorsTab,
        PropertiesTab,
        // WhitelistTab
    }
})
</script>
<style scoped>
.serverdata {
    width: 100%;
    height: 100%;  
}
.fullpage {
    height: 100%;
}
</style>
<style>
h3 {
    display: inline-block;
    font-weight: normal;
}
</style>