<template>
    <div id="permlist" v-if="users" >
        <MCSwitch   :change="setView" :value="!!(users[selectedUser].access & 0b00000001)">View</MCSwitch>
        <MCSwitch   :change="setConsole" :value="!!(users[selectedUser].access & 0b00000010)">Console</MCSwitch>
        <MCSwitch   :change="setEditProps" :value="!!(users[selectedUser].access & 0b00000100)">Edit Properties</MCSwitch>
        <MCSwitch   :change="setCreateWorlds" :value="!!(users[selectedUser].access & 0b00001000)">Create Worlds</MCSwitch>
        <MCSwitch   :change="setDeleteWorlds" :value="!!(users[selectedUser].access & 0b00010000)">Delete Worlds</MCSwitch>
        <MCSwitch   :change="setSetStatus" :value="!!(users[selectedUser].access & 0b00100000)">Set status</MCSwitch>
        <MCSwitch   :change="setEditPerms" :value="!!(users[selectedUser].access & 0b01000000)" :disabled="users[selectedUser].id === $store.state.currentUserData.id">Edit Permissions</MCSwitch>
    </div>
</template>

<script>
import MCSwitch from './MCSwitch.vue';
export default {
    name: 'permList',
    components: {
        MCSwitch
    },
    props: ["setView",
"setConsole",
"setEditProps",
"setCreateWorlds",
"setDeleteWorlds",
"setSetStatus",
"setEditPerms",
"users",
"selectedUser"],

}
</script>
<style scoped>
#permlist {
    display: inline-block;
    margin-inline-start: 5px;
    vertical-align: top;
}
</style>