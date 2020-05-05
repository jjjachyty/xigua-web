<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :page.sync="page"
      hide-default-footer
      sort-by="CreateAt"
      class="elevation-1"
      @page-count="next"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">生成账户</v-btn>
            </template>
            <CreateUser></CreateUser>
          </v-dialog>
        </v-toolbar>
        <v-toolbar flat color="white">
          <v-text-field v-model="search" label="按照账号/昵称/订单号搜索" single-line hide-details></v-text-field>
          <v-btn icon @click="serachSubmit">
            <v-icon>fas fa-search</v-icon>
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          title="注销账户"
          color="red"
          small
          class="mr-2"
          @click="deleteItem(item)"
        >fas fa-user-slash</v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">刷新</v-btn>
      </template>
    </v-data-table>
    <v-pagination v-model="page" :length="pageCount" @next="next" @previous="next"></v-pagination>
  </div>
</template>

<script>
import qs from "qs";
import api from "@/plugins/api";
import CreateUser from "./CreateUser";
export default {
  components: { CreateUser },
  data: () => ({
    dialog: false,
    search: "",
    page: 1,
    count: 0,
    pageCount: 15,
    headers: [
      {
        text: "账号",
        align: "start",
        sortable: false,
        value: "ID"
      },
      { text: "昵称", value: "UserName" },
      { text: "淘宝订单号", value: "Tid" },
      { text: "角色", value: "Role" },
      { text: "创建人", value: "CreateBy" },
      { text: "创建时间", value: "CreateAt" },
      { text: "状态", value: "Status" },
      { text: "产品", value: "UserProduct" },
      { text: "总下载量", value: "TotalUseCount" },
      { text: "日下载量", value: "DailyUseCount" },
      { text: "操作", value: "actions", sortable: false }
    ],
    desserts: []
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      var res = await api.get("/user/page", {
        params: { Limit: 15 },
        token: this.$store.state.token,
        router: this.$router
      });

      if (res.Status) {
        this.count = res.Data.Page.TotalRows;
        this.pageCount = this.count / 15;
        this.desserts = res.Data.Rows;
      }
    },

    activeItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("确定激活这个账户?") && this.desserts.splice(index, 1);
    },

    async deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("确定注销这个账户?") &&
        (await api
          .post("/user/close", {
            params: {
              ID: item.ID
            },
            token: this.$store.state.token,
            router: this.$router
          })
          .then(res => {
            if (!res.Status) {
              alert(res.Message);
            } else {
              alert("注销成功");
              this.desserts[index].Status = 0;
            }
          }));
    },

    async serachSubmit() {
      var res = await api.get("/user/page", {
        params: { Search: this.search, Limit: 15 },
        token: this.$store.state.token,
        router: this.$router
      });

      if (res.Status) {
        this.desserts = res.Data.Rows;
      }
    },
    async next() {
      var res = await api.get("/user/page", {
        params: {
          Search: this.search,
          Limit: 15,
          Offset: (this.page - 1) * 15
        },
        token: this.$store.state.token,
        router: this.$router
      });
      if (res.Status) {
        this.desserts = res.Data.Rows;
      }
    }
  },
  watch: {}
};
</script>