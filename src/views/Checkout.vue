<template>
  <div class="page-checkout is-center">
    <div class="columns is-multiline ">
      <div class="column is-12 is-offset-3">
        <h1 class="title">Checkout</h1>
      </div>

      <div class=" column is-6 box is-offset-3">
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
      <div class="column is-12"></div>

      <div class="column is-6 box is-offset-3">
        <h2 class="subtitle">Shipping details</h2>
        <p class="ml-2">{{ userinformation.firstname }} {{ userinformation.lastname }} </p>
        <p class="ml-2">{{ userinformation.street }} {{ userinformation.house_number }} </p>
        <p class="ml-2">{{ userinformation.postcode }} {{ userinformation.place }} </p>
        <p class="ml-2">{{ userinformation.country }} </p>
      </div>

      <div class="column is-12"></div>

      <div class="column is-6 box is-offset-3">
        <h2 class="subtitle">Choose Payment Provider</h2>
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
      </div>
      <div class="column is-12"></div>

      <div class="notification is-danger mt-4 column is-6 is-offset-3" v-if="errors.length">
        <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
      </div>
      <div class="column is-12"></div>

      <button class="column is-2 is-offset-5 p-0 button is-dark custombutton" @click="submitForm">Pay</button>

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
      userinformation: {
        "firstname": "",
        "lastname": "",
        "country": "",
        "postcode": "",
        "place": "",
        "street": "",
        "house_number": "",

      },
      address_data: '',
      user_data: '',
      errors: [],
      paymentservice: '',
    }
  },
  mounted() {
    document.title = 'Checkout | IBSUPERMARKT'

    this.cart = this.$store.state.cart
    this.getuserinformation()


  },
  methods: {
    getItemTotal(item) {
      return item.quantity * item.product.get_price
    },
    async getuserinformation() {
      await axios
          .get('/api/v1/user/information')
          .then(response => {
            this.address_data = response.data['address_data']
            this.user_data = response.data['user_data']

            this.userinformation.firstname = this.user_data.firstname
            this.userinformation.lastname = this.user_data.lastname
            this.userinformation.street = this.address_data.street
            this.userinformation.house_number = this.address_data.house_number
            this.userinformation.postcode = this.address_data.postcode
            this.userinformation.place = this.address_data.place
            this.userinformation.country = this.address_data.country

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
            console.log(this.$store.state.cart)
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

.custombutton {
  min-width: 80px;
  justify-content: center;
}


</style>