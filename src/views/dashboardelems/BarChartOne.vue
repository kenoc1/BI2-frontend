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
  name: "BarChartOne",
  components: {
    ApexCharts,
    apexchart: VueApexCharts,
  },
  data: function () {
    return {
      chartOptions: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: [],
        },
      },
      series: [
        {
          name: "Orders",
          data: [],
        },
      ],
    }
  },
  methods: {
    async getData() {
      axios
          .get("/api/v1/history-orders/")
          .then(response => {
            this.chartOptions.xaxis.categories = response.data['orders'][0]
            this.series[0].data = response.data['orders'][1]
            console.log(response.data['orders'][0])
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