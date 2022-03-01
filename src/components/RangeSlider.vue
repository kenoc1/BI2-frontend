<template>
  <div id="app rows">
    <div class='range-slider mt-4 ml-2 mr-2 row'>
      <input type="range" min="0" max="99" step="1" v-model="sliderMin">
      <input type="range" min="0" max="99" step="1" v-model="sliderMax">
    </div>
    <div class="row columns">
      <div class="column number-div">
        <input type="number" min="0" max="99" step="1" v-model="sliderMin" class="is-size-7 number-input">
      </div>
      <div class="column number-div">
        <input type="number" min="0" max="99" step="1" v-model="sliderMax" class="is-size-7  number-input">
      </div>
    </div>
    <div class="row">
      <button @click="startPriceFilter"
              class="button ml-2" id="range-button">Search for range!
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "RangeSlider",
  el: '#app',
  data() {
    return {
      minAngle: 10,
      maxAngle: 30
    }
  }, methods: {
    startPriceFilter() {
      var priceRange = [this.sliderMin, this.sliderMax]
      this.$store.commit('savePriceRange', priceRange);
      this.$emit('priceFilter', priceRange);
    }
  },
  computed: {
    sliderMin: {
      get: function () {
        var val = parseInt(this.minAngle);
        return val;
      },
      set: function (val) {
        val = parseInt(val);
        if (val > this.maxAngle) {
          this.maxAngle = val;
        }
        this.minAngle = val;
      }
    },
    sliderMax: {
      get: function () {
        var val = parseInt(this.maxAngle);
        return val;
      },
      set: function (val) {
        val = parseInt(val);
        if (val < this.minAngle) {
          this.minAngle = val;
        }
        this.maxAngle = val;
      }
    }
  }
}
</script>

<style scoped>
.range-slider {
  width: 150px;
  text-align: center;
  position: relative;
}

.range-slider input[type=range] {
  position: absolute;
  left: 0;
  bottom: 0;
}

input[type=number] {
  border:none;
}

input[type=range] {
  -webkit-appearance: none;
  width: 100%;
}

input[type=range]:focus {
  outline: none;
}

input[type=range]:focus::-webkit-slider-runnable-track {
  background: gray;
}

input[type=range]:focus::-ms-fill-lower {
  background: gray;
}

input[type=range]:focus::-ms-fill-upper {
  background: gray;
}

input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 5px;
  cursor: pointer;
  animate: 0.2s;
  background: lightgray;
  border-radius: 1px;
  box-shadow: none;
  border: 0;
}

input[type=range]::-webkit-slider-thumb {
  z-index: 2;
  position: relative;
  box-shadow: 0px 0px 0px #000;
  border: 1px solid lightgray;
  height: 13px;
  width: 13px;
  border-radius: 25px;
  background: lightgray;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -5.5px;
}

.number-div {
  width: 30px;
  border: none;
}

.number-input {
  width: 36px;
}
textarea:focus, input:focus{
    outline: none;
}

#range-button{
  height: 20px;
}
</style>