<template>
    <div class="serverdata">
        <tab-system>
            <tab name="Info" :selected="true">
                <status-tab :key="$store.state.selectedServer" />
            </tab>
            <tab name="Test2">
                test2
            </tab>
        </tab-system>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Tab from '../elements/Tab.vue'
import TabSystem from '../pieces/TabSystem.vue'
import StatusTab from '../tabs/Info.vue'
export default Vue.extend({
    components: {
        Tab,
        TabSystem,
        StatusTab
    }
})
</script>
<style scoped>
.serverdata {
    width: 100%;
    height: 100%;  
}
</style>