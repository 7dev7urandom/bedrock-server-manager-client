<template>
    <div>
        <h3>Server Info</h3>
        <mc-button v-show="!!selected.name" :dark="true" :toggle="true" :click="edit" class="button">
            <img src="pencil.png" alt="edit" align="right">
        </mc-button>
        <table v-show="!!selected.name" id="infotable">
            <tbody>
                <tr>
                    <td>Name:</td>
                    <td class="rightside"><span id="infotablename">{{ selected.name }}</span></td>
                </tr>
                <tr>
                    <td colspan="2" class="rightside exep">
                        <!-- <br> -->
                        Description:
                        <p style="margin-inline-start: 1em;" id="infotabledesc" class="description">{{ selected.description }}</p>
                    </td>
                </tr>
                <tr>
                    <td>Status:</td>
                    <td class="rightside"><span id="infotablestatus" :class="{ red: selected.status === 'Stopped', green: selected.status === 'Started', yellow: true}">{{ selected.status }}</span></td>
                    <!-- <td class="editbutton"><img src="pencil.png" alt="edit"></td> -->
                </tr>
                <tr>
                    <td>Players Online:</td>
                    <td class="rightside"><span id="infotableplayersonline">{{ selected.onlinePlayers }}</span>/<span id="infotablemaxplayers">{{ selected.maxPlayers }}</span></td>
                </tr>
                <tr>
                    <td>Port:</td>
                    <td class="rightside">
                        <span id="infotableport" v-show="!editing">{{ selected.port }}</span>
                        <input type="number" v-model="selected.port" v-show="editing">
                    </td>
                </tr>
                <tr>
                    <td>Version:</td>
                    <td class="rightside">
                        <span id="infotableversion" v-show="!editing">{{ selected.version }}</span>
                        <select v-if="!!selected.name" v-model="selected.version" v-show="editing">
                            <option v-for="version of globalMCVersions" :key="version" :value="version">{{ version }}</option>
                        </select>
                    </td>
                </tr>
            </tbody>
        </table>
        <p v-show="!selected.name">No server selected</p>
        <div v-show="hasChanges" class="apply">
            <button><span class="innerbutton">Apply</span></button>
            <button><span class="red innerbutton">Revert</span></button>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import mcButton from '../elements/mcButton.vue'
export default Vue.extend({
    props: ['selected'],
    data: () => {
        return {
            hasChanges: false,
            editing: false
        }
    },
    methods: {
        edit(pressed) {
            console.log("edit: " + pressed);
            this.editing = pressed;
            // document.querySelectorAll(".rightside").forEach(e => 
            //     [].forEach.call(e.children, el => 
            //     el.setAttribute("contenteditable", "true")
            // )); 
        }
    },
    components: {
        mcButton
    }
})
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
h3 {
    display: inline-block;
    /* margin-inline-start: 5px; */
    font-weight: normal;
}
.button {
    float: right;
    margin: 4px;
}
/* mc-button {
    align-self: right;
} */
</style>