<template>
  <table class="table">
    <thead>
    <tr>
      <th>Rule-ID</th>
      <th>Base-SKU</th>
      <th>Base-Name</th>
      <th>Add-SKU</th>
      <th>Add-Name</th>
      <th>Confidence</th>
      <th>Support</th>
      <th>Lift</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="rule in rules" :key="rule.ruleid">
      <td> {{ ruleid }}</td>
      <td> {{ itembaseproductsku }}</td>
      <td> {{ itembaseproductname }}</td>
      <td> {{ itemaddproductsku }}</td>
      <td> {{ itemaddproductname }}</td>
      <td> {{ confidence }}</td>
      <td> {{ lift }}</td>
      <td> {{ support }}</td>
    </tr>
    </tbody>
    <tfoot>
    <tr>
      <th>Rule-ID</th>
      <th>Base-SKU</th>
      <th>Base-Name</th>
      <th>Add-SKU</th>
      <th>Add-Name</th>
      <th>Confidence</th>
      <th>Support</th>
      <th>Lift</th>
    </tr>
    </tfoot>
  </table>
</template>

<script>
import axios from "axios";

export default {
  name: "RuleTable",
  data: function () {
    return {
      rules: []
    }
  },
  methods: {
    async getData() {
      axios
          .get("/api/v1/association-order/")
          .then(response => {
            this.rules = response.data['asso-order']
            console.log(response.data['asso-order'])
          })
          .catch(error => {
            console.log(error)
          })
    },
  },
  async mounted() {
    await this.getData()
  }
}

</script>

<style scoped>

</style>