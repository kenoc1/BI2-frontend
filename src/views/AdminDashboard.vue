<template>
  <div class="columns is-fullheight">
    <div class="column is-2 is-sidebar-menu is-hidden-mobile">
      <AdminNav highlight="first"></AdminNav>
    </div>
    <div class="column is-main-content">

      <main class="main" id="main">
        <!--        <%- include('/breadcrumb', {menuTitle: 'Dashboard', menuIcon: 'fa-tachometer'}) %>-->
        <BoxRow></BoxRow>

        <div class="columns is-multiline">
          <ChartCard chart-title="Revenue - 7 Days">
            <BarChartTwo/>
          </ChartCard>
          <ChartCard chart-title="Orders - 7 Days">
            <BarChartOne/>
          </ChartCard>
          <ChartCard chart-title="Revenue - 100 Days">
            <LineChartOne/>
          </ChartCard>
          <ChartCard chart-title="Orders - 100 Days">
            <LineChartTwo/>
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
import LineChartOne from "@/views/dashboardelems/LineChartOne";
import LineChartTwo from "@/views/dashboardelems/LineChartTwo";
import BarChartOne from "@/views/dashboardelems/BarChartOne";
import BarChartTwo from "@/views/dashboardelems/BarChartTwo";
import ChartCard from "@/views/dashboardelems/bares/ChartCard";
// import fetchApiMixin from "@/mixins/fetchApiMixin";

export default {
  name: 'AdminPanel',
  // mixins: [fetchApiMixin],
  components: {
    ChartCard,
    BarChartTwo,
    BarChartOne,
    LineChartOne,
    AdminNav,
    ApexCharts,
    apexchart: VueApexCharts,
    AdminBox,
    BoxRow,
    LineChartTwo
  },
  data: function () {
    return {}
  },
  async mounted() {

  }

}
</script>
