<template>
    <div class="fullpage">
        <div class="childfill1">
            <mc-button id="button" :click="scrollBottom" v-show="!atBottom">Down</mc-button>
        <div ref="consolebox" id="consolebox" class="childfill2 s04" @scroll="onScroll">
            <div class="fullpage" v-if="$store.state.servers[$store.state.selectedServer] && $store.state.servers[$store.state.selectedServer].output">
                <pre v-for="(data, i) of $store.state.servers[$store.state.selectedServer].output.split('\n')" :key="i">{{ data.length > 0 ? data : " " }}</pre>
            </div>
        </div>
        </div>
        <text-field :focus="true" :submit="sendCommand" ref="textfield" :change="change" :value="$store.state.servers[$store.state.selectedServer].local.consoleInput" />
    </div>
</template>

<script>
import textField from '../elements/textField.vue';
import mcButton from '../elements/mcButton.vue';

export default {
    props: ['selected'],
    components: {
        textField,
        mcButton
    },
    data: () => {
        return {
            atBottom: true
        }
    },
    methods: {
        sendCommand(command) {
            this.$socket.client.emit("consoleCommand", { command });
            if(this.atBottom) {
                this.$store.state.servers[this.$store.state.selectedServer].local.consoleScrollPos = this.$refs.consolebox.scrollTop + this.$refs.consolebox.clientHeight;
            }
        },
        scrollBottom() {
            const console = this.$refs.consolebox;
            if(console) console.scrollTop = console.scrollHeight;
        },
        onScroll({ target: {scrollTop, clientHeight, scrollHeight }}) {
            this.atBottom = scrollTop + clientHeight >= (scrollHeight - 400);
            this.$store.state.servers[this.$store.state.selectedServer].local.consoleScrollPos = scrollTop;
        },
        change(val) {
            this.$store.state.servers[this.$store.state.selectedServer].local.consoleInput = val;
        }
    },
    mounted() {
        const scroll = this.$refs.consolebox;
        const server = this.$store.state.servers[this.$store.state.selectedServer];
        if(!scroll) return;
        if(!server) return;
        let local = server.local;
        const pos = local.consoleScrollPos;
        if(!scroll || (!pos && pos !== 0)) return;
        scroll.scrollTop = pos;
        this.$refs.textfield.focusBox();
        this.atBottom = scroll.scrollTop + scroll.clientHeight >= (scroll.scrollHeight - 400);
    },
    watch: {
        // selected(val) {
        //     if(!val) return;
        //     this.$refs.textfield.focus();
        //     const scroll = this.$refs.consolebox;
        //     console.log(scroll.scrollTop + scroll.clientHeight, scroll.scrollHeight - 400);
        //     this.atBottom = scroll.scrollTop + scroll.clientHeight >= (scroll.scrollHeight - 400);
        // }
    }
}
</script>

<style scoped>
.s04::-webkit-scrollbar {
    width: 8px;
}
.s04::-webkit-scrollbar-track {
    background-color: #444343;
    margin: 2px;
}
.s04::-webkit-scrollbar-thumb {
    background-color: #c6c6c6;
    border: 1px solid black;
}
.fullpage {
    display: flex;
    flex-direction: column;
}
.childfill2 {
    overflow-y: scroll;
    height: 100%;

}
.childfill1 {
    border: 2px solid white;
    box-sizing: border-box;
    height: 100%;
    position: relative;
    overflow: hidden;
}
pre {
    white-space: pre-wrap;
    word-wrap: break-word;
    word-break: break-all;
    margin-inline-start: 5px;
}
#button {
    position: absolute;
    right: 12px;
    bottom: 7px;
}
</style>