<template>
    <div class="fullpage">
        <div ref="copyWindow" v-if="copyWindowing">
            <Dialog :curServer="$store.state.servers[$store.state.selectedServer]" :cancel="closeCopyWorld" :done="doCopyWorld" :nameValue="selectedWorldId" :serverNames="$store.state.servers"></Dialog>
        </div>
        <div class="outsidebox">
            <div class="flexfill" v-if="$store.state.servers[$store.state.selectedServer]">
                <table>
                    <tr>
                        <td id="worldlist">
                            <div v-if="$store.state.servers[$store.state.selectedServer]">
                                <list-item :fillavailable="true" :selected="selectedWorldId === ''" :dark="true"><world-list-item :selected="createNew" :index="''" :obj="{ name: 'Create new', color: '#c6c6c6' }"/></list-item>
                                <div style="min-height: 7px;"></div>
                                <list-item v-for="world in $store.state.servers[$store.state.selectedServer].worlds" :key="world.name" :fillavailable="true" :selected="selectedWorldId === world.name">
                                    <world-list-item :index="world.name" :obj="world" :selected="selectWorld" />
                                </list-item>
                            </div>
                        </td>
                        <td>
                           <div class="vertdivider"></div>
                        </td>
                        <td class="buttons">
                            <div class="" v-show="selectedWorldId.length" v-if="$store.state.servers[$store.state.selectedServer].worlds">
                                <i>{{ $store.state.servers[$store.state.selectedServer].worlds[selectedWorldId] && $store.state.servers[$store.state.selectedServer].worlds[selectedWorldId].generated ? '' : '⚠ This world has not been generated yet' }}</i>
                                <mc-button :click="activateWorld" class="mcbutton" v-show="$store.state.servers[$store.state.selectedServer].access & LocalPermissions.CAN_EDIT_PROPERTIES" :disabled="$store.state.servers[$store.state.selectedServer].properties['level-name'] === selectedWorldId">
                                    {{ $store.state.servers[$store.state.selectedServer].properties['level-name'] === selectedWorldId ? "Active" : "Use" }}
                                </mc-button>
                                <mc-button :click="copyWorld" class="mcbutton" v-show="$store.state.servers[$store.state.selectedServer].access & LocalPermissions.CAN_CREATE_WORLDS && $store.state.servers[$store.state.selectedServer].worlds[selectedWorldId] && $store.state.servers[$store.state.selectedServer].worlds[selectedWorldId].generated">Copy</mc-button>
                                <mc-button :click="deleteWorld" :class="{ mcbutton: true, red: deleteConfirm }" v-show="$store.state.servers[$store.state.selectedServer].access & LocalPermissions.CAN_DELETE_WORLDS">{{ deleteConfirm ? 'Confirm?' : 'Delete' }}</mc-button>
                                <p v-show="$store.state.servers[$store.state.selectedServer].currentWorld === selectedWorldId && $store.state.servers[$store.state.selectedServer].properties['level-name'] !== selectedWorldId">
                                    <i>This world is currently running, but not selected. Once the server restarts, the world will change to '{{ $store.state.servers[$store.state.selectedServer].properties['level-name'] }}'</i>
                                </p>
                                <p v-show="$store.state.servers[$store.state.selectedServer].currentWorld !== selectedWorldId && $store.state.servers[$store.state.selectedServer].properties['level-name'] === selectedWorldId">
                                    <i>This world is selected, but not running. Once the server restarts, the world will change to this.</i>
                                </p>
                            </div>
                            <div class="" v-show="!selectedWorldId.length">
                                <text-field :submit="false" :change="setNewName" :placeholder="'penguin world'" :title="'Name: '"></text-field>
                                World Type: <select v-model="newLevelType">
                                    <option value="DEFAULT">Infinite</option>
                                    <option value="FLAT">Flat</option>
                                    <option value="LEGACY">Legacy</option>
                                </select>
                                <text-field :submit="false" :change="setSeed" :placeholder="'Random'" :title="'Seed: '"></text-field>
                                <mc-button :click="createButtonClicked">Create</mc-button>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import ListItem from '../pieces/ListItem.vue'
import WorldListItem from '../pieces/WorldListItem.vue'
import mcButton from '../elements/mcButton.vue'
import textField from '../elements/textField.vue'
import { LocalPermissions } from '../../constants'
// import Vue from 'vue';
import Dialog from '../windows/CopyWorldDialog.vue';
// import CopyWorldDialog from '../windows/CopyWorldDialog.vue'

export default {
    components: {
        ListItem,
        WorldListItem,
        mcButton,
        textField,
        // CopyWorldDialog,
        Dialog
    },
    sockets: {
        serverCopyResponse(data) {
            if(data.success) {
                this.closeCopyWorld();
            }
        }
    },
    methods: {
        selectWorld(index) {
            this.selectedWorldId = index;
        },
        activateWorld() {
            const curServer = this.$store.state.servers[this.$store.state.selectedServer];
            curServer.properties['level-name'] = this.selectedWorldId;
            this.$socket.client.emit('changeProperty', {properties: curServer.properties, serverId: curServer.id });
        },
        copyWorld() {
            this.copyWindowing = true;
        },
        doCopyWorld(name, server) {
            // console.log(name, server);
            this.$socket.client.emit("copyWorld", {
                fromServer: this.$store.state.servers[this.$store.state.selectedServer].id,
                fromWorld: this.selectedWorldId,
                toServer: server,
                toWorld: name
            });
        },
        closeCopyWorld() {
            if(!this.waitingForCopy) this.copyWindowing = false;
        },
        deleteWorld() {
            if(!this.deleteConfirm) {
                this.deleteConfirm = true;
                return;
            }
            // this.deleteConfirm = false;
            this.$socket.client.emit('deleteWorld', {
                serverId: this.$store.state.servers[this.$store.state.selectedServer].id,
                world: this.selectedWorldId
            });
        },
        createNew() {
            this.selectedWorldId = '';
        },
        setNewName(newName) {
            this.newName = newName;
        },
        createButtonClicked() {
            this.$socket.client.emit('createWorld', {
                serverId: this.$store.state.servers[this.$store.state.selectedServer].id,
                name: this.newName,
                seed: this.newSeed,
                levelType: this.newLevelType
            });
        },
        setSeed(seed) {
            this.newSeed = seed;
        }
    },
    data() {
        return {
            selectedWorldId: this.$store.state.servers[this.$store.state.selectedServer] && this.$store.state.servers[this.$store.state.selectedServer].properties['level-name'] || '',
            LocalPermissions,
            newName: '',
            newSeed: '',
            newLevelType: 'DEFAULT',
            copyWindowing: false,
            waitingForCopy: false,
            deleteConfirm: false
        }
    }
}
</script>

<style scoped>
td:not(.buttons) {
    white-space: nowrap;
}
#worldlist {
    /* min-width: 50%; */
    vertical-align: top;
}
.outsidebox {
    flex: 1 1 auto;
    display: flex;
    flex-flow: column;
}
.flexfill {
    flex: 1 1 auto;
    /* bottom: 4px; */
}
.fullpage {
    display: flex;
    flex-flow: column;
    height: 100%;
}
.vertdivider {
    height: 100%;
    width: 2px;
    background-color: #c6c6c6;
    display: inline-block;
    margin-inline-start: 5px;
}
/* td {
    height: 100%;
    display: inline-block;
} */
td {
    vertical-align: top;
}
table {
    height: 100%;
}
.buttons {
    vertical-align: top;
    /* width: fit-content; */
    width: 100%;
}
.mcbutton {
    display: block;
}
</style>