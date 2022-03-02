<template>
  <div class="columns is-multiline">
    <sales-box></sales-box>
    <revenue-box></revenue-box>
    <AdminBox title="Feedback Activity"
              title_value="78% &uarr;"
              :items=items3
              class="is-info">
    </AdminBox>
    <AdminBox title="Orders / Returns"
              title_value="75% / 25%"
              :items=items4
              class="is-danger">
    </AdminBox>
  </div>
</template>

<script>
import AdminBox from "@/views/dashboardelems/bares/AdminBox";
import fetchApiMixin from "@/mixins/fetchApiMixin";
import salesBox from "@/views/dashboardelems/boxes/salesBox";
import revenueBox from "@/views/dashboardelems/boxes/revenueBox";

export default {
  name: "BoxRow",
  components: {
    revenueBox,
    salesBox,
    AdminBox
  },
  mixins: [fetchApiMixin],
  data: function () {
    return {
      items3: {
        first: {
          title: "Pos",
          value: "1560"
        },
        seconds: {
          title: "Neg",
          value: "368"
        },
        third: {
          title: "Pos/Neg %",
          value: "77% / 23%"
        }
      },
      items4: {
        first: {
          title: "Orders $",
          value: "425K"
        },
        seconds: {
          title: "Returns $",
          value: "106K"
        },
        third: {
          title: "Success %",
          value: "+ 28,5%"
        }
      }
    }
  },
}
</script>

<style scoped>

</style>