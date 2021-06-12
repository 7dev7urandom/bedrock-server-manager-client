<template>
    <div v-if="$store.state.servers[$store.state.selectedServer].scripts">
        <h3>Scripts</h3>
        <div>
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
        </div>
    </div>
</template>

<script>
import mcButton from '../elements/mcButton.vue';
import textInput from '../elements/textField.vue';
import Dialog from '../windows/Dialog.vue';
import moment from 'moment';

export default {
    data() {
        const scripts = this.$store.state.servers[this.$store.state.selectedServer].scripts || { repo: '' };
        const isZip = !scripts.repo;
        return {
            isZip,
            uploadWindowOpen: false,
            update: 0
        }
    },
    components: {
        mcButton,
        textInput,
        Dialog
    },
    methods: {
        updateGit(plugin) {
            this.$socket.client.emit("updateGit", {
                serverId: this.$store.state.servers[this.$store.state.selectedServer].id,
                plugin
            });
        },
        upload() {
            this.uploadWindowOpen = true;
        },
        setRepo(val) {
            this.$socket.client.emit("uploadGitRepo", {
                serverId: this.$store.state.servers[this.$store.state.selectedServer].id,
                repo: val
            });
        },
        uploadZipFile() {
            const req = new XMLHttpRequest();
            req.open('POST', '/upload', true);
            req.onload = function() {}
            req.onerror = () => {};
            req.send(new FormData(this.$refs.uploadform));
            this.uploadWindowOpen = false;
        }
    },
    computed: {
        timeToString() {
            this.update;
            const scripts = this.$store.state.servers[this.$store.state.selectedServer].scripts;
            if(!scripts) return;
            const time = scripts.uploadedTime;
            if(!time) return "Never";
            return moment(time).fromNow();
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