<template>
  <div class="columns is-fullheight">
    <div class="column is-2 is-sidebar-menu is-hidden-mobile">
      <AdminNav></AdminNav>
    </div>
    <div class="column is-main-content">

      <main class="main" id="main">
        <!--        <%- include('/breadcrumb', {menuTitle: 'Dashboard', menuIcon: 'fa-tachometer'}) %>-->
        <BoxRow></BoxRow>

        <div class="columns is-multiline">
          <ChartCard chart-title="Chart1">
            <LineChart/>
          </ChartCard>
          <ChartCard chart-title="Orders">
            <BarChartOne/>
          </ChartCard>
          <ChartCard chart-title="Chart3">
            <BarChartTwo/>
          </ChartCard>
          <ChartCard chart-title="Chart4">
            <BarChartThree/>
          </ChartCard>
        </div>

        <!--        <% include /horizontalAds %>-->
        <!--        <% include /copyright %>-->
      </main>

    </div>
  </div>
</template>

<script>
import ApexCharts from 'apexcharts'
import VueApexCharts from "vue3-apexcharts";
import AdminNav from "@/components/AdminNav";
import AdminBox from "@/views/dashboardelems/bares/AdminBox";
import BoxRow from "@/views/dashboardelems/BoxRow";
import LineChart from "@/views/dashboardelems/LineChart";
import BarChartOne from "@/views/dashboardelems/BarChartOne";
import BarChartTwo from "@/views/dashboardelems/BarChartTwo";
import BarChartThree from "@/views/dashboardelems/BarChartThree";
import ChartCard from "@/views/dashboardelems/bares/ChartCard";
// import fetchApiMixin from "@/mixins/fetchApiMixin";

export default {
  name: 'AdminPanel',
  // mixins: [fetchApiMixin],
  components: {
    ChartCard,
    BarChartThree,
    BarChartTwo,
    BarChartOne,
    LineChart,
    AdminNav,
    ApexCharts,
    apexchart: VueApexCharts,
    AdminBox,
    BoxRow
  },
  data: function () {
    return {}
  },
  async mounted() {

  }

}
</script>
