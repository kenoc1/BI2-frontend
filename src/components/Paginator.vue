<template>
  <hr>
  <div  className="pagination">
    <a @click="$emit('PageChange', page.current_page -1)" v-if="page.current_page!==1">&laquo;</a>
    <a v-for="index in array_length + 1" :key="page.id" @click="$emit('PageChange', index + start_number - 1 )"
       v-bind:class="{ active: index+start_number -1===page.current_page }"> {{ index + start_number - 1 }}</a>
    <a @click="$emit('PageChange', page.current_page +1)" v-if="page.current_page < page.total_page_number">&raquo;</a>
  </div>
  <hr>
</template>

<script>

export default {
  name: "Paginator",
  props:
      ['page', 'url'],
  methods: {
    calc_start_page: function () {
      if (this.$props.page.current_page >= 5) {
        this.start_number = this.$props.page.current_page - 4
      } else if (this.$props.page.current_page <= 4) {
        this.start_number = 1
      }
      return this.start_number
    },
    calc_end_page: function () {
      if (this.$props.page.total_page_number >= this.$props.page.current_page + 5) {
        this.end_number = this.$props.page.current_page + 5
      } else {
        this.end_number = this.$props.page.total_page_number
      }
      return this.end_number
    },
    calc_array_length: function (start, end){
      this.array_length = end - start
    }
  }
  ,
  beforeUpdate() {
    this.calc_array_length(this.calc_start_page(), this.calc_end_page())
  }
  ,
  data() {
    return {
      start_number: null,
      end_number: null,
      array_length: null
    }
  }
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