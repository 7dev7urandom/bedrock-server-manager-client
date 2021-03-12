<template>
    <label class="switch" :title="disabled ? 'You cannot change this' : ''">
        <input @change="change" type="checkbox" :checked="value" :disabled="disabled">
        <span :class="{ switchinternal: true, noText: !$slots.default }">
            <span class="switchtab">
                <span class="switchtabborder"></span>
            </span>
            <span class="switchdash"></span>
        </span>
        <span :class="{ switchtext: true, tint: disabled }">
            <slot></slot>
        </span>
    </label>
</template>
<script>
export default {
    name: 'MCSwitch',
    props: ['change', 'value', 'disabled']
}
</script>
<style scoped>
.switchtext {
    margin-inline-start: 6em;
    margin-top: 0.6em;
    display: inline-block;
    /* position: absolute; */
}
.tint {
    color: #999;
}
.noText {
    width: 0;
    right: -10px;
}
.switch {
    display: block;
    margin: 10px;
    /* left: -65px;
    top: -30px; */
    position: relative;
}
.switch input {
    opacity: 0;
    cursor: pointer;
    position: absolute;
}
.switchinternal {
    background-color: #3d3d3d;
    width: 3em;
    height: 1.5em;
    position: absolute;
    margin: 10px;
    margin-left: 15px;
    border: 2px solid black;
}
.switch input:checked ~ .switchinternal {
    background-color: #7f7f7f;
    
}
.switchtab {
    position: absolute;
    top: calc(-0.4em - 2px);
    left: calc(-0.5625em - 2px);
    width: 1.125em;
    height: 2.25em;
    background-color: #c6c6c6;
    border: 2px solid black;
}
.switch:hover input:not(:disabled) ~ .switchinternal {
    border: 2px solid white;
    box-shadow: 0 3000px rgba(0, 255, 0, 0.4) inset;
}
.switch:hover input:not(:disabled) ~ .switchinternal .switchtab {
    border: 2px solid white;
    box-shadow: 0 3000px rgba(0, 255, 0, 0.4) inset;
}
.switch input:disabled ~ .switchinternal .switchtab {
    box-shadow: 0 3000px rgba(0, 0, 0, 0.5) inset;
}
.switch input:disabled ~ .switchinternal {
    box-shadow: 0 3000px rgba(0, 0, 0, 0.3) inset;
}
.switch input:checked ~ .switchinternal .switchtab {
    left: 2.4375em;
}
/* Used a better tooltip option */
/* .switch input:disabled ~ .switchinternal[data-tooltip]::before {
    position: absolute;
    content: attr(data-tooltip);
    opacity: 0;
}
.switch input:disabled ~ .switchinternal[data-tooltip]:hover::before {
    opacity: 1;
} */
.switchdash {
    width: 0.3em;
    height: 0.975em;
    background-color: #7f7f7f;
    align-self: center;
    margin: 0;
    left: 1.35em;
    top: 0.2625em;
    border: none;
    position: absolute;
}
.switch input:checked ~ .switchinternal .switchdash {
    background-color: #3d3d3d;
}

.switchtabborder {
    border-right: #656465 2px solid;
    border-top: #f7f7f7 2px solid;
    border-left: #f7f7f7 2px solid;
    border-bottom: #656465 2px solid;
    display: block;
    height: -webkit-fill-available;
}
</style>