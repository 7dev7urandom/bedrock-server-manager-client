<template>
    <tbody v-on:click="selected(obj.id)" class="width100">
        <tr class="listwhite width100"><td class="width100">
            <div class="listcontent"><div class="dark">{{ obj.name }}</div><div>{{ obj.title }}</div></div>
        </td></tr>
        <!-- <tr class="server-row listwhite width100"><td class="width100">
            <div class="listcontent"><div class="dark">Ian</div><div>Admin</div></div>
        </td></tr> -->
    </tbody>
</template>
<script>
export default {
    props: ['obj', 'selected']
}
</script>
<style scoped>
.width100 {
    width: 100%;
    display: block;
}
tbody {
    padding: 10px 5px 5px 10px;
}
.dark {
    color: #222;
}
</style>