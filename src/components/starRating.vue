<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

  <span v-for="index in 5" v-bind:class="{ checked: index <= productRating }" class="fa fa-star fa-lg"></span>
</template>

<script>
export default {
  name: "starRating",
  props:
      ["productRating"],
}
</script>

<style scoped>
.checked {
  color: orange !important;
}

.fa-star {
  color: lightgray;
}
</style>