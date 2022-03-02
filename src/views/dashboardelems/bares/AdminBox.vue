<template>
  <div class="column">
    <div class="box notification "
         :class="$attrs.class">
      <div class="heading">{{ title }}</div>
      <div class="title">{{ title_value }}</div>
      <div class="level">
        <div class="level-item"
             v-for="item in items"
             v-bind:key="item.title">
          <div class="">
            <div class="heading">{{ item.title }}</div>
            <div class="title is-5">{{ item.value }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminBox",
  props: {
    title: String,
    title_value: String,
    items: Object,
  },
  data: function () {
    return {
    }
  }
}
</script>

<style scoped>

</style>