<template>
  <div class="page-cart">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Cart</h1>
      </div>

      <div class="column is-12 box">
        <table class="table is-fullwidth" v-if="cartTotalLength">
          <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th></th>
          </tr>
          </thead>

          <tbody>
          <CartItem
              v-for="item in cart.items"
              v-bind:key="item.product.id"
              v-bind:initialItem="item"
              v-on:removeFromCart="removeFromCart"/>
          </tbody>
        </table>
        <p v-else>You don't have any products in your cart...</p>
      </div>

      <div class="column is-12 box">
        <h2 class="subtitle">Summary</h2>
        <strong>${{ cartTotalPrice.toFixed(2) }}</strong>, {{ cartTotalLength }} items
        <hr>
        <router-link to="/cart/checkout" class="button is-dark">Proceed to checkout</router-link>
      </div>
    </div>
    <div class="">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">Best products for your shopping cart contents!</h2>
      </div>
      <Slide sliderName="assosiationsCart"
             v-bind:products="assosiationsCart"/>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import CartItem from '@/components/CartItem.vue'
import ProductBox from '@/components/ProductBox'
import Slide from '@/components/Slide'

export default {
  name: 'Cart',
  components: {
    CartItem,
    ProductBox,
    Slide
  },
  data() {
    return {
      assosiationsCart: [],
      latestProducts: [],
      cart: {
        items: []
      }
    }
  },
  mounted() {
    this.cart = this.$store.state.cart
    this.getLatestProducts()
  },
  methods: {
    removeFromCart(item) {
      this.cart.items = this.cart.items.filter(i => i.product.sku !== item.product.sku)
    },

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
    },

    async getAssosiationsCart() {
      this.$store.commit('setIsLoading', true)

      await axios
          .get('/api/v1/cart-recommendations/')
          .then(response => {
            this.assosiationsCart = response.data
          })
          .catch(error => {
            console.log(error)
          })
      this.$store.commit('setIsLoading', false)
    }
  },
  computed: {
    cartTotalLength() {
      return this.cart.items.reduce((acc, curVal) => {
        return acc += curVal.quantity
      }, 0)
    },
    cartTotalPrice() {
      return this.cart.items.reduce((acc, curVal) => {
        return acc += curVal.product.get_price * curVal.quantity
      }, 0)
    },
  }
}
</script>