<template>
    <div class="fullpage">
        <div class="tabs">
            <div v-for="tab in tabs" :class="{ 'tab': true, 'selected': tab.selectedInternal }" v-bind:key="tab.name" @click="selectTab(tab)">
                <span class="mc-font tabtext">{{ tab.name }}</span>
            </div>
        </div>
        <div class="tabs-details position-div">
            <Border>
                <slot></slot>
            </Border>
        </div>
    </div>
</template>
<script>
import Border from '../helper/Border.vue'

export default {
    name: "TabSystem",
    data: () => {
        return {
            tabs: []
        }
    },
    mounted() {
        this.tabs = this.$children.reduce((a, cur) => a.concat(cur.$children), []);
    },
    methods: {
        selectTab(tabToSelect) {
            this.tabs.forEach(tab => {
                tab.selectedInternal = (tab.name == tabToSelect.name);
            });
        }
    },
    components: {
        // eslint-disable-next-line vue/no-unused-components
        Border,
    }
}
</script>
<style scoped>
.tab {
    /* position: absolute; */
    /* width: 80px; */
    background-color: #626262;
    border-right: #2b2b2b 4px solid;
    border-top: #c7c7c7 2px solid;
    border-left: #c7c7c7 2px solid;
    /* border-bottom: #f7f7f7 2px solid; */
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    display: inline-block;
    /* z-index: 2; */
    max-height: 46px;
    margin-right: 4px;
}
.tabtext {
    margin-inline-start: 0.5em;
    margin-inline-end: 0.5em;
    margin-block-start: 0.5em;
    margin-block-end: 1em;
    display: block;
    text-decoration: none;
    font-family: Minecraftia;
    color: #b3b3b3;
}
.selected > .tabtext {
    color: #505050;
}
.tab.selected {
    
    background-color: #c6c6c6;
    border-right: #656465 4px solid;
    border-top: #f7f7f7 2px solid;
    border-left: #f7f7f7 2px solid;
    color: #505050;
    /* z-index: 0; */
    max-height: none;
}
</style>