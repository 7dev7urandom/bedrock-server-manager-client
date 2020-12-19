<template>
    <div>
        <h3>Players</h3>
        <h4>Online</h4>
        <table v-if="!!this.$store.state.servers[this.$store.state.selectedServer] && !!this.$store.state.servers[this.$store.state.selectedServer].permissions" id="infotable">
            <tbody>
                <tr v-for="user of $store.state.servers[$store.state.selectedServer].permissions.filter(user => $store.state.servers[$store.state.selectedServer].onlinePlayers.find(s => s.xuid === user.player.xuid))" :key="user.player.xuid">
                    <td>{{ user.player.username || 'Unknown player' }} <i>(XUID: {{ user.player.xuid }})</i></td>
                    <td class="rightside">
                        <select v-model="user.permission" @change="change(user)">
                            <option v-for="perm of ['Operator', 'Member', 'Visitor', 'Default']" :key="perm" :value="perm.toLowerCase()">{{ perm }}</option>
                        </select>
                    </td>
                </tr>
                
            </tbody>
        </table>
        <h4>Offline</h4>
        <table v-if="!!this.$store.state.servers[this.$store.state.selectedServer] && !!this.$store.state.servers[this.$store.state.selectedServer].permissions" id="infotable">
            <tbody>
                <tr v-for="user of $store.state.servers[$store.state.selectedServer].permissions.filter(user => !$store.state.servers[$store.state.selectedServer].onlinePlayers.find(s => s.xuid === user.player.xuid))" :key="user.player.xuid">
                    <td>{{ user.player.username || 'Unknown player' }} <i>(XUID: {{ user.player.xuid }})</i></td>
                    <td class="rightside">
                        <select v-model="user.permission" @change="change(user)">
                            <option v-for="perm of ['Operator', 'Member', 'Visitor', 'Default']" :key="perm" :value="perm.toLowerCase()">{{ perm }}</option>
                        </select>
                    </td>
                </tr>
                
            </tbody>
        </table>
        <p v-show="!this.$store.state.servers[this.$store.state.selectedServer]">No server selected</p>
    </div>
</template>

<script>
export default {
    methods: {
        change(person) {
            // console.log("change ran");
            // return () => {
            //                 console.log("int ran");
                this.$socket.client.emit('setOpVal', {
                    permissions: person,
                    update: true,
                    serverId: this.$store.state.servers[this.$store.state.selectedServer].id
                });
            // }
        }
    }
}
</script>

<style scoped>
.rightside:not(.exep) {
    text-align: right;
    padding-left: 20px;
    /* width: 100%; */
}
#infotable {
    width: 100%;
    border-collapse: collapse;
    padding: 5px;
    display: block;
}
td:not(.rightside) {
    white-space: nowrap;
    width: 100%;
}
tbody {
    width: 100%;
}
</style>