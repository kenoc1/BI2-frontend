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
    <Paginator v-bind:page="page_json" @PageChange="getCategory"></Paginator>
    <hr>
    <h2 class="is-size-2 has-text-centered">Best Products from our shop in this category!</h2>

    <Slide sliderName="favoriteProduct"
           v-bind:products="favoriteProduct"/>
  </div>
</template>

<script>
import axios from 'axios'
import {toast} from 'bulma-toast'
import Slide from '@/components/Slide'
import ProductBox from '@/components/ProductBox'
import Paginator from "../components/Paginator";

export default {
  name: 'Category',
  components: {
    Paginator,
    ProductBox,
    Slide
  },
  data() {
    return {
      category: [],
      product: [],
      page_json: [],
      favoriteProduct: [],
    }
  },
  mounted() {
    this.getCategory()
    this.getfavoriteProduct()


  },
  watch: {
    $route(to, from) {
      if (to.name === 'Category') {
        this.getCategory()
        this.getfavoriteProduct()
      }
    }
  },
  methods: {
    async getCategory(event) {
      const familySlug = this.$route.params.family_slug
      let divisionSlug = '';
      if (this.$route.params.division_slug) {
        divisionSlug = '/' + this.$route.params.division_slug
      }
      //console.log(familySlug)
      this.$store.commit('setIsLoading', true)
      var url = '/api/v1/products/' + familySlug + divisionSlug
      if (undefined !== event) {
        url = url + ('?pg=' + event)
      }

      axios
          .get(url)
          //.get(`/api/v1/products/test/`)
          .then(response => {
            console.log(response)
            var page_data = response.data['page'];
            var pageJson = JSON.parse(page_data);
            this.product = pageJson.objects
            this.category = response.data['family_data']
            this.page_json = pageJson
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
    },
    async getfavoriteProduct() {
      const familySlug = this.$route.params.family_slug
      this.$store.commit('setIsLoading', true)

      await axios
          .get('/api/v1/favoritProduct/' + familySlug)
          .then(response => {
            this.favoriteProduct = response.data
            console.log(response.data)
          })
          .catch(error => {
            console.log(error)
          })
      this.$store.commit('setIsLoading', false)
    },
  }
}
</script>