<template>
    <div>
        <Dialog v-show="showConfirm" :cancel="() => showConfirm = confirmDel = false" height="250px" width="600px">
            <h3>Are you sure?</h3><br>
            {{ deletingAll ? "You are about to delete this server forever, from the database AND THE DISK." : "You are about to remove this server from the database. "}}
            <br><br>
            The server will be gone forever (a long time)
            <div class="buttons">
                <mcButton :click="deleteServer" class="red">Delete it!</mcButton>
                <mcButton :click="() => showConfirm = confirmDel = false">Cancel</mcButton>
            </div>
        </Dialog>
        <h3>Server Info</h3>
        <mc-button v-show="!!this.$store.state.servers[this.$store.state.selectedServer] && hasPermissionEdit" :dark="true" :click="edit" class="button" :pressed="editing">
            <img src="pencil.png" alt="edit" align="right">
        </mc-button>
        <mc-button v-show="editing" :dark="true" :click="revert" class="button">
            <img src="revert.png" alt="revert" align="right">
        </mc-button>
        <table v-if="!!this.$store.state.servers[this.$store.state.selectedServer] && !!this.$store.state.servers[this.$store.state.selectedServer].properties" id="infotable">
            <tbody>
                <tr>
                    <td>Name:</td>
                    <td class="rightside"><span id="infotablename" :contenteditable="editing" @input="editName">{{ this.$store.state.servers[this.$store.state.selectedServer].properties['server-name'] }}</span></td>
                </tr>
                <tr>
                    <td colspan="2" class="rightside exep">
                        <!-- <br> -->
                        Description:
                        <p style="margin-inline-start: 1em;" id="infotabledesc" class="description" :contenteditable="editing" @input="editDesc">{{ this.$store.state.servers[this.$store.state.selectedServer].description }}</p>
                    </td>
                </tr>
                <tr>
                    <td>Port:</td>
                    <td class="rightside">
                        <span id="infotableport" v-show="!editing">{{ this.$store.state.servers[this.$store.state.selectedServer].properties['server-port'] }}</span>
                        <input type="number" v-model="edited.properties['server-port']" v-show="editing">
                    </td>
                </tr>
                <tr>
                    <td>Status:</td>
                    <td class="rightside"><span id="infotablestatus" :class="{ red: this.$store.state.servers[this.$store.state.selectedServer].status === 'Stopped', green: this.$store.state.servers[this.$store.state.selectedServer].status === 'Running', yellow: true}">{{ this.$store.state.servers[this.$store.state.selectedServer].status }}</span></td>
                    <!-- <td class="editbutton"><img src="pencil.png" alt="edit"></td> -->
                </tr>
                <tr>
                    <td>Players Online:</td>
                    <td class="rightside"><span id="infotableplayersonline">{{ this.$store.state.servers[this.$store.state.selectedServer].onlinePlayers.length }}</span>/<span id="infotablemax-players">{{ this.$store.state.servers[this.$store.state.selectedServer].properties['max-players'] }}</span></td>
                </tr>
                <tr>
                    <td>Version:</td>
                    <td class="rightside">
                        <span id="infotableversion">{{ this.$store.state.servers[this.$store.state.selectedServer].version }}</span>
                        <!-- If version switcher implemented use -->
                        <!-- <span id="infotableversion" v-show="!editing">{{ this.$store.state.servers[this.$store.state.selectedServer].version }}</span>
                        <select v-if="!!this.$store.state.servers[this.$store.state.selectedServer]" v-model="edited.version" v-show="editing">
                            <option v-for="version of globalMCVersions" :key="version" :value="version">{{ version }}</option>
                        </select> -->
                    </td>
                </tr>
                <tr>
                    <td>Current World:</td>
                    <td class="rightside">
                        <span>{{ $store.state.servers[$store.state.selectedServer].currentWorld }}</span>
                    </td>
                </tr>
                <tr>
                    <td>Type:</td>
                    <td class="rightside">
                        <span>{{ $store.state.servers[$store.state.selectedServer].type }}</span>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <mc-button :click="setStatus" style="width: calc(100% - 10px);" :disabled="$store.state.servers[$store.state.selectedServer].isUpdating || $store.state.servers[$store.state.selectedServer].status === 'Starting' || $store.state.servers[$store.state.selectedServer].status === 'Stopping'" v-if="hasPermissionStatus">
                            {{ { "Running": "Stop", "Stopped": "Start", "Starting": "Starting...", "Stopping": "Stopping..."}[$store.state.servers[$store.state.selectedServer].status] }}
                        </mc-button>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <mc-button :click="update" style="width: calc(100% - 10px);" :disabled="$store.state.servers[$store.state.selectedServer].isUpdating || $store.state.servers[$store.state.selectedServer].status !== 'Stopped'" v-if="hasPermissionCreate">
                            Update
                        </mc-button>
                    </td>
                </tr>
                <tr v-show="$store.state.currentUserData.globalPermissions & GlobalPermissions.CAN_DELETE_SERVER">
                    <td colspan="2">
                        <mc-button :click="confirmDelete" style="width: calc(100% - 10px);" class="red" :disabled="$store.state.servers[$store.state.selectedServer].isUpdating || serverDeleting" v-show="!confirmDel">
                            Delete
                        </mc-button>
                        <mc-button :click="confirmDeleteDialog.bind(this, true)" style="width: calc(50% - 8px);" class="red" v-show="confirmDel">
                            Delete all data
                        </mc-button>
                        <mc-button :click="confirmDeleteDialog.bind(this, false)" style="width: calc(50% - 8px);" class="red" v-show="confirmDel">
                            Remove from database
                        </mc-button>
                    </td>
                </tr>
            </tbody>
        </table>
        <p v-show="!this.$store.state.servers[this.$store.state.selectedServer]">No server selected</p>
    </div>
