<template>
  <apexchart
      width="500"
      type="area"
      :options="optionsChartLine"
      :series="lineSeries"
  ></apexchart>
</template>

<script>
import ApexCharts from 'apexcharts'
import VueApexCharts from "vue3-apexcharts";
import axios from "axios";

export default {
  name: "LineChart",
  components: {
    ApexCharts,
    apexchart: VueApexCharts,
  },
  data: function () {
    return {
      optionsChartLine: {},
      lineSeries: []
    }
  },
  methods: {
    async getData() {
      axios
          .get("/api/v1/history-revenue-100/")
          .then(response => {
            this.optionsChartLine = {
              chart: {
                height: 350,
                type: 'area',
              },
              dataLabels: {
                enabled: false,
              },
              stroke: {
                curve: 'smooth',
              },
              legend: {
                labels: {
                  colors: '#f8f8f2',
                },
              },
              xaxis: {
                type: 'datetime',
                categories: response.data['revenue'][0],
                labels: {
                  style: {
                    colors: '#f8f8f2',
                  },
                },
              },
              yaxis: {
                show: true,
                labels: {
                  show: true,
                  style: {
                    colors: ['#f8f8f2'],
                  },
                },
                crosshairs: {
                  show: true,
                  position: 'back',
                  stroke: {
                    color: '#FFF',
                    width: 1,
                    dashArray: 0,
                  },
                },
              },
              tooltip: {
                x: {
                  format: 'dd/MM/yy HH:mm',
                },
              },
            }
            this.lineSeries = [
              {
                name: 'Revenue',
                data: response.data['revenue'][1],
              }
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