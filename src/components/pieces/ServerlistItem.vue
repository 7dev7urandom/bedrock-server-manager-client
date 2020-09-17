<template>
    <tr class="server-row">
        <td>
            <table v-on:click="selected" class="listblack serverlist mc-font" :class="{ selected: this.$store.state.selectedServer === this.index }" >
                    <tbody>
                        <tr>
                            <td class="server-cell fill-space" colspan="2"><span style="color: white; font-size: 1em;">{{ server.name }}</span></td>
            
                            <td class="server-cell right-align">{{ server.version }}</td>
                            <td class="server-cell right-align min-cell-size" :class="server.status === 'Started' ? 'green' : server.status === 'Stopped' ? 'red' : 'yellow'">{{ server.status }}</td>
                        </tr>
                        <tr class="heightzero">
                            <td></td>
                            <td class="crazysize"></td>
                            <td></td>
                            <td></td>    
                        </tr>
                        <tr>
                            <td class="server-cell">{{ server.port }}</td>
                            <td class="server-cell right-align" style="white-space: nowrap;" colspan="2">{{ server.onlinePlayers }}/{{ server.maxPlayers }} online</td>
                            <td class="server-cell right-align min-cell-size"><img class="status-light" :src="computeImageURL"></td>
                        </tr>
                    </tbody>
                </table></td> 
            </tr>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: "ServerlistItem",
    props: ['index', 'obj'],
    // data: () => { 
    //     return {
    //         server: 
    //     }
    // },
    methods: {
        selected() {
            this.$store.state.selectedServer = this.index;
        }
    },
    computed: {
        computeImageURL() {
            return this.status === "Started" ? 'Green light.png' : 'Red light.png';
        },
        server() {
            console.log("called");
            return this.obj[this.index];
        }
    }
});
</script>

<style scoped>
.heightzero {
    height: 0;
}
.crazysize {
    width: 100vw;
}
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