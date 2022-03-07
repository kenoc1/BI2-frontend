<template>
  <div class="page-checkout">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Checkout</h1>
      </div>

      <div class="column is-12 box">
        <table class="table is-fullwidth">
          <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
          </thead>

          <tbody>
          <tr
              v-for="item in cart.items"
              v-bind:key="item.product.id"
          >
            <td>{{ item.product.name }}</td>
            <td>€{{ item.product.get_price }}</td>
            <td>{{ item.quantity }}</td>
            <td>€{{ getItemTotal(item).toFixed(2) }}</td>
          </tr>
          </tbody>

          <tfoot>
          <tr>
            <td colspan="2">Total</td>
            <td>{{ cartTotalLength }}</td>
            <td>€{{ cartTotalPrice.toFixed(2) }}</td>
          </tr>
          </tfoot>
        </table>
      </div>

      <div class="column is-12 box">
        <h2 class="subtitle">Shipping details</h2>

      </div>


      <div class="column is-12 box">
        <h2 class="subtitle">Choose Payment Provider</h2>

        <p class="has-text-grey mb-4">* All fields are required</p>

        <div class="columns is-multiline">
          <div class="column is-6">


            <div class="field rows">
              <label>Payment Provider*</label>
              <div class="select row is-full">
                <select v-model="paymentservice">
                  <option>Select payment methode</option>
                  <option>Bar</option>
                  <option>Paypal</option>
                  <option>Überweisung/IBAN</option>
                  <option>Gutscheincode</option>
                  <option>Sofort Überweisung</option>
                  <option>Klarna</option>
                  <option>Nachnahme</option>
                  <option>Apple Pay</option>
                  <option>Amazon Pay</option>
                </select>
              </div>
            </div>

          </div>
        </div>

        <div class="notification is-danger mt-4" v-if="errors.length">
          <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
        </div>

        <hr>

        <button class="button is-dark" @click="submitForm">Pay</button>


      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Checkout',
  data() {
    return {
      cart: {
        items: []
      },
      user: '',
      errors: [],
      paymentservice: '',
    }
  },
  mounted() {
    document.title = 'Checkout | IBSUPERMARKT'

    this.cart = this.$store.state.cart


  },
  methods: {
    getItemTotal(item) {
      return item.quantity * item.product.get_price
    },
    async getuserinformation() {
      await axios
          .get('/api/user/information')
          .then(response => {
            console.log(response.data)
          })


          .catch(error => {
            this.errors.push('Something went wrong. Please try again')

            console.log(error)
          })

    },


    async submitForm() {
      this.errors = []
      if (this.paymentservice === '') {
        this.errors.push('The paymentservice is not choosen!')
      }

      if (!this.errors.length) {
        this.$store.commit('setIsLoading', true)
      }

      const items = []

      for (let i = 0; i < this.cart.items.length; i++) {
        const item = this.cart.items[i]
        const obj = {
          product: item.product.sku,
          quantity: item.quantity,
          price: item.product.get_price * item.quantity
        }

        items.push(obj)
      }

      const data = {
        'items': items,
        'payment_service': this.paymentservice
      }

      await axios
          .post('/api/v1/checkout/', data)
          .then(response => {
            this.$store.commit('clearCart')
            this.$router.push('/cart/success')
          })
          .catch(error => {
            this.errors.push('Something went wrong. Please try again')

            console.log(error)
          })

      this.$store.commit('setIsLoading', false)
    }
  },
  computed: {
    cartTotalPrice() {
      return this.cart.items.reduce((acc, curVal) => {
        return acc += curVal.product.get_price * curVal.quantity
      }, 0)
    },
    cartTotalLength() {
      return this.cart.items.reduce((acc, curVal) => {
        return acc += curVal.quantity
      }, 0)
    }
  }
}
</script>

<style>

.rows {
  display: flex;
  flex-direction: column;
  width: 230px;
}

.cols {
  display: flex;
  flex-direction: row;
  width: 230px;
}


</style>