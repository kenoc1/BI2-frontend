<template>
  <div class="column is-3">
    <div class="card box">
      <div class="card-image">
        <figure class="image mb-4">
          <img v-bind:src="product.get_thumbnail" style="width: 100%; height: 300px">
        </figure>
      </div>
      <div v-if="product.discount > 0" class="card-content is-overlay">
        <span class="tag is-primary"
              :class="product.discount > 0.4 ? 'is-danger' : 'is-warning'">{{ discountInPercent }}</span>
      </div>

      <h3 class="is-size-4">{{ product.name }}</h3>
      <div>
        <div>
          <!--        <p class="is-size-8 has-text-grey">{{ product.get_price }} €</p>-->
          <!--          <p v-if="product.discount > 0" class="is-size-4 ">{{ product.get_price }} €</p>-->
          <p class="is-size-5 has-text-grey">{{ actualPrice }} €</p>
          <p v-if="product.discount > 0" class="is-size-6 has-text-grey " style="text-decoration: line-through">
            {{ product.get_price }} €</p>
          <!--        <p class="is-size-6 has-text-grey">-{{ product.discount * 100 }}%</p>-->
        </div>
      </div>
      <router-link v-bind:to="product.get_absolute_url" class="button is-dark mt-4">Details</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductBox',
  props: {
    product: Object
  },
  computed: {
    discountInPercent() {
      return '-'+this.product.discount * 100 + '%'
    },
    actualPrice() {
      return ((this.product.get_price - (this.product.discount * this.product.get_price)).toFixed(2))
    }
  }
}
</script>

<style scoped>
.image {
  margin-top: -1.25rem;
  margin-left: -1.25rem;
  margin-right: -1.25rem;
}
</style>
