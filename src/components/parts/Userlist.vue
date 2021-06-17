<template>
    <div>
        <list-item :dark="false" :selected="$store.state.selectedUser === -1" v-if="$store.state.currentUserData.globalPermissions & GlobalPermissions.CAN_CREATE_SERVER">
            <div id="createnewdiv" v-on:click="createUser">Create New</div>
        </list-item>
        <ListItem :dark="true" v-for="index in $store.state.users.length" :selected="$store.state.selectedUser === index - 1" :key="$store.state.users[index - 1].id">
            <UserListItem :index="index - 1" :obj="$store.state.users" :key="$store.state.tabReset"></UserListItem>
        </ListItem>
    </div>
</template>
<script>
import ListItem from '../pieces/ListItem.vue';
import UserListItem from '../pieces/UserEditListItem.vue';
import { GlobalPermissions } from '../../constants';

export default {
    components: {
        ListItem,
        UserListItem
    },
    data() {
        return {
            GlobalPermissions
        }
    },
    methods: {
        createUser() {
            this.$store.state.selectedUser = -1;
        }
    }
}
</script>
<style scoped>
#createnewdiv {
    height: 50px;
    text-align: center;
    line-height: 50px;
    white-space: nowrap;
    padding: 0 15px 0 5px;
}
</style>