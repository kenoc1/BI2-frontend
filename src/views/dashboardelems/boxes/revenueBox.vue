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
    abbrNum(number, decPlaces) {
      // 2 decimal places => 100, 3 => 1000, etc
      decPlaces = Math.pow(10, decPlaces);

      // Enumerate number abbreviations
      var abbrev = ["T", "M", "B", "Trill"];

      // Go through the array backwards, so we do the largest first
      for (var i = abbrev.length - 1; i >= 0; i--) {

        // Convert array index to "1000", "1000000", etc
        var size = Math.pow(10, (i + 1) * 3);

        // If the number is bigger or equal do the abbreviation
        if (size <= number) {
          // Here, we multiply by decPlaces, round, and then divide by decPlaces.
          // This gives us nice rounding to a particular decimal place.
          number = Math.round(number * decPlaces / size) / decPlaces;

          // Handle special case where we round up to the next abbreviation
          if ((number == 1000) && (i < abbrev.length - 1)) {
            number = 1;
            i++;
          }

          // Add the letter for the abbreviation
          number += abbrev[i];

          // We are done... stop
          break;
        }
      }

      return number;
    },
    async getData() {
      axios
          .get("/api/v1/order-revenue-day/")
          .then(response => {
            this.titleTwo = this.abbrNum(response.data['order-revenue'],2) + "€"
          })
          .catch(error => {
            console.log(error)
          })

      axios
          .get("/api/v1/order-revenue-week/")
          .then(response => {
            this.items2.first.value = this.abbrNum(Math.round(response.data['order-revenue']), 1) + "€"
          })
          .catch(error => {
            console.log(error)
          })
      axios
          .get("/api/v1/order-revenue-month/")
          .then(response => {
            this.items2.second.value = this.abbrNum(Math.round(response.data['order-revenue']), 1) + "€"
          })
          .catch(error => {
            console.log(error)
          })
      axios
          .get("/api/v1/order-revenue/")
          .then(response => {
            this.items2.third.value = this.abbrNum(Math.round(response.data['order-revenue']), 1) + "€"
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

