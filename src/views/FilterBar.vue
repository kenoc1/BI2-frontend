<template>
  <div class="columns wrapper-div box mt-2">
    <div class="column upper-div">
      <h1 class="is-size-4">Sort <i class="fa fa-sort"></i></h1>
      <div class="columns">
        <div class="column rows">
          <p class="is-size-5 mb-2">Price</p>
          <div class="row">
            <a @click="setPriceSort('HighToLow')" href="#" id="PriceHighToLow" class="button sort-button">
              <i class="fa fa-arrow-up mr-1 sort-item"></i>
              High to low
            </a>
          </div>
          <div class="row">
            <a @click="setPriceSort('LowToHigh')" href="#" id="PriceLowToHigh" class="button sort-button">
              <i class="fa fa-arrow-down mr-1 sort-item"></i>
              Low to high
            </a>
          </div>
        </div>
        <div class="column rows">
          <p class="is-size-5 mb-2">Name</p>
          <div class="row">
            <a @click="setNameSort('HighToLow')" href="#" class="button sort-button" id="NameHighToLow">
              <i class="fa fa-arrow-up mr-1"></i>
              A to Z
            </a>
          </div>
          <div class="row">
            <a @click="setNameSort('LowToHigh')" href="#" class="button sort-button" id="NameLowToHigh">
              <i class="fa fa-arrow-down mr-1"></i>
              Z to A
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="column columns">
      <div class="column">
        <h1 class="is-size-4 mb-2">Filter <i class="fa fa-filter"/></h1>
        <div class="rows" id="filter-block">
          <div class="row">
            <label @click="setRatingFilter(1);">
              <input type="checkbox" class="rating-checkbox" id="1" value='1' v-model="checkedRatings">
            </label>
            <span v-for="index in 5" v-bind:class="{ checked: index <= 1 }" class="fa fa-star"></span>

          </div>
          <div class="row">
            <label @click="setRatingFilter(2);">
              <input type="checkbox" class="rating-checkbox" id="2" value='2' v-model="checkedRatings">
            </label>
            <span v-for="index in 5" v-bind:class="{ checked: index <= 2 }" class="fa fa-star"></span>

          </div>
          <div class="row">
            <label @click="setRatingFilter(3);">
              <input type="checkbox" class="rating-checkbox" id="3" value='3' v-model="checkedRatings">
            </label>
            <span v-for="index in 5" v-bind:class="{ checked: index <= 3 }" class="fa fa-star"></span>

          </div>
          <div class="row">
            <label @click="setRatingFilter(4);">
              <input type="checkbox" class="rating-checkbox" id="4" value='4' v-model="checkedRatings">
            </label>
            <span v-for="index in 5" v-bind:class="{ checked: index <= 4 }" class="fa fa-star"></span>

          </div>
          <div class="row">
            <input @click="setRatingFilter(5)" type="checkbox" class="rating-checkbox" id="5" value='5'
                   v-model="checkedRatings">
            <span v-for="index in 5" v-bind:class="{ checked: index <= 5 }" class="fa fa-star"></span>
          </div>
        </div>
      </div>
      <div class="column rows">
        <p class="is-size-5 mb-3 mt-5">Price</p>
        <div class="row">
          <RangeSlider @PriceFilter="forwardEvent"></RangeSlider>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import RangeSlider from "../components/RangeSlider";

export default {
  name: "FilterBar",
  props: {
    checkedFilter: []
  },
  components: {RangeSlider},
  methods: {
    checkBoxes() {
      let filterParams = this.$store.state.filterParams;
      for (let i = 0; i < filterParams.length; i++) {
        document.getElementById(filterParams[i]).checked = true;
      }
    },
    showActiveLink() {
      if (this.$store.state.priceSortParam === 'HighToLow') {
        document.getElementById('PriceHighToLow').classList.add('active-element')
        document.getElementById('PriceLowToHigh').classList.remove('active-element')
        document.getElementById('NameLowToHigh').classList.remove('active-element')
        document.getElementById('NameLowToHigh').classList.remove('active-element')
      } else if (this.$store.state.priceSortParam === 'LowToHigh') {
        document.getElementById('PriceLowToHigh').classList.add('active-element')
        document.getElementById('PriceHighToLow').classList.remove('active-element')
        document.getElementById('NameHighToLow').classList.remove('active-element')
        document.getElementById('NameHighToLow').classList.remove('active-element')
      } else if (this.$store.state.nameSortParam === 'HighToLow') {
        document.getElementById('NameHighToLow').classList.add('active-element')
        document.getElementById('NameLowToHigh').classList.remove('active-element')
        document.getElementById('PriceLowToHigh').classList.remove('active-element')
        document.getElementById('PriceLowToHigh').classList.remove('active-element')
      } else if (this.$store.state.nameSortParam === 'LowToHigh') {
        document.getElementById('NameLowToHigh').classList.add('active-element')
        document.getElementById('NameHighToLow').classList.remove('active-element')
        document.getElementById('PriceHighToLow').classList.remove('active-element')
        document.getElementById('PriceHighToLow').classList.remove('active-element')
      }
    },
    setPriceSort(direction) {
      this.$store.commit('removeNameSort')
      this.$store.commit('savePriceSort',
          direction);
      this.$emit('PriceSort');
      this.showActiveLink()
    },
    setNameSort(direction) {
      this.$store.commit('removePriceSort')
      this.$store.commit('saveNameSort',
          direction);
      this.$emit('NameSort');
      this.showActiveLink()
    },
    setRatingFilter(value) {
      if (!this.checkedRatings.includes(value)) {
        this.checkedRatings.push(value)
      } else {
        this.removeFromCheckedRatings(value)
      }
      this.$store.commit('saveFilter', this.checkedRatings.join(''));
      this.$emit('RatingFilter');
    },
    removeFromCheckedRatings(value) {
      const index = this.checkedRatings.indexOf(value);
      if (index > -1) {
        this.checkedRatings.splice(index, 1); // 2nd parameter means remove one item only
      }
    },
    forwardEvent() {
      this.$emit('PriceFilter')
    }
  }
  ,
  mounted() {
    this.checkBoxes()
    this.showActiveLink()
  }
  ,

  data() {
    return {
      checkedRatings: []
    }
  }
}
</script>

<style scoped>
.wrapper-div {
  background-color: white;
}

.checked {
  color: orange !important;
}

.fa-star {
  color: lightgray;
}

.rating-checkbox {
  margin-right: 5px;
}

#filter-block {
  width: 110px;
  padding-left: 4px;
  padding-right: 4px;
  margin-right: 12px;
}

.sort-button {
  margin-top: 4px;
}

.upper-div {
  border-right: 2px solid lightgray;
}

.active-element {
  border: 2px solid black;
  background-color: lightgray;
}
</style>