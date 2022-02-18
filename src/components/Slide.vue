<template>
  <div class="slide-container is-fullwidth" id="slidecontainer">
    <img v-on:click="slideleft" src='../assets/left-arrow.png' alt="left" id="slide-left" class="arrow">
    <section class="container" :id="sliderName">
      <ProductBox
          v-for="product in products"
          v-bind:key="product.id"
          v-bind:product="product"/>
    </section>
    <img v-on:click="slideright" src="../assets/right-arrow.png" alt="right" id="slide-right" class="arrow">
  </div>
</template>

<script>
import ProductBox from '@/components/ProductBox'

export default {
  name: 'Slide',
  data() {
    return {}
  },
  components: {
    ProductBox,
  },
  props: {
    products: [],
    sliderName: String,
  },
  methods: {
    slideleft() {
      const slider = document.getElementById(this.sliderName);
      slider.scrollLeft -= 400;
    },
    slideright() {
      const slider = document.getElementById(this.sliderName);
      slider.scrollLeft += 400;
    },
  }
}
</script>

<style scoped>
.slide-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

main {
  background-color: #f4f4f4;
  padding: 4rem 0;
}

.arrow {
  width: 3rem;
  margin: 0;
  cursor: pointer;
}

.arrow:hover {
  transform: scale(1.1);

}

section {
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

section::-webkit-scrollbar {
  height: 3px;
  width: 2px;
  border: 1px solid #d5d5d5;
  background: #d5d5d5;
}


section::-webkit-scrollbar-track {
  --webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
}

section::-webkit-scrollbar-thumb {
  background-color: red;
  outline: 1px solid #eee;
}

</style>
