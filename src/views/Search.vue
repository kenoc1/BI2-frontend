<template>
  <div class="page-search">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Search</h1>

        <h2 class="is-size-5 has-text-grey">Search term: "{{ query }}"</h2>
      </div>

      <ProductBox
          v-for="product in products"
          v-bind:key="product.id"
          v-bind:product="product"/>

    </div>
  </div>
  <Paginator v-bind:page="page_json" @PageChange="performSearch"></Paginator>
</template>

<script>
import axios from 'axios'
import ProductBox from '@/components/ProductBox.vue'
import Paginator from "../components/Paginator";

export default {
  name: 'Search',
  components: {
    Paginator,
    ProductBox
  },
  data() {
    return {
      products: [],
      query: '',
      page_json:[]
    }
  },
  mounted() {
    document.title = 'Search | IBSUPERMARKT'

    let uri = window.location.search.substring(1)
    let params = new URLSearchParams(uri)

    if (params.get('query')) {
      this.query = params.get('query')

      this.performSearch()
    }
  },
  methods: {
    async performSearch(event) {
      this.$store.commit('setIsLoading', true)
      var url = '/api/v1/products/search/'
      await axios
          .post(url, {'query': this.query, 'pg': event})
          .then(response => {
            var page_data = response.data['page'];
            var pageJson = JSON.parse(page_data);
            this.page_json = pageJson
            this.products = pageJson.objects
          })
          .catch(error => {
            console.log(error)
          })

      this.$store.commit('setIsLoading', false)
    }
  }
}
</script>