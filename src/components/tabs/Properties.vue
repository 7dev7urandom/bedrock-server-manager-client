<template>
    <div>
        <h3>Server Properties</h3>
        <mc-button v-show="!!this.$store.state.servers[this.$store.state.selectedServer] && hasPermission" :dark="true" :click="edit" class="button" :pressed="editing">
            <img src="pencil.png" alt="edit" align="right">
        </mc-button>
        <mc-button v-show="editing" :dark="true" :click="revert" class="button">
            <img src="revert.png" alt="revert" align="right">
        </mc-button>
        <br>
        <i>Changes will not be applied until the server restarts</i>
        <table v-if="!!this.$store.state.servers[this.$store.state.selectedServer] && !!this.$store.state.servers[this.$store.state.selectedServer].properties" id="infotable">
            <tbody>
                <!-- <tr>
                    <td>Level Type:</td>
                    <td class="rightside">
                        <select>
                            <option value="DEFAULT">Infinite</option>
                            <option value="FLAT">Flat</option>
                            <option value="LEGACY">Old</option>
                        </select>
                    </td>
                </tr> -->
                <tr>
                    <td>Default Gamemode: </td>
                    <td class="rightside">
                        <span v-show="!editing">{{ {"survival": "Survival", 'creative': 'Creative', 'adventure': 'Adventure' }[this.$store.state.servers[this.$store.state.selectedServer].properties.gamemode] }}</span>
                        <select v-model="edited.gamemode" v-show="editing">
                            <option value="creative">Creative</option>
                            <option value="survival">Survival</option>
                            <option value="adventure">Adventure</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Difficulty:</td>
                    <td class="rightside">
                        <span v-show="!editing">{{ {"hard": "Hard", "easy": "Easy", "normal": "Normal", "peaceful": "Peaceful"}[this.$store.state.servers[this.$store.state.selectedServer].properties.difficulty] }}</span>
                        <select v-model="edited.difficulty" v-show="editing">
                            <option value="peaceful">Peaceful</option>
                            <option value="easy">Easy</option>
                            <option value="normal">Normal</option>
                            <option value="hard">Hard</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Cheats:</td>
                    <td class="rightside">
                        <span v-show="!editing">{{ this.$store.state.servers[this.$store.state.selectedServer].properties['allow-cheats'] ? 'On' : 'Off' }}</span>
                        <mcswitch style="position: relative; left: 16px; top: -13px;" v-show="editing" :change="setBool.bind(this, 'allow-cheats')" :value="edited['allow-cheats']" />
                    </td>
                </tr>
                <tr>
                    <td>Max players:</td>
                    <td class="rightside">
                        <span v-show="!editing">{{ this.$store.state.servers[this.$store.state.selectedServer].properties['max-players'] }}</span>
                        <input type="number" v-model="edited['max-players']" v-show="editing">
                    </td>
                </tr>
                <tr>
                    <td>Default Player Permissions:</td>
                    <td class="rightside">
                        <span v-show="!editing">{{ {"operator": "Operator", 'member': 'Member', 'visitor': 'Visitor'}[this.$store.state.servers[this.$store.state.selectedServer].properties['default-player-permission-level']] }}</span>
                        <select v-model="edited['default-player-permission-level']" v-show="editing">
                            <option value="operator">Operator</option>
                            <option value="member">Member</option>
                            <option value="visitor">Visitor</option>
                        </select>
                    </td>
                </tr>
                <!-- <tr>
                    <td>Level Seed:</td>
                    <td class="rightside"></td>
                </tr> -->
                <tr>
                    <td>Player Idle Timeout:</td>
                    <td class="rightside">
                        <span v-show="!editing">{{ this.$store.state.servers[this.$store.state.selectedServer].properties['player-idle-timeout'] }}</span>
                        <input type="number" v-model="edited['player-idle-timeout']" v-show="editing">
                    </td>
                </tr>
                <tr>
                    <td>Autostart:</td>
                    <td class="rightside">
                        <span v-show="!editing">{{ this.$store.state.servers[this.$store.state.selectedServer].properties['autostart'] ? 'On' : 'Off' }}</span>
                        <mcswitch style="position: relative; left: 16px; top: -13px;" v-show="editing" :change="setBool.bind(this, 'autostart')" :value="edited['autostart']" />
                    </td>
                </tr>
           </tbody>
        </table>
    </div>
</template>

<script>
import mcButton from '../elements/mcButton.vue';
import { LocalPermissions } from '../../constants';
import mcswitch from '../elements/MCSwitch.vue';

export default {
    data: () => {
        return {
            editing: false,
            edited: {}
        }
    },
    methods: {
        edit() {
            this.editing = !this.editing;
            if(this.editing) {
                // Deep clone issues. Not efficient but pretty much the only way without recursively `Object.assign`ing
                this.edited = JSON.parse(JSON.stringify(this.$store.state.servers[this.$store.state.selectedServer].properties));
            } else {
                // this.edited.properties['server-port'] = parseInt(this.edited.properties['server-port']);
                for(let key in this.edited) {
                    this.$store.state.servers[this.$store.state.selectedServer].properties[key] = this.edited[key];
                    this.$socket.client.emit('changeProperty', { properties: this.$store.state.servers[this.$store.state.selectedServer].properties, serverId: this.$store.state.servers[this.$store.state.selectedServer].id });
                }
            }
        },
        revert() {
            this.editing = false;
            this.edited = {};
            document.getElementById('infotablename').innerText = this.$store.state.servers[this.$store.state.selectedServer].properties['server-name'];
            document.getElementById('infotabledesc').innerText = this.$store.state.servers[this.$store.state.selectedServer].description;
        },
        setBool(prop, val) {
            // FIXME: work with mc switch
            console.log(prop, val);
            this.edited[prop] = !!val.target.checked;
        },
        setString(prop, val) {
            this.edited[prop] = val;
        },
        setInt(prop, val) {
            this.edited[prop] = parseInt(val);
        }
    },
    components: {
        mcButton,
        mcswitch
    },
    computed: {
        hasPermission() {
            return this.$store.state.servers[this.$store.state.selectedServer].access & LocalPermissions.CAN_EDIT_PROPERTIES;
        }
    },
    // mounted() {

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
td:not(.rightside) {
    white-space: nowrap;
    height: 50px;
}
img {
    padding-right: 2px;
    height: 1.7em;
}
.button {
    float: right;
    margin: 4px;
}
</style>