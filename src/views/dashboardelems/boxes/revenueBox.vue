<template>
  <AdminBox title="Revenue today"
            :title_value=titleTwo
            :items=items2
            class="is-warning">
  </AdminBox>
</template>

<script>
import AdminBox from "@/views/dashboardelems/bares/AdminBox";
import axios from "axios";

export default {
  name: "revenueBox",
  components: {
    AdminBox
  },
  data: function () {
    return {
      titleTwo: "",
      items2: {
        first: {
          title: "Week",
          value: "???"
        },
        second: {
          title: "Month",
          value: "???"
        },
        third: {
          title: "Total",
          value: "???"
        }
      }
    }
  },
  methods: {
    async getData() {
      axios
          .get("/api/v1/order-revenue-day/")
          .then(response => {
            this.titleTwo = response.data['order-revenue'] + "€"
          })
          .catch(error => {
            console.log(error)
          })

      axios
          .get("/api/v1/order-revenue-week/")
          .then(response => {
            this.items2.first.value = Math.round(response.data['order-revenue']) + "€"
          })
          .catch(error => {
            console.log(error)
          })
      axios
          .get("/api/v1/order-revenue-month/")
          .then(response => {
            this.items2.second.value = Math.round(response.data['order-revenue']) + "€"
          })
          .catch(error => {
            console.log(error)
          })
      axios
          .get("/api/v1/order-revenue/")
          .then(response => {
            this.items2.third.value = Math.round(response.data['order-revenue']) + "€"
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

