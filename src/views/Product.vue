<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

  <div class="page-product">
    <div class="columns is-multiline">
      <div class="column is-5">
        <figure class="image mb-6 productcontainer">
          <span v-if="product.discount > 0"
                class="discount is-top-0 is-right-0 ml-4 mt-4 tag has-text-weight-bold is-size-5"
                :class="product.discount > 0.4 ? 'is-danger' : 'is-warning'">{{ discountInPercent }}</span>
          <img class="productcontainer2 " v-bind:src="product.get_image">
        </figure>
      </div>

      <div class="column is-5">

        <h5 class="title mb-1">{{ product.name }}</h5>
        <p class="has-text-grey mb-3 is-size-7">SKU: {{ product.sku }}</p>
        <star-rating v-bind:product-rating="product.evaluation"></star-rating>

        <hr class="border mb-1">
        <p class="detail-text mb-4" v-if="product.description!=null">{{ product.description }}</p>

        <p class="price mb-1"> {{ actualPrice }}€
          <del class="old-price price" v-if="product.discount >0 ">{{ product.get_price }}€</del>
        </p>
        <div class="field has-addons">
          <div class="control">
            <input type="number" class="input" min="1" v-model="quantity">
          </div>

          <div class="control">
            <a class="button is-dark" @click="addToCart()">Add</a>
          </div>
        </div>

        <p class="detail-text" v-if="product.recycle=1">recycle: <i class="fa fa-lg fa-check-circle"/></p>
        <p class="detail-text" v-if="product.recycle=0">recycle: <i class="fa fa-lg fa-check-circle"/></p>

        <p class="detail-text" v-if="product.lowfat=1">low-fat: <i class="fa fa-lg fa-check-circle"/></p>
        <p class="detail-text" v-if="product.lowfat=0">low-fat: <i class="fa fa-lg fa-check-circle"/></p>
      </div>
    </div>

    <hr>

    <h2 class="is-size-2 has-text-centered">Similar Products</h2>

    <Slide sliderName="assosiations"
           v-bind:products="associated_products"/>

  </div>
</template>

<script>
import axios from 'axios'
import {toast} from 'bulma-toast'
import Slide from '@/components/Slide'
import StarRating from "../components/starRating";

export default {
  name: 'Product',
  data() {
    return {
      product: {},
      quantity: 1,
      associated_products: [],
    }
  },
  components: {
    StarRating,
    Slide
  },
  mounted() {
    this.getProduct()
  },
  computed: {
    discountInPercent() {
      return '-' + this.product.discount * 100 + '%'
    },
    actualPrice() {
      return ((this.product.get_price - (this.product.discount * this.product.get_price)).toFixed(2))
    }
  },
  watch: {
    '$route' (to, from) {
      this.getProduct()
      window.scrollTo(0,0)
    }
  },
  methods: {
    async getProduct() {
      this.$store.commit('setIsLoading', true)

      const category_slug = this.$route.params.category_slug
      const product_slug = this.$route.params.product_slug

      await axios
          .get(`/api/v1/${category_slug}/${product_slug}`)
          //.get('/api/v1/one/')
          .then(response => {

            console.log(response.data)
            this.product = response.data['product'];
            this.associated_products = response.data['associations']


            document.title = this.product.name + ' | IBSUPERMARKT'
          })
          .catch(error => {
            console.log(error)
          })

      this.$store.commit('setIsLoading', false)
    },
    addToCart() {
      if (isNaN(this.quantity) || this.quantity < 1) {
        this.quantity = 1
      }

      const item = {
        product: this.product,
        quantity: this.quantity
      }
      this.$store.commit('addToCart', item)

      toast({
        message: 'The product was added to the cart',
        type: 'is-success',
        dismissible: true,
        pauseOnHover: true,
        duration: 2000,
        position: 'bottom-right',
      })
    }
  }
}
</script>

<style lang="scss">

.seperator h5 {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1em;
}

.seperator h5::before,
.seperator h5::after {
  content: "";
  display: block;
  flex-grow: 1;
  height: 1px;
  background: #ccc;
}

.seperator h5 span {
  padding: 0 2em;
}

.border {
  border-top: 2px solid lightgray;
}

.discount {
  position: absolute;
  z-index: 99;
}

.productcontainer {
  position: relative;
  height: 800px;
  width: 550px;
}

.productcontainer2 {
  position: relative;
  border: 1px solid #d5d5d5;
}

.fa-check-circle {
  color: green;
}

.price {
  font-weight: bold;
  font-size: large;
}

.old-price {
  color: red;
  opacity: 0.5;
}

.detail-text {
  font-size: large;
}

</style>
