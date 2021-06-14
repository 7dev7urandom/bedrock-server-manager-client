<template>
    <tbody v-on:click="selected(index)" class="width100">
        <tr class="listwhite width100"><td class="width100">
            <div class="listcontent"><div class="dark" :style="obj.color ? `color: ${obj.color};` : ''">{{ obj.name }}</div></div>
        </td></tr>
        <!-- <tr class="server-row listwhite width100"><td class="width100">
            <div class="listcontent"><div class="dark">Ian</div><div>Admin</div></div>
        </td></tr> -->
    </tbody>
</template>
<script>
export default {
    props: ['obj', 'selected', 'index']
}
</script>
<style scoped>
.width100 {
    width: 90%;
    display: block;
}
tr .width100 {
    width: calc(100% - 10px);
}
tbody {
    padding: 10px 0 10px 10px;
}
.dark {
    color: #505050;
    font-size: 1.1em;
    text-align: center;
    vertical-align: middle;
}
</style>