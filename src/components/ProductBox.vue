<template>
  <div class="column is-3-desktop is-6-tablet">
    <router-link v-bind:to="product.get_absolute_url">
      <div class="has-background-white pt-2 pb-2 is-relative product-box">

        <span v-if="product.discount > 0"
              class="is-absolute is-top-0 is-left-0 ml-4 mt-4 tag has-text-weight-bold is-size-5"
              :class="product.discount > 0.4 ? 'is-danger' : 'is-warning'">{{ discountInPercent }}</span>
        <span v-if="product.discount == 0"
              class="is-absolute is-top-0 is-left-0 ml-4 mt-4 tag has-text-weight-bold is-size-5 is-white"></span>

        <a class="mt-2 mb-2 px-6 is-block" href="{{ product.get_absolute_url }}">
          <img class="mx-auto mb-5 image" style="height: 224px; object-fit: contain;" v-bind:src="product.get_thumbnail"
               alt="">
          <star-rating v-bind:product-rating="product.evaluation"></star-rating>
          <h5 class="title is-size-5 mb-2">{{ product.name }}</h5>
          <p>
            <span class="has-text-success is-size-4 has-text-weight-bold">{{ actualPrice }}€ </span>
            <span v-if="product.discount > 0" class="has-text-grey-dark is-size-5 has-text-weight-normal"
                  style="text-decoration: line-through;"> {{ product.get_price }}€</span>
          </p>
        </a>
      </div>
    </router-link>
  </div>
</template>

<script>
import StarRating from "./starRating";
export default {
  name: 'ProductBox',
  components: {StarRating},
  props: {
    product: Object
  },
  computed: {
    discountInPercent() {
      return '-' + this.product.discount * 100 + '%'
    },
    actualPrice() {
      return ((this.product.get_price - (this.product.discount * this.product.get_price)).toFixed(2))
    }
  }
}
</script>

<style scoped>
.product-box:hover {
  transform: scale(1);
}

.product-box {
  flex: 0 0 auto;
  object-fit: cover;
  overflow: hidden;
  transform: scale(.95);
  transition: all .3s;
  border: 1px solid lightgray;
}
</style>
