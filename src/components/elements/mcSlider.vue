<template>
    <div class="slidecontainer">
        <span>
          {{ currentvalue }}
        </span>
        <input type="range" :min="min" :max="max" :value="currentvalue" class="slider" id="myRange" @change="update" :step="step" @input="x => currentvalue = x.target.value">
    </div>
</template>
<script>
export default {
    props: ['max', 'min', 'step', 'value', 'change'],
    data() {
      return {
        currentvalue: this.value
      }
    },
    methods: {
      update(value) {
        this.change(parseFloat(value.target.value));
      }
    }
}
</script>
<style scoped>
span {
  text-align: left;
}
.slidecontainer {
  width: 100%; /* Width of the outside container */
}

/* The slider itself */
.slider {
  -webkit-appearance: none;  /* Override default CSS styles */
  appearance: none;
  width: 90%;
  height: 15px; /* Specified height */
  background: #999999; /* Grey background */
  outline: none; /* Remove outline */
}

/* Mouse-over effects */
.slider:hover {
  opacity: 1; /* Fully shown on mouse-over */
}

/* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
.slider::-webkit-slider-thumb {
  -webkit-appearance: none; /* Override default look */
  appearance: none;
  /* width: 25px; Set a specific slider handle width */
  /* height: 25px; Slider handle height */
  /* background: #4CAF50; Green background */
  cursor: pointer; /* Cursor on hover */
  opacity: 1;
  width: 1.125em;
  height: 2.25em;
  background-color: #c6c6c6;
  border: 2px solid black;
}

.slider::-moz-range-thumb {
  width: 25px; /* Set a specific slider handle width */
  height: 25px; /* Slider handle height */
  background: #4CAF50; /* Green background */
  cursor: pointer; /* Cursor on hover */
}
</style>