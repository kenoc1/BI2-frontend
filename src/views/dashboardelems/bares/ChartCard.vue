<template>
  <div class="column is-6">
    <article class="message is-dark">
      <div class="message-header">
        <p>{{ chartTitle }}</p>
      </div>
      <div class="message-body">
        <slot></slot>
<!--        <LineChart/>-->
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: "ChartCard",
  props: {
    chartTitle: String
  }
}
</script>

<style scoped>

</style>