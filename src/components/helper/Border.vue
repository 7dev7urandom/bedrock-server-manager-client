<template>
    <div class="s02">
        <div class="s03">
            <div class="s04">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<style scoped>
.s02 {
    background-color: #111;
    border-right: #656465 2px solid;
    border-top: #f7f7f7 2px solid;
    border-left: #f7f7f7 2px solid;
    border-bottom: #656465 2px solid;
    /* z-index: 1; */
    border-radius: 3px;
    height: calc(100% - 5px);
}
.s03 {
    border: 5px solid #c6c6c6;
    padding: 5px;
    height: calc(100% - 20px) !important;
}
.s04 {
    height: calc(100% - 5px);
    overflow-y: scroll;
}
.s04::-webkit-scrollbar {
    width: 7px;
}
.s04::-webkit-scrollbar-track {
    background-color: #444343;
}
.s04::-webkit-scrollbar-thumb {
    background-color: #c6c6c6;
    border: 1px solid black;
}
</style>