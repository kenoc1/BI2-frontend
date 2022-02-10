<template>
  <div class="page-category">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">{{ category.description }}</h2>
      </div>

      <ProductBox
          v-for="product in product"
          v-bind:key="product.id"
          v-bind:product="product"/>
    </div>

    <hr>
    <h2 class="is-size-2 has-text-centered">Diese Produkte könnten Sie interessieren</h2>

    <Slide sliderName="assosiations"
        v-bind:products="product"/>


  </div>
</template>

<script>
import axios from 'axios'
import {toast} from 'bulma-toast'
import Slide from '@/components/Slide'

import ProductBox from '@/components/ProductBox'

export default {
  name: 'Category',
  components: {
    ProductBox,
    Slide
  },
  data() {
    return {
      category: [],
      product: []
    }
  },
  mounted() {
    this.getCategory()
  },
  watch: {
    $route(to, from) {
      if (to.name === 'Category') {
        this.getCategory()
      }
    }
  },
  methods: {
    async getCategory() {
      const categorySlug = this.$route.params.category_slug

      this.$store.commit('setIsLoading', true)

      axios
          .get(`/api/v1/products/${categorySlug}/`)
          //.get(`/api/v1/products/test/`)
          .then(response => {
            this.product = response.data['products']
            this.category = response.data['family_data']
            //document.title = this.family.name + ' | IBSUPERMARKT'
            document.title = ' Family | IBSUPERMARKT'
          })
          .catch(error => {
            console.log(error)

            toast({
              message: 'Something went wrong. Please try again.',
              type: 'is-danger',
              dismissible: true,
              pauseOnHover: true,
              duration: 2000,
              position: 'bottom-right',
            })
          })

      this.$store.commit('setIsLoading', false)
    }
  }
}
</script>
