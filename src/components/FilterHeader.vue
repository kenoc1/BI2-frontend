<template>
  <link rel="stylesheet" href="//code.jquery.com/ui/1.13.1/themes/base/jquery-ui.css">
  <div id="head-div" class="is-flex  mb-2">
    <div class="dropdown is-hoverable is-flex">
      <div class="dropdown-trigger">
        <button class="button" aria-haspopup="true" aria-controls="dropdown-menu4">
          <span id="sort-text">Sort by</span>
          <i class="fa fa-sort"></i>
        </button>
      </div>
      <div class="dropdown-menu" id="dropdown-menu4" role="menu">
        <div class="dropdown-content columns">
          <div class="column">
            <p>Price</p>
            <a @click="setPriceSort('HighToLow')" href="#" class="dropdown-item" id="HighToLow">
              <i class="fa fa-arrow-up mr-1 sort-item"></i>
              High to low
            </a>
            <a @click="setPriceSort('LowToHigh')" href="#" class="dropdown-item" id="LowToHigh">
              <i class="fa fa-arrow-down mr-1 sort-item"></i>
              Low to high
            </a>
          </div>
          <div class="column">
            <p>Rating</p>
            <a @click="setRatingSort('HighToLow')" href="#" class="dropdown-item">
              <i class="fa fa-arrow-up mr-1"></i>
              High to low
            </a>
            <a @click="setRatingSort('LowToHigh')" href="#" class="dropdown-item">
              <i class="fa fa-arrow-down mr-1"></i>
              Low to high
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="dropdown is-hoverable is-flex">
      <div class="dropdown-trigger">
        <button class="button" aria-haspopup="true" aria-controls="dropdown-menu4">
          <span id="filter-text">Filter</span>
          <i class="fa fa-filter"></i>
        </button>
      </div>
      <div class="dropdown-menu" id="dropdown-filter" role="menu">
        <div class="dropdown-content filter-div">
          <div class="columns is-gapless">
            <div class="column">
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
            <div class="column">
              <RangeSlider @PriceFilter="forwardEvent"></RangeSlider>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RangeSlider from "./RangeSlider";

export default {
  name: "FilterHeader",
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
        document.getElementById('HighToLow').classList.add('active-element')
        document.getElementById('LowToHigh').classList.remove('active-element')
      } else if (this.$store.state.priceSortParam === 'LowToHigh') {
        document.getElementById('LowToHigh').classList.add('active-element')
        document.getElementById('HighToLow').classList.remove('active-element')
      }
    },
    setPriceSort(direction) {
      this.$store.commit('savePriceSort',
          direction);
      this.$emit('PriceSort');
      this.showActiveLink()
    },
    setRatingSort(direction) {
      this.$store.commit('saveRatingSort',
          direction);
      this.$emit('RatingSort');
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
    forwardEvent(){
      this.$emit('PriceFilter')
    }
  },
  mounted() {
    this.checkBoxes()
    this.showActiveLink()
  },

  data() {
    return {
      checkedRatings: []
    }
  }
}
</script>

<style scoped>
#sort-text {
  margin-right: 5px;
}

#filter-text {
  margin-right: 5px;
}

#head-div {
  margin-left: auto;
  margin-right: 0;

}

.dropdown {
  opacity: 0.8;
  margin-left: 20px;
}

.dropdown-content {
  margin-top: 1px;
}

.dropdown-menu {
  overflow: hidden;
  float: right;
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

.filter-button {
  height: 20px;
}

#filter-block {
  width: 110px;
  padding-left: 4px;
  padding-right: 4px;
  border-right: 2px solid lightgray;
  margin-right: 12px;
}

.active-element {
  background-color: lightgray;
}
</style>