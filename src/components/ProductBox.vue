<template>
  <div class="column is-3">
    <div class="box">
      <figure class="image mb-4">
        <img v-bind:src="product.get_thumbnail" style="width: 100%; height: 300px">
      </figure>

      <h3 class="is-size-4">{{ product.name }}</h3>
      <div>

        <p class="is-size-8 has-text-grey">{{ product.get_price }} €</p>
<!--        <p class="is-size-6 has-text-grey">{{product.get_price - (product.discount * product.get_price)  }} €</p>-->
        <p class="is-size-6 has-text-grey">-{{ product.discount * 100 }}%</p>
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
