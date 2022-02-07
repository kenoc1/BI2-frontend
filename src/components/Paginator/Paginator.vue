<template>
  <hr>
  <div className="pagination">
    <a href="#">&laquo;</a>
    <a v-for="index in page.page_number" :key="page.id" @click="$emit('PageChange', index)"
      v-bind:class="{ active: index===page.current_page }"> {{ index }}</a>
    <a href="#">&raquo;</a>
  </div>
  <hr>
</template>

<script>
export default {
  name: "Paginator",
  props:
      ['page', 'url'],
}
</script>

<style scoped>

.pagination {
  margin: auto;
  width: 50%;
}

.pagination a {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
}

.pagination a.active {
  background-color: gray;
  color: white;
}


.pagination a:hover:not(.active) {
  background-color: #ddd;
}
</style>