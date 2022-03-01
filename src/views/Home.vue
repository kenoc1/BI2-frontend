<template>
  <div class="home">
    <section class="hero is-medium is-dark mb-6">
      <h2 class="is-size-2 has-text-centered">Welcome to Studolf!</h2>
    </section>

    <div class="">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">Products on sale!</h2>
      </div>

      <Slide sliderName="discounts"
             v-bind:products="latestProducts"/>

    </div>

    <hr>
    <h2 class="is-size-2 has-text-centered">These products may interest you</h2>

    <Slide sliderName="assosiations"
           v-bind:products="latestProducts"/>

  </div>


</template>

<script>
import axios from 'axios'
import ProductBox from '@/components/ProductBox'
import Slide from '@/components/Slide'


export default {
  name: 'Home',
  data() {
    return {
      latestProducts: [],
    }
  },
  components: {
    ProductBox,
    Slide
  },

  mounted() {
    this.getLatestProducts()

    document.title = 'Home | IBSUPERMARKT'


  },
  methods: {
    async getLatestProducts() {
      this.$store.commit('setIsLoading', true)

      await axios
          .get('/api/v1/latest-products/')
          .then(response => {
            this.latestProducts = response.data
          })
          .catch(error => {
            console.log(error)
          })

      this.$store.commit('setIsLoading', false)
    }
  },
}
</script>
