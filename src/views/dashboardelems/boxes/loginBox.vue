<template>
  <AdminBox title="Logins today"
            :title_value=titleThree
            :items=items3
            class="is-info">
  </AdminBox>
</template>

<script>
import AdminBox from "@/views/dashboardelems/bares/AdminBox";
import axios from "axios";

export default {
  name: "loginBox",
  components: {
    AdminBox
  },
  data: function () {
    return {
      titleThree: "",
      items3: {
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
          .get("/api/v1/login-count-day/")
          .then(response => {
            this.titleThree = response.data['logins']
          })
          .catch(error => {
            console.log(error)
          })

      axios
          .get("/api/v1/login-count-week/")
          .then(response => {
            this.items3.first.value = Math.round(response.data['logins'])
          })
          .catch(error => {
            console.log(error)
          })
      axios
          .get("/api/v1/login-count-month/")
          .then(response => {
            this.items3.second.value = Math.round(response.data['logins'])
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

