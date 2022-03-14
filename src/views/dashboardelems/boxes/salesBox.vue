<template>
  <AdminBox title="Sales today"
            :title_value=titleOne
            :items=items1
            class="is-primary">
  </AdminBox>
</template>

<script>
import AdminBox from "@/views/dashboardelems/bares/AdminBox";
import axios from "axios";

export default {
  name: "salesBox",
  components: {
    AdminBox
  },
  data: function () {
    return {
      titleOne: "",
      items1: {
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
          .get("/api/v1/order-count-day/")
          .then(response => {
            this.titleOne = response.data['orders']
          })
          .catch(error => {
            console.log(error)
          })
      axios
          .get("/api/v1/order-count-week/")
          .then(response => {
            this.items1.first.value = response.data['orders']
          })
          .catch(error => {
            console.log(error)
          })
      axios
          .get("/api/v1/order-count-month/")
          .then(response => {
            this.items1.second.value = response.data['orders']
          })
          .catch(error => {
            console.log(error)
          })
      axios
          .get("/api/v1/order-count/")
          .then(response => {
            this.items1.third.value = response.data['orders']
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