</template>
<script>
import mcButton from '../elements/mcButton.vue';
import { LocalPermissions, GlobalPermissions } from '../../constants';
import Dialog from '../windows/Dialog.vue';

export default {
    data: () => {
        return {
            editing: false,
            edited: { properties: {} },
            serverDeleting: false,
            GlobalPermissions,
            confirmDel: false,
            deletingAll: false,
            showConfirm: false
        }
    },
    methods: {
        confirmDelete() {
            this.confirmDel = true;
            console.log("test");
        },
        edit() {
            this.editing = !this.editing;
            if(this.editing) {
                // Deep clone issues. Not efficient but pretty much the only way without recursively `Object.assign`ing
                this.edited = JSON.parse(JSON.stringify(this.$store.state.servers[this.$store.state.selectedServer]));
            } else {
                this.edited.properties['server-port'] = parseInt(this.edited.properties['server-port']);
                for(let key in this.edited) {
                    this.$store.state.servers[this.$store.state.selectedServer][key] = this.edited[key];
                }
                this.$socket.client.emit('changeProperty', { properties: this.$store.state.servers[this.$store.state.selectedServer].properties, description: this.$store.state.servers[this.$store.state.selectedServer].description, serverId: this.$store.state.servers[this.$store.state.selectedServer].id });
            }
        },
        revert() {
            this.editing = false;
            this.edited = { properties: {} };
            document.getElementById('infotablename').innerText = this.$store.state.servers[this.$store.state.selectedServer].properties['server-name'];
            document.getElementById('infotabledesc').innerText = this.$store.state.servers[this.$store.state.selectedServer].description;
        },
        editName(evt) {
            let src = evt.target.innerText;
            this.edited.properties['server-name'] = src;
        },
        editDesc(evt) {
            let src = evt.target.innerText;
            this.edited.description = src;
        },
        setStatus() {
            if(this.$store.state.servers[this.$store.state.selectedServer].status === "Running") {
                this.$socket.client.emit("changeStatus", { serverId: this.$store.state.servers[this.$store.state.selectedServer].id, status: "Stop" });
            } else if (this.$store.state.servers[this.$store.state.selectedServer].status === "Stopped") {
                this.$socket.client.emit("changeStatus", { serverId: this.$store.state.servers[this.$store.state.selectedServer].id, status: "Start" });
            }
        },
        deleteServer() {
            this.serverDeleting = true;
            this.$socket.client.emit('deleteServer', {
                serverId: this.$store.state.servers[this.$store.state.selectedServer].id,
                deleteData: this.deletingAll
            });
        },
        confirmDeleteDialog(deleteData) {
            this.deletingAll = deleteData;
            this.showConfirm = true;
        },
        update() {
            this.$socket.client.emit('updateServer', {
                serverId: this.$store.state.servers[this.$store.state.selectedServer].id
            });
        }
    },
    components: {
        mcButton,
        Dialog
    },
    computed: {
        hasPermissionEdit() {
            return this.$store.state.servers[this.$store.state.selectedServer].access & LocalPermissions.CAN_EDIT_PROPERTIES;
        },
        hasPermissionStatus() {
            return this.$store.state.servers[this.$store.state.selectedServer].access & LocalPermissions.CAN_SET_STATUS;
        },
        hasPermissionCreate() {
            return this.$store.state.currentUserData.globalPermissions & GlobalPermissions.CAN_CREATE_SERVER;
        }
    }
    // watch: {
    // }
}
</script>
<style scoped>
.rightside:not(.exep) {
    text-align: right;
    padding-left: 20px;
    width: 100%;
}
#infotable {
    width: 100%;
    border-collapse: collapse;
    padding: 5px;
    display: block;
}
img {
    padding-right: 2px;
    height: 1.7em;
}
.button {
    float: right;
    margin: 4px;
}
/* mc-button {
    align-self: right;
} */
td:not(.rightside) {
    white-space: nowrap;
}
.buttons {
    position: absolute;
    bottom: 15px;
    right: 10px;
}
</style>