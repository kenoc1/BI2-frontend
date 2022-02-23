<template>
  <div class="columns is-fullheight">
    <div class="column is-2 is-sidebar-menu is-hidden-mobile">
      <aside class="menu">
        <p class="menu-label">
          General
        </p>
        <ul class="menu-list">
          <li><a>Dashboard</a></li>
          <li><a>Customers</a></li>
        </ul>
        <p class="menu-label">
          Administration
        </p>
        <ul class="menu-list">
          <li><a>Team Settings</a></li>
          <li>
            <a class="is-active">Manage Your Team</a>
            <ul>
              <li><a>Members</a></li>
              <li><a>Plugins</a></li>
              <li><a>Add a member</a></li>
            </ul>
          </li>
          <li><a>Invitations</a></li>
          <li><a>Cloud Storage Environment Settings</a></li>
          <li><a>Authentication</a></li>
        </ul>
        <p class="menu-label">
          Transactions
        </p>
        <ul class="menu-list">
          <li><a>Payments</a></li>
          <li><a>Transfers</a></li>
          <li><a>Balance</a></li>
        </ul>
      </aside>
    </div>
    <div class="column is-main-content">

      <main class="main" id="main">
        <!--        <%- include('/breadcrumb', {menuTitle: 'Dashboard', menuIcon: 'fa-tachometer'}) %>-->

        <div class="columns is-multiline">
          <div class="column">
            <div class="box notification is-primary">
              <div class="heading">Top Seller Total</div>
              <div class="title">56,950</div>
              <div class="level">
                <div class="level-item">
                  <div class="">
                    <div class="heading">Sales $</div>
                    <div class="title is-5">250K</div>
                  </div>
                </div>
                <div class="level-item">
                  <div class="">
                    <div class="heading">Overall $</div>
                    <div class="title is-5">750K</div>
                  </div>
                </div>
                <div class="level-item">
                  <div class="">
                    <div class="heading">Sales %</div>
                    <div class="title is-5">25%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="box notification is-warning">
              <div class="heading">Revenue / Expenses</div>
              <div class="title">55% / 45%</div>
              <div class="level">
                <div class="level-item">
                  <div class="">
                    <div class="heading">Rev Prod $</div>
                    <div class="title is-5">30%</div>
                  </div>
                </div>
                <div class="level-item">
                  <div class="">
                    <div class="heading">Rev Serv $</div>
                    <div class="title is-5">25%</div>
                  </div>
                </div>
                <div class="level-item">
                  <div class="">
                    <div class="heading">Exp %</div>
                    <div class="title is-5">45%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="box notification is-info">
              <div class="heading">Feedback Activity</div>
              <div class="title">78% &uarr;</div>
              <div class="level">
                <div class="level-item">
                  <div class="">
                    <div class="heading">Pos</div>
                    <div class="title is-5">1560</div>
                  </div>
                </div>
                <div class="level-item">
                  <div class="">
                    <div class="heading">Neg</div>
                    <div class="title is-5">368</div>
                  </div>
                </div>
                <div class="level-item">
                  <div class="">
                    <div class="heading">Pos/Neg %</div>
                    <div class="title is-5">77% / 23%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="box notification is-danger">
              <div class="heading">Orders / Returns</div>
              <div class="title">75% / 25%</div>
              <div class="level">
                <div class="level-item">
                  <div class="">
                    <div class="heading">Orders $</div>
                    <div class="title is-5">425K</div>
                  </div>
                </div>
                <div class="level-item">
                  <div class="">
                    <div class="heading">Returns $</div>
                    <div class="title is-5">106K</div>
                  </div>
                </div>
                <div class="level-item">
                  <div class="">
                    <div class="heading">Success %</div>
                    <div class="title is-5">+ 28,5%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="columns is-multiline">
          <div class="column is-6">
            <article class="message is-dark">
              <div class="message-header">
                <p>Chart</p>
              </div>
              <div class="message-body">
                <!--                <div id="chartLine" style="width: 100%"></div>-->
                <apexchart
                    width="500"
                    type="area"
                    :options="optionsChartLine"
                    :series="lineSeries"
                ></apexchart>
              </div>
            </article>
          </div>
          <div class="column is-6">
            <article class="message is-dark">
              <div class="message-header">
                <p>Chart</p>
              </div>
              <div class="message-body">
                <div id="chartScatter" style="width: 100%"></div>
                <apexchart
                    width="500"
                    type="bar"
                    :options="chartOptions"
                    :series="series"
                ></apexchart>
              </div>
            </article>
          </div>
          <div class="column is-6">
            <article class="message is-dark">
              <div class="message-header">
                <p>Chart</p>
              </div>
              <div class="message-body">
                <div id="chartDoughnut" style="width: 100%"></div>
                <apexchart
                    width="500"
                    type="bar"
                    :options="chartOptions"
                    :series="series"
                ></apexchart>
              </div>
            </article>
          </div>
          <div class="column is-6">
            <article class="message is-dark">
              <div class="message-header">
                <p>Chart</p>
              </div>
              <div class="message-body">
                <!--                <div id="chartBar" style="width: 100%"></div>-->
                <apexchart
                    width="500"
                    type="bar"
                    :options="optionsChartBar"
                    :series="barSeries"
                ></apexchart>
              </div>
            </article>
          </div>
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

export default {
  name: 'AdminPanel',
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
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 35, 50, 49, 60, 70, 91],
        },
      ],

      //- BAR CHART -
//-------------
      optionsChartBar: {
        chart: {
          height: 350,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: 'top', // top, center, bottom
            },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val + '%';
          },
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ['#f8f8f2'],
          },
        },
        xaxis: {
          categories: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
          position: 'top',
          labels: {
            offsetY: -18,
            style: {
              colors: '#f8f8f2',
            },
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              },
            },
          },
          tooltip: {
            enabled: true,
            offsetY: -35,
          },
        },
        fill: {
          gradient: {
            shade: 'light',
            type: 'horizontal',
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [50, 0, 100, 100],
          },
        },
        yaxis: {
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            formatter: function (val) {
              return val + '%';
            },
          },
        },
        title: {
          text: 'Monthly Inflation in Argentina, 2002',
          floating: true,
          offsetY: 320,
          align: 'center',
          style: {
            color: '#f8f8f2',
          },
        },
      },
      barSeries: [
        {
          name: 'Inflation',
          data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2],
        },
      ],


//-------------
//- LINE CHART -
//-------------
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
      ],

    }
  },
  methods: {}
}
</script>
