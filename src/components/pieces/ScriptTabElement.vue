<template>
    <div>
        <tr v-if="prop.type === 'heading'">
            <td rowspan="2">{{ prop.value }}</td>
        </tr>
        <div v-else-if="prop.type === 'html'">
            <tr>{{ prop.name }}</tr>
            <tr v-html="prop.html"></tr>
        </div>
        <tr v-else>
            <td>{{ prop.name + `${prop.type === "slider" ? ":" : ''}` }}</td>
            <td class="rightside" v-if="prop.type === 'slider'">
                <MCSlider :max="prop.max" :min="prop.min" :value="prop.value" :step="prop.step" :change="changeVal" />
            </td>
            <td class="rightside" v-else-if="prop.type === 'boolean'">
                <MCSwitch :value="prop.value" :change="x => changeVal(x.target.checked)" />
            </td>
            <td class="rightside" v-else-if="prop.type === 'select'">
                <select :name="prop.id" @change="x => changeVal(x.target.value)">
                    <option v-for="option of prop.options" :value="option" :key="option" :selected="option === prop.value">{{ option }}</option>
                </select>
            </td>
            <td class="rightside" v-else-if="prop.type === 'command'">
                <textField :submit="changeVal" :placeholder="prop.value" />
            </td>
            <td class="rightsid" v-else-if="prop.type === 'textarea'">
                <textarea @change="() => changeVal(this.value)" cols="30" rows="10"></textarea>
            </td>
            <td class="rightside" v-else>
                <span>
                    {{ prop.value }}
                </span>
            </td>
        </tr>
    </div>
</template>

<script>
import MCSwitch from '../elements/MCSwitch.vue';
import MCSlider from '../elements/mcSlider.vue';
import textField from '../elements/textField.vue';

export default {
    props: ['prop', 'changeVal'],
    components: {
        MCSwitch,
        MCSlider,
        textField
    },
    methods: {
        log() {
            console.log(Array.from(arguments));
        }
    },
    mounted() {
        if(!window.settings) window.settings = {};
        if(this.prop.type !== 'html') return;
        window.settings[this.prop.id] = {
            changed: (value) => {
                window.settings[this.prop.id].value = value;
                this.changeVal(value);
            },
            value: this.prop.value,
        };
        eval(this.prop.js ?? '');
    }
}
</script>
<style scoped>
.rightside:not(.exep) {
    text-align: right;
    padding-left: 20px;
    width: 100%;
}
td:not(.rightside) {
    white-space: nowrap;
    height: 50px;
}
</style>