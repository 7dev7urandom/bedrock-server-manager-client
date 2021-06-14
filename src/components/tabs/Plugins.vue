<template>
    <div v-if="$store.state.servers[$store.state.selectedServer].plugins" class="fullpage">
        <Dialog v-if="uploadWindowOpen" :cancel="() => {uploadWindowOpen = false}" height="150px" width="380px">
            <h3>Upload</h3>
            <form action="/upload" method="post" id="zipupload" ref="uploadform" enctype="multipart/form-data" @submit.prevent>
                <input type="hidden" :value="$store.state.currentUserData.secretString" name="secretString">
                <input type="hidden" :value="$store.state.servers[$store.state.selectedServer].id" name="serverId">
                <input type="file" name="zipFile" accept="application/x-zip-compressed">
                <mc-button :click="uploadZipFile">Upload</mc-button>
            </form>
        </Dialog>
        <div class="outsidebox">

        <div class="flexfill" v-if="$store.state.servers[$store.state.selectedServer]">
                <table>
                    <tr>
                        <td id="pluginlist">
                            <div>
                                <list-item :fillavailable="true" :selected="selectedPluginId === ''" :dark="true"><plugin-list-item :selected="selectPlugin" :index="''" :obj="{ name: 'Install new', color: '#c6c6c6' }"/></list-item>
                                <div style="min-height: 7px;"></div>
                                <list-item v-for="plugin in $store.state.servers[$store.state.selectedServer].plugins" :key="plugin.name" :fillavailable="true" :selected="selectedPluginId === plugin.name">
                                    <plugin-list-item :index="plugin.name" :obj="plugin" :selected="selectPlugin" />
                                </list-item>
                            </div>
                        </td>
                        <td>
                           <div class="vertdivider"></div>
                        </td>
                        <td class="buttons">
                            <div class="" v-if="$store.state.servers[$store.state.selectedServer].plugins && selectedPluginId.length">
                                <h3>{{ selectedPlugin.name }}</h3><br>
                                Repo: <span v-show="selectedPlugin.repo && selectedPlugin.repo === 'Public npm package'">{{ selectedPlugin.repo }}</span>
                                <a v-show="selectedPlugin.repo && selectedPlugin.repo !== 'Public npm package'" :href="selectedPlugin.repo">{{ selectedPlugin.repo }}</a>
                                <br>
                                <span v-show="selectedPlugin.dateEdited && !selectedPlugin.dateEdited.startsWith('file:')">Edited: {{ isNaN(new Date(selectedPlugin.dateEdited).getTime()) ? selectedPlugin.dateEdited : timeToString(new Date(selectedPlugin.dateEdited)) }}</span>
                                <br>
                                <mc-button v-show="selectedPlugin.repo" :click="updatePackage">
                                    Update (from {{ selectedPlugin.repo === 'Public npm package' ? 'npm' : 'git'}})
                                </mc-button>
                                <br>
                                <mc-button :click="deletePlugin" class="red">
                                    Delete
                                </mc-button>
                            </div>
                            <div class="" v-if="!selectedPluginId.length">
                                <text-input title="Install package" :submit="installNpm" placeholder="@bdsx/plugin-example"></text-input>
                                <text-input title="Install package from repo" :submit="installRepo" placeholder="https://github.com/karikera/bdsx-maze-generator"></text-input>
                                <mc-button :click="uploadZip">Upload zip file</mc-button>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <!-- <div>
            <Dialog v-if="uploadWindowOpen" :cancel="() => {uploadWindowOpen = false}" height="150px" width="380px">
                <h3>Upload</h3>
                <form action="/upload" method="post" id="zipupload" ref="uploadform" enctype="multipart/form-data">
                    <input type="hidden" :value="$store.state.currentUserData.secretString" name="secretString">
                    <input type="hidden" :value="$store.state.servers[$store.state.selectedServer].id" name="serverId">
                    <input type="file" name="zipFile" accept="application/x-zip-compressed">
                    <mc-button :click="uploadZipFile">Upload</mc-button>
                </form>
            </Dialog>
        </div>
        <div>
            Update plugin:
            <br>
            <text-input :submit="updateGit" placeholder="example-plugin"></text-input>
        </div>
        <div v-if="isZip">
            Last batch uploaded: {{ timeToString }}
            <br>
            Uploaded by: {{ $store.state.servers[$store.state.selectedServer].scripts.uploadedAuthor }}
        </div>
        <div v-else-if="!isZip">
            <br>
        </div>
        <div>
            Set Repo: <text-input :submit="setRepo" placeholder="https://github.com/bdsx/bdsx"></text-input><br>
            <mc-button :click="upload">Upload zip file</mc-button>
        </div> -->
    </div> 

</template>

<script>
import mcButton from '../elements/mcButton.vue';
import textInput from '../elements/textField.vue';
import Dialog from '../windows/Dialog.vue';
import ListItem from '../pieces/ListItem.vue';
import PluginListItem from '../pieces/ListItemElement.vue';
import { LocalPermissions } from '../../constants';

import moment from 'moment';

export default {
    data() {
        return {
            uploadWindowOpen: false,
            update: 0,
            selectedPluginId: '',
            LocalPermissions
        }
    },
    components: {
        ListItem,
        PluginListItem,
        mcButton,
        textInput,
        Dialog
    },
    methods: {
        selectPlugin(x) {
            this.selectedPluginId = x
        },
        updatePackage() {
            this.$socket.client.emit("updatePlugin", {
                serverId: this.$store.state.servers[this.$store.state.selectedServer].id,
                plugin: this.selectedPluginId
            });
        },
        installNpm(link) {
            this.$socket.client.emit("installPlugin", {
                serverId: this.$store.state.servers[this.$store.state.selectedServer].id,
                name: link
            });
        },
        installRepo(repo) {
            this.$socket.client.emit("uploadGitRepo", {
                serverId: this.$store.state.servers[this.$store.state.selectedServer].id,
                repo
            });
        },
        deletePlugin() {
            this.$socket.client.emit("removePlugin", {
                serverId: this.$store.state.servers[this.$store.state.selectedServer].id,
                plugin: this.selectedPluginId
            });
        },
        // updateGit(plugin) {
        //     this.$socket.client.emit("updateGit", {
        //         serverId: this.$store.state.servers[this.$store.state.selectedServer].id,
        //         plugin
        //     });
        // },
        uploadZip() {
            this.uploadWindowOpen = true;
        },
        // setRepo(val) {
        //     this.$socket.client.emit("uploadGitRepo", {
        //         serverId: this.$store.state.servers[this.$store.state.selectedServer].id,
        //         repo: val
        //     });
        // },
        uploadZipFile() {
            if(!this.$refs.uploadform.elements["zipFile"].files.length) return;
            const req = new XMLHttpRequest();
            req.open('POST', '/upload', true);
            req.onload = function() {}
            req.onerror = () => {};
            req.send(new FormData(this.$refs.uploadform));
            this.uploadWindowOpen = false;
        },
        timeToString(time) {
            // this.update;
            // const scripts = this.$store.state.servers[this.$store.state.selectedServer].scripts;
            // if(!scripts) return;
            // const time = scripts.uploadedTime;
            // if(!time) return "Never";
            return moment(time).fromNow();
        },
    },
    computed: {
        selectedPlugin() {
            return this.$store.state.servers[this.$store.state.selectedServer].plugins.find(x => x.name === this.selectedPluginId);
        }
    },
    mounted() {
        this.interval = setInterval(() => this.update++, 30 * 1000); // Hack to update the time twice a minute
    },
    destroyed() {
        clearInterval(this.interval);
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