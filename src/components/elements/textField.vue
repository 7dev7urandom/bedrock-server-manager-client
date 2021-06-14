<template>
    <div>
        {{ title ? title : '' }}
        <form v-on:submit.prevent="onSubmit" >
            <input v-if="submit" type="submit" class="submit" value="Submit">
            <div>
                <input class="text" type="text" v-model="text" :placeholder="placeholder ? placeholder : ''" ref="box">
            </div>
        </form>
    </div>
</template>

<script>
export default {
    props: ['submit', 'change', 'title', 'placeholder', 'value', 'focus'],
    methods: {
        onSubmit() {
            if(this.submit) this.submit(this.text);
            this.text = '';
        },
        focusBox() {
            this.$refs.box.focus();
        }
    },
    mounted() {
        if(this.focus) this.focusBox();
        if(this.value) this.text = this.value;
    },
    data() {
        return {
            text: ''
        }
    },
    watch: {
        text(val, oldval) {
            if(this.change) this.change(val, oldval);
        }
    }
}
</script>

<style scoped>
*:focus {
    outline: none;
}
input.text {
    background-color: #5e5e5e;
    padding: 10px;
    padding-left: 5px;
    font: 400 16px Minecraftia;
    color: white;
    width: stretch;
    height: 100%;
    /* overflow: hidden; */
}
input.submit {
    float: right;
    width: 6em;
    height: 100%;
    border-right: #656465 3px solid;
    border-bottom: #656465 3px solid;
    border-top: #f7f7f7 3px solid;
    border-left: #f7f7f7 3px solid;
    font: 400 16px Minecraftia;
    padding: 9px;
    color: #505050;
    background-color: #c6c6c6;
    /* outline: 2px solid black; */
}
div {
    overflow: hidden;
    /* height: 60px; */
    /* padding-right: 0.5em; */
}
form {
        margin-top: 5px;

}
</style>