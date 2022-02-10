<template>


  <div class="slide-container is-fullwidth" id="slidecontainer">


    <img v-on:click="slideleft" src='../assets/left-arrow.png' alt="left" id="slide-left" class="arrow">

    <section class="container" id="slider">
      <div v-for="product in products" :key="product.id" class="thumbnail">
        <div class="imagecontainer ">
          <figure>
            <img v-bind:src="product.get_thumbnail" style="max-height: 300px; max-width: 300px">
          </figure>
        </div>

        <h2 class="is-size-4 product-details">{{ product.name }}</h2>
        <p class="is-size-6 has-text-grey product-details">{{ product.get_price }} €</p>
        <router-link v-bind:to="product.get_absolute_url" class="button is-dark mt-4">Details</router-link>
      </div>
    </section>

    <img v-on:click="slideright" src="../assets/right-arrow.png" alt="right" id="slide-right" class="arrow">

  </div>

</template>

<script>
export default {
  name: 'Slide',
  data() {
    return {}
  },
  props: {
    products: [],
  },
  methods: {
    slideleft() {
      const slider = document.getElementById("slider");
      slider.scrollLeft -= 400;
    },
    slideright() {
      const slider = document.getElementById("slider");
      slider.scrollLeft +=  400;
    }
  }
}
</script>

<style scoped>

.imagecontainer {
  display: block;
  width: 100%;
  height: 300px;
}


h1 {
  font-size: 3.5rem;
  line-height: 2;
  text-align: center;
}

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

section .thumbnail:hover {
  transform: scale(1);
}

section .thumbnail {
  flex: 0 0 auto;
  object-fit: cover;
  margin: 5px;
  overflow: hidden;
  transform: scale(.95);
  transition: all .3s;
  border: 1px solid lightgray;
  padding: 20px;
}

.product-details {
  text-align: center;
  padding-bottom: 1rem;
  background-color: #fff;
}

.product-details h2 {
  font-size: 2.2rem;
  font-weight: 600;
}

.product-details p {
  font-size: 1.6rem;
  padding: 1rem;
  font-weight: 700;
}

.product-details a {
  font-weight: normal;
  text-decoration: line-through;

}


</style>
