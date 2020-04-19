<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="pageData.Rows"
      :page.sync="pageData.Page.CurrentPage"
      :items-per-page="pageData.PageCount"
      hide-default-footer
      class="elevation-1"
      @page-count="pageCount = $event"
    ></v-data-table>
    <div class="text-center pt-2">
      <v-pagination v-model="currentPage" :length="pageData.Page.PageCount"></v-pagination>
    </div>
  </v-container>
</template>

<script>
import api from "@/plugins/api";
import moment from "moment";
export default {
  data() {
    return {
      pageData: {},
      currentPage: 1,
      // pageCount: 0,
      // itemsPerPage: 10,
      headers: [
        // {
        //   text: "站点",
        //   align: "start",
        //   sortable: false,
        //   value: "Site"
        // },
        { text: "IP", value: "IP" },
        { text: "URL", value: "URL" },
        { text: "扣减", value: "Sub" },
        { text: "时间", value: "CreateAt" }
      ]
    };
  },
  methods: {
    getLogs() {
      api
        .get("/downloadlog/page", {
          token: this.$store.state.token,
          router: this.$router
        })
        .then(res => {
          console.log("Res = ", res);
          if (res.Status) {
            this.pageData = res.Data;
          }
        });
    }
  },
  mounted() {
    this.getLogs();
  }
};
</script>