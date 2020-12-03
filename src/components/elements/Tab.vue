<template>
    <div v-show="selectedInternal">
        <slot :selected="selectedInternal"></slot>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: "Tab",
    props: {
        name: {required: true},
        selected: { default: false }
    },
    data() {
        return {
            selectedInternal: false
        }
    },
    mounted() {
        this.selectedInternal = this.selected;
    }
})
</script>
