<template>
    <tr class="server-row" :class="{ fillavail: fillavailable }">
        <td :class="{ fillavail: fillavailable }">
            <table class="serverlist mc-font" :class="{ selected: selected, listblack: dark, listlight: !dark, fillavail: fillavailable }" >
                        <slot></slot>
                </table></td> 
            </tr>
</template>
<script>
export default {
    name: "ListItem",
    props: ['selected', 'dark', 'fillavailable'],
};
</script>

<style scoped>
.fillavail {
    display: block;
    width: 100%;
}
.heightzero {
    height: 0;
}
.crazysize {
    width: 100vw;
}
.status-light {
    height: 20px;
}
.min-cell-size {
    min-width: 5em;
}
.right-align {
    text-align: right;
}
.fill-space {
    width: 100%;
}
/* .server-row:hover {
    border: 2px white solid;
} */
.listblack.selected {
    border-top: 2px #2b2b2b solid; 
    border-left: 2px #2b2b2b solid; 
    border-right: 2px #505050 solid;
    border-bottom: 2px #505050 solid;
}
.listblack {
    border-spacing: 0;
    /* border: 2px solid black; */
    border-top: 2px #505050 solid;
    border-left: 2px #505050 solid;
    border-right: 2px #2b2b2b solid;
    border-bottom: 2px #2b2b2b solid;
    background-color: #434343;
}
.serverlist:hover {
    background-color: #007305;
    border-color: white;
}
.listlight.selected {
    border-left: #656465 2px solid;
    border-top: #656465 2px solid;
    border-right: #f7f7f7 2px solid;
    border-bottom: #f7f7f7 2px solid;
}
.listlight {
    color: #505050;
    border-spacing: 0;
    background-color: #c6c6c6;
    border-right: #656465 2px solid;
    border-bottom: #656465 2px solid;
    border-top: #f7f7f7 2px solid;
    border-left: #f7f7f7 2px solid;
}
/* .listlight:hover {

} */
.serverlist {
    width: 100%;
    
}
.server-cell {
    /* border: 4px solid black; */
    padding: 10px 5px 5px 10px;
}
</style>