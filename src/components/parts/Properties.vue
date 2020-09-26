<template>
    <div class="serverdata">
        <tab-system>
            <tab name="Info" :selected="true">
                <status-tab :key="$store.state.selectedServer" />
            </tab>
            <tab name="Permissions" class="fullpage">
                <permissions-tab :key="$store.state.selectedServer" />
            </tab>
        </tab-system>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Tab from '../elements/Tab.vue'
import TabSystem from '../pieces/TabSystem.vue'
import StatusTab from '../tabs/Info.vue'
import PermissionsTab from '../tabs/Permissions.vue'
export default Vue.extend({
    components: {
        Tab,
        TabSystem,
        StatusTab,
        PermissionsTab
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
    /* margin-inline-start: 5px; */
    font-weight: normal;
}
</style>