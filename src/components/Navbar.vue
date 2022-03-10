<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link to="/">
        <img src='../assets/studolfLogo.png' id="logo">
      </router-link>
      <a class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbar-menu" role="button"
         @click="showMobileMenu = !showMobileMenu">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <div class="navbar-item">
          <form method="get" action="/search">
            <div class="field has-addons">
              <div class="control">
                <input type="text" class="input" placeholder="What are you looking for?" name="query">
              </div>

              <div class="control">
                <button class="button is-success">
                      <span class="icon">
                      <i class="fas fa-search"></i>
                      </span>
                </button>
              </div>
            </div>
          </form>
        </div>

        <div class="navbar-item has-dropdown is-hoverable">
          <!--
            <a class="navbar-link" v-for="index in familyDescription">
            <router-link to="/food" class="navbar-item">Food{{ familyDescription[index] }}</router-link>
          </a>
          -->
          <a class="navbar-link">
            <router-link to="/food" class="navbar-item">Food</router-link>
          </a>
          <div class="navbar-dropdown">
            <router-link v-for=" entry in foodDivision" :to=" entry.slug " class="navbar-item">{{
                entry.description
              }}
            </router-link>
          </div>
        </div>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            <router-link to="/drink" class="navbar-item">Drinks</router-link>
          </a>
          <div class="navbar-dropdown">
            <router-link v-for=" entry in drinkDivision" :to=" entry.slug " class="navbar-item">{{
                entry.description
              }}
            </router-link>
          </div>
        </div>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            <router-link to="/non-consumable" class="navbar-item">Non-Consumable</router-link>
          </a>
          <div class="navbar-dropdown">
            <router-link v-for=" entry in nonConsumableDivision" :to=" entry.slug " class="navbar-item">{{
                entry.description
              }}
            </router-link>
          </div>
        </div>
      </div>


      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <template v-if="$store.state.isAuthenticated">
              <router-link to="/my-account" class="button is-light">My account</router-link>
            </template>

            <template v-else>
              <router-link to="/log-in" class="button is-light">Log in</router-link>
            </template>

            <router-link to="/cart" class="button is-success">
              <span class="icon"><i class="fas fa-shopping-cart"></i></span>
              <span>Cart ({{ cartTotalLength }})</span>
            </router-link>
          </div>
        </div>
      </div>

    </div>
  </nav>
</template>

<script>


import axios from 'axios'


export default {
  name: "Navbar",

  data() {
    return {
      nonConsumableDivision: [],
      drinkDivision: [],
      foodDivision: [],
      showMobileMenu: false,
      cart: {
        items: []
      }
    }
  },
  created: function () {
    this.$store.commit('initializeStore')


    const token = this.$store.state.token

    if (token) {
      axios.defaults.headers.common['Authorization'] = "Token " + token
    } else {
      axios.defaults.headers.common['Authorization'] = ""
    }
  },
  mounted() {
    this.cart = this.$store.state.cart
    this.getDivision()
  },
  computed: {
    cartTotalLength() {
      let totalLength = 0

      for (let i = 0; i < this.cart.items.length; i++) {
        totalLength += this.cart.items[i].quantity
      }
      return totalLength
    }
  },
  methods: {
    getDivision() {
      this.foodDivision = [{description: 'Produce', slug: '/food/produce'},
        {description: 'Eggs', slug: '/food/eggs'},
        {description: 'Meat', slug: '/food/meat'},
        {description: 'Packaged Foods', slug: '/food/packaged_foods'},
        {description: 'Canned Foods', slug: '/food/canned_foods'},
        {description: 'Snacks', slug: '/food/snacks'},
        {description: 'Breakfast Foods', slug: '/food/breakfast_foods'},
        {description: 'Baked Goods', slug: '/food/baked_goods'},
        {description: 'Seafood', slug: '/food/seafood'},
        {description: 'Canned Products', slug: '/food/canned_products'},
        {description: 'Baking Goods', slug: '/food/baking_goods'},
        {description: 'Starchy Foods', slug: '/food/starchy_foods'},
        {description: 'Dairy', slug: '/food/dairy'},
        {description: 'Deli', slug: '/food/deli'},
        {description: 'Frozen Foods', slug: '/food/frozen_foods'},
        {description: 'Snack Foods', slug: '/food/snack_foods'},]

      this.drinkDivision = [{description: 'Beverages', slug: '/food/beverages'},
        {description: 'Alcoholic Beverages', slug: '/food/alcoholic_beverages'},]

      this.nonConsumableDivision = [{description: 'Household', slug: '/food/household'},
        {description: 'Health and Hygiene', slug: '/food/health_and_hygiene'},
        {description: 'Carousel', slug: '/food/carousel'},
        {description: 'Checkout', slug: '/food/checkout'},
        {description: 'Periodicals', slug: '/food/periodicals'},
        {description: 'Electronics', slug: '/food/electronics'},
        {description: 'Construction Materials', slug: '/food/construction_materials'},]
    }
  }
}

</script>

<style scoped>
#logo {
  width: 60px;
  height: 60px;
  padding: 2px;
}
</style>
