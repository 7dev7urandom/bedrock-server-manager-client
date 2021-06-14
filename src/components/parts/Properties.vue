<template>
    <div class="serverdata">
        <tab-system ref="tsys">
            <tab name="Info" :selected="true">
                <status-tab :key="$store.state.tabReset" />
            </tab>
            <tab name="Permissions" class="fullpage">
                <permissions-tab :key="$store.state.tabReset" />
            </tab>
            <tab name="Console" class="fullpage" v-if="LocalPermissions.CAN_USE_CONSOLE & this.$store.state.servers[this.$store.state.selectedServer].access">
                <template v-slot="{ selected }">
                <console-tab :selected="selected" :key="$store.state.tabReset" v-if="$store.state.servers[$store.state.selectedServer].local" />
                </template>
            </tab>
            <tab name="Players">
                <operators-tab :key="$store.state.tabReset" />
            </tab>
            <tab name="Worlds" class="fullpage" v-if="(LocalPermissions.CAN_CREATE_WORLDS & this.$store.state.servers[this.$store.state.selectedServer].access) || (LocalPermissions.CAN_DELETE_WORLDS & this.$store.state.servers[this.$store.state.selectedServer].access)">
                <world-tab :key="$store.state.tabReset"></world-tab>
            </tab>
            <tab name="Properties">
                <properties-tab :key="$store.state.tabReset"></properties-tab>
            </tab>
            <tab name="Plugins" class="fullpage" v-if="this.$store.state.servers[this.$store.state.selectedServer].type === 'bdsx' && $store.state.currentUserData.globalPermissions & GlobalPermissions.CAN_MANAGE_SCRIPTS">
                <scripts-tab :key="$store.state.tabReset"></scripts-tab>
            </tab>
            <!-- <tab name="Whitelist">
                <whitelist-tab :key="$store.state.tabReset"></whitelist-tab>
            </tab> -->
            <template v-if="$store.state.servers[$store.state.selectedServer].type === 'bdsx' && $store.state.servers[$store.state.selectedServer].scriptingTabs">
                <tab v-for="tab of $store.state.servers[$store.state.selectedServer].scriptingTabs" :key="`>${tab.name}`" :name="`${tab.name}`">
                    <table id="infotable" :key="$store.state.tabReset">
                        <ScriptTabElement v-for="prop of tab.properties" :key="prop.id" :prop="prop" :changeVal="scriptTabUpdated(tab.name, prop.id)" />
                    </table>
                </tab>
            </template>
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
import { LocalPermissions, GlobalPermissions } from '../../constants';
import ScriptsTab from '../tabs/Plugins.vue';
import ScriptTabElement from '../pieces/ScriptTabElement.vue';

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
        ScriptsTab,
        ScriptTabElement
    },
    data() {
        return {
            LocalPermissions,
            GlobalPermissions,
            updater: 0
        }
    },
    updated() {
        (this.$refs.tsys as Vue & { updateTabs: () => void }).updateTabs();
    },
    methods: {
        scriptTabUpdated(tab: string, id: string) {
            return (value: any) => {
                this.$socket.client.emit("changeScriptSetting", { tab, id, value, serverId: this.$store.state.servers[this.$store.state.selectedServer].id })
            }
        }
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
#infotable {
    width: 100%;
    border-collapse: collapse;
    padding: 5px;
    display: block;
}
</style>
<style>
h3 {
    display: inline-block;
    font-weight: normal;
}
</style>
