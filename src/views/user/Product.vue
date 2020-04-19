<template>
  <v-container>
    <div v-for="(product) in userProduct" :key="product.ProductID">
      <v-card>
        <v-card-title>
          {{product.ProductName}}
          <v-spacer></v-spacer>
          {{product.UseCount}}/{{product.ProductCount}}次
        </v-card-title>
        <v-card-text>
          <v-chip
            v-for="(site, index) in sites"
            :key="index"
            class="ma-2"
            color="primary"
            @click="open(site.Url)"
          >{{site.Name}}</v-chip>
        </v-card-text>
        <v-card-text>有效日期 {{product.StartAt}}-{{product.EndAt}}</v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import api from "@/plugins/api";
import moment from "moment";
export default {
  data() {
    return {
      userProduct: [],
      sites: []
    };
  },
  methods: {
    open(url) {
      console.log("url", url);
      window.open(url);
    },
    async getProduct() {
      console.log("this.$store.state.token=", this.$store.state.token);
      var res = await api.get("/user/product", {
        token: this.$store.state.token,
        router: this.$router
      });
      if (res.Status) {
        this.userProduct = res.Data;
        if (this.userProduct.length > 0) {
          console.log("for===", this.userProduct.length);

          for (var i = 0; i < this.userProduct.length; i++) {
            this.userProduct[i].StartAt = moment(
              this.userProduct[i].StartAt
            ).format("YYYY/MM/DD");
            this.userProduct[i].EndAt = moment(
              this.userProduct[i].EndAt
            ).format("YYYY/MM/DD");
            var res = await api.get("/site/get", {
              params: { ProductID: this.userProduct[i].ProductID },
              token: this.$store.state.token,
              router: this.$router
            });

            if (res.Status) {
              this.sites = res.Data;
            }
          }
        }
      }
    }
  },
  created() {
    this.getProduct();
  }
};
</script>