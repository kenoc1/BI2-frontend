<template>
  <div class="page-category">
    <div class="column">
      <h2 class="is-size-2 has-text-centered" id="description">{{ category.description }}</h2>
    </div>
    <FilterBar @PriceFilter="priceFilter" @RatingFilter="ratingFilter" @PriceSort="priceSort"
               @NameSort="nameSort"></FilterBar>
    <div class="columns is-multiline" id="products">
      <ProductBox
          v-for="product in product"
          v-bind:key="product.id"
          v-bind:product="product"/>
    </div>
    <Paginator v-bind:page="page_json" @PageChange="getCategory"></Paginator>
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
import Paginator from "../components/Paginator"
import {CCollapse} from '@coreui/vue'
import FilterHeader from "../components/FilterHeader";
import FilterBar from "./FilterBar";

export default {
  name: 'Category',
  components: {
    FilterBar,
    FilterHeader,
    Paginator,
    ProductBox,
    Slide
  },
  data() {
    return {
      category: [],
      product: [],
      page_json: [],
    }
  },
  watch: {
    $route(to, from) {
      if (to.name === 'Category') {
        this.getCategory()
      }
    }
  },
  methods: {
    async getCategory(pagination) {
      console.log(this.$store.state.nameSortParam)
      var params = '?pg=1'
      if (undefined !== pagination) {
        params = ('?pg=' + pagination)
      }

      if (this.$store.state.filterParams.length !== 0) {
        params = params + '&ftr=' + (this.$store.state.filterParams)
      }
      if (this.$store.state.priceRange.length !== 0) {
        params = params + '&pr=' + (this.$store.state.priceRange)
      }
      if (this.$store.state.priceSortParam !== '') {
        params = params + '&psrt=' + this.$store.state.priceSortParam
      }
      if (this.$store.state.nameSortParam !== '') {
        console.log('sort name')
        params = params + '&nsrt=' + this.$store.state.nameSortParam
      }
      this.makeRequest(params)
    },
    ratingFilter() {
      this.getCategory()
    },
    priceSort() {
      this.getCategory()
    },
    nameSort() {
      this.getCategory()
    },
    priceFilter() {
      this.getCategory()
    },
    makeRequest(params) {
      const categorySlug = this.$route.params.category_slug
      this.$store.commit('setIsLoading', true)
      var request_url = '/api/v1/products/' + categorySlug + params
      axios
          .get(request_url)
          .then(response => {
            var page_data = response.data['page'];
            var pageJson = JSON.parse(page_data);
            this.product = pageJson.objects
            this.category = response.data['family_data']
            this.page_json = pageJson
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
  }, mounted() {
    this.getCategory()
  }
}
</script>
<style>
</style>