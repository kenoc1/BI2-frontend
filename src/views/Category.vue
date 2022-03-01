<template>
  <filter-header @RatingFilter="ratingFilter" @PriceSort="priceSort" @RatingSort="ratingSort"></filter-header>
  <div class="page-category">
    <div class="column is-12">
      <h2 class="is-size-2 has-text-centered" id="description">{{ category.description }}</h2>
    </div>
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

export default {
  name: 'Category',
  components: {
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
        var params = '?pg=1'
        if (undefined !== pagination) {
          params = ('?pg=' + pagination)
        }

        if (this.$store.state.filterParams.length !== 0) {
          params = params +'&ftr=' + (this.$store.state.filterParams.replaceAll(',',''))
        }
        if (this.$store.state.priceSortParam !== '') {
          params = params + '&psrt=' + this.$store.state.priceSortParam
        } else
        if (this.$store.state.ratingSortParam !== '') {
          params = params + '&rsrt=' + this.$store.state.ratingSortParam
        }
        this.makeRequest(params)
      },
      ratingFilter() {
        this.getCategory()
      },
      priceSort() {
        this.getCategory()
      },
      ratingSort() {
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
#description {
  padding-bottom: 80px;
}
</style>