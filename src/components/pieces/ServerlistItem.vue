<template>
    <tr class="server-row">
        <td>
            <table v-on:click="pressed(serverObj)" class="listblack serverlist mc-font">
                    <tbody>
                        <tr>
                            <td class="server-cell fill-space"><span style="color: white; font-size: 1em;">{{ serverObj.name }}</span></td>
            
                            <td class="server-cell right-align">{{ serverObj.version }}</td>
                            <td class="server-cell right-align min-cell-size" :class="serverObj.status === 'Started' ? 'green' : serverObj.status === 'Stopped' ? 'red' : 'yellow'">{{ serverObj.status }}</td>
                        </tr>
                        <tr>
                            <td class="server-cell">{{ serverObj.port }}</td>
                            <td class="server-cell right-align" style="white-space: nowrap;">{{ serverObj.onlinePlayers }}/{{ serverObj.maxPlayers }} online</td>
                            <td class="server-cell right-align min-cell-size"><img class="status-light" :src="computeImageURL()"></td>
                        </tr>
                    </tbody>
                </table></td> 
            </tr>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: "ServerlistItem",
    props: ['serverObj', 'pressed'],
    methods: {
        computeImageURL: function(status) {
            return status === "Started" ? 'Green light.png' : 'Red light.png';
        }
    },
});
</script>

<style scoped>
.status-light {
    height: 20px;
}
.min-cell-size {
    min-width: 5em;
}
.right-align {
    text-align: right;
}
.fill-space {
    width: 100%;
}
.server-row:hover {
    border: 2px white solid;
}
.listblack.selected {
    border-top: 2px #2b2b2b solid; 
    border-left: 2px #2b2b2b solid; 
    border-right: 2px #505050 solid;
    border-bottom: 2px #505050 solid;
}
.listblack {
    border-spacing: 0;
    /* border: 2px solid black; */
    border-top: 2px #505050 solid;
    border-left: 2px #505050 solid;
    border-right: 2px #2b2b2b solid;
    border-bottom: 2px #2b2b2b solid;
}
.listblack:hover {
    background-color: #007305;
    border-color: white;
}
.listblack {
    width: 100%;
}
.serverlist {

    background-color: #434343;
}
.server-cell {
    /* border: 4px solid black; */
    padding: 10px 5px 5px 10px;
}
</style>