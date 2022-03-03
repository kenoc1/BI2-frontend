<template>
  <div class="page-sign-up">
    <div class="columns">
      <div class="column is-6 is-offset-3">
        <h1 class="title">Sign up</h1>

        <form @submit.prevent="submitForm">
          <div class="box is-rounded ">
            <h6 class="has-text-grey  is-bold mb-4"> User Information </h6>
            <div class="columns is-multiline">
              <div class="column field">
                <label>* Username</label>
                <div class="control">
                  <input type="text" class="input" v-model="username">
                </div>
              </div>

              <div class="column field ">
                <label>* E-Mail Address</label>
                <div class="control ">
                  <input type="email" class="input" v-model="email">
                </div>
              </div>

            </div>

            <div class="columns is-multiline">
              <div class="column field">
                <label>* Password</label>
                <div class="control">
                  <input type="password" class="input" v-model="password">
                </div>
              </div>

              <div class="column field">
                <label>* Repeat Password</label>
                <div class="control">
                  <input type="password" class="input" v-model="password2">
                </div>
              </div>

            </div>
            <hr>
            <h6 class="has-text-grey  is-bold mb-4"> Contact Information </h6>
            <div class="select mb-3 mt-1">
              <select>

                <option>Mr.</option>
                <option>Mrs.</option>
              </select>
            </div>
            <div class="columns is-multiline">
              <div class="column field">
                <label>* First Name</label>
                <div class="control">
                  <input type="text" class="input" v-model="firstname">
                </div>
              </div>

              <div class="column field">
                <label>* Last Name</label>
                <div class="control">
                  <input type="text" class="input" v-model="lastname">
                </div>
              </div>

              <div class="column field">
                <label>* Birth Date</label>
                <div class="control">
                  <input type="date" class="input" v-model="birth_date">
                </div>
              </div>
            </div>

            <div class="columns is-multiline">
              <div class="column field">
                <label>* Postcode</label>
                <div class="control">
                  <input type="number" class="input" v-model="postcode">
                </div>
              </div>

              <div class="column field">
                <label>* Place</label>
                <div class="control">
                  <input type="text" class="input" v-model="place">
                </div>
              </div>

              <div class="column field">
                <label>* Country</label>
                <div class="control">
                  <input type="text" class="input" v-model="country">
                </div>
              </div>
            </div>

            <div class="columns is-multiline">

              <div class="column field">
                <label>* Street </label>
                <div class="control">
                  <input type="text" class="input" v-model="street">
                </div>
              </div>

              <div class="column field">
                <label>* House Number</label>
                <div class="control">
                  <input type="number" class="input" v-model="house_number">
                </div>
              </div>
            </div>
          </div>

          <div class="notification is-danger" v-if="errors.length">
            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
          </div>

          <div class="field">
            <div class="control">
              <button class="button is-dark">Sign up</button>
            </div>
          </div>

          Or
          <router-link to="/log-in">click here</router-link>
          to log in!
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {toast} from 'bulma-toast'

export default {
  name: 'SignUp',
  data() {
    return {
      username: '',
      password: '',
      password2: '',
      email: '',
      salutation: 'Herr', // muss angepasst werden!!!
      birth_date: '',
      firstname: '',
      lastname: '',
      country: '',
      postcode: '',
      place: '',
      street: '',
      house_number: '',
      federal_state: '',
      address: [],
      errors: []
    }
  },
  methods: {
    submitForm() {
      this.errors = []

      if (this.username === '') {
        this.errors.push('The username is missing')
      }

      if (this.password === '') {
        this.errors.push('The password is too short')
      }

      if (this.password !== this.password2) {
        this.errors.push('The passwords doesn\'t match')
      }

      if (this.email === '') {
        this.errors.push('The E-Mail Address is missing')
      }

      if (this.firstname === '') {
        this.errors.push('The First Name is missing')
      }

      if (this.lastname === '') {
        this.errors.push('The Last Name is missing')
      }

      if (this.birth_date === '') {
        this.errors.push('The Birth Date is missing')
      }

      if (this.postcode === '') {
        this.errors.push('The Postcode is missing')
      }

      if (this.place === '') {
        this.errors.push('The Place is missing')
      }

      if (this.country === '') {
        this.errors.push('The Country is missing')
      }

      if (this.street === '') {
        this.errors.push('The Street is missing')
      }

      if (this.house_number === '') {
        this.errors.push('The House Number is missing')
      }


      if (!this.errors.length) {

        this.address = {
          country: this.country,
          postcode: this.postcode,
          place: this.place,
          street: this.street,
          house_number: this.house_number,
          federal_state: "",
        }


        const formData = {
          "login_data": {
            username: this.username,
            password: this.password
          },
          "customer": {
            salutation: this.salutation,
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            birth_date: this.birth_date
          },
          "address": this.address
        }

        axios
            .post("/api/v1/user/register/", formData)
            .then(response => {
              toast({
                message: 'Account created, please log in!',
                type: 'is-success',
                dismissible: true,
                pauseOnHover: true,
                duration: 2000,
                position: 'bottom-right',
              })

              this.$router.push('/log-in')
            })
            .catch(error => {
              if (error.response) {
                for (const property in error.response.data) {
                  this.errors.push(`${property}: ${error.response.data[property]}`)
                }

                console.log(JSON.stringify(error.response.data))
              } else if (error.message) {
                this.errors.push('Something went wrong. Please try again')

                console.log(JSON.stringify(error))
              }
            })
      }
    }
  }
}
</script>
