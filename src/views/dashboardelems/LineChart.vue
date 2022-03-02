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
export default {
  name: "LineChart",
  components: {
    ApexCharts,
    apexchart: VueApexCharts,
  },
  data: function () {
    return {
      optionsChartLine: {
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
          categories: [
            '2018-09-19T00:00:00',
            '2018-09-19T01:30:00',
            '2018-09-19T02:30:00',
            '2018-09-19T03:30:00',
            '2018-09-19T04:30:00',
            '2018-09-19T05:30:00',
            '2018-09-19T06:30:00',
          ],
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
      },
      lineSeries: [
        {
          name: 'series1',
          data: [31, 40, 28, 51, 42, 109, 100],
        },
        {
          name: 'series2',
          data: [11, 32, 45, 32, 34, 52, 41],
        },
      ]
    }
  }
}
</script>

<style scoped>

</style>