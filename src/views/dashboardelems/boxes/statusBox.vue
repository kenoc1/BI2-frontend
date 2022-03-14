<template>
  <AdminBox title="Orders completed / canceled"
            :title_value=titleFour
            :items=items4
            class="is-danger">
  </AdminBox>
</template>

<script>
import AdminBox from "@/views/dashboardelems/bares/AdminBox";
import axios from "axios";

export default {
  name: "statusBox",
  components: {
    AdminBox
  },
  data: function () {
    return {
      titleFour: "",
      items4: {
        first: {
          title: "Week",
          value: "???"
        },
        second: {
          title: "Month",
          value: "???"
        }
      }
    }
  },
  methods: {
    async getData() {
      axios
          .get("/api/v1/order-status-completed-day/")
          .then(response1 => {
            axios
                .get("/api/v1/order-status-canceled-day/")
                .then(response2 => {
                  this.titleFour = response1.data['status-completed'] +" / " + response2.data['status-canceled']
                })
                .catch(error => {
                  console.log(error)
                })
          })
          .catch(error => {
            console.log(error)
          })

      axios
          .get("/api/v1/order-status-completed-week/")
          .then(response1 => {
            axios
                .get("/api/v1/order-status-canceled-week/")
                .then(response2 => {
                  this.items4.first.value = response1.data['status-completed'] +" / " + response2.data['status-canceled']
                })
                .catch(error => {
                  console.log(error)
                })
          })
          .catch(error => {
            console.log(error)
          })
      axios
          .get("/api/v1/order-status-completed-month/")
          .then(response1 => {
            axios
                .get("/api/v1/order-status-canceled-month/")
                .then(response2 => {
                  this.items4.second.value = response1.data['status-completed'] +" / " + response2.data['status-canceled']
                })
                .catch(error => {
                  console.log(error)
                })
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

