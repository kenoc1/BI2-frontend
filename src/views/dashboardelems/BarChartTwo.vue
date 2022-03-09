<template>
  <apexchart
      width="500"
      type="bar"
      :options="chartOptions"
      :series="series"
  ></apexchart>
</template>

<script>
import ApexCharts from 'apexcharts'
import VueApexCharts from "vue3-apexcharts";
import axios from "axios";

export default {
  name: "BarChartTwo",
  components: {
    ApexCharts,
    apexchart: VueApexCharts,
  },
  data: function () {
    return {
      chartOptions: {},
      series: [],
    }
  },
  methods: {
    async getData() {
      axios
          .get("/api/v1/history-revenue-7/")
          .then(response => {
            this.chartOptions = {
              chart: {
                id: "vuechart-example",
              },
              xaxis: {
                categories: response.data['revenue'][0],
              },
            }
            this.series = [
              {
                name: "Revenue",
                data: response.data['revenue'][1],
              },
            ]
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