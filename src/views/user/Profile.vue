<template>
  <v-content>
    <v-app-bar color="#6A76AB" dark src="https://picsum.photos/1920/1080?random" fade-img-on-scroll>
      <v-toolbar-title>欢迎 {{$store.state.user.UserName}}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
      <v-btn icon @click="loginout">
        <v-icon>fa fa-sign-out-alt</v-icon>退出
      </v-btn>
    </v-app-bar>
    <Download></Download>
    <v-tabs centered v-show="!modifypasswd" primary>
      <v-tab href="#tab-1">我的套餐</v-tab>
      <v-tab href="#tab-2">使用记录</v-tab>
      <v-tab href="#tab-3">修改密码</v-tab>
      <v-tab-item value="tab-1">
        <Product></Product>
      </v-tab-item>
      <v-tab-item value="tab-2">
        <UseLog></UseLog>
      </v-tab-item>
      <v-tab-item value="tab-3">
        <ModifyPasswd></ModifyPasswd>
      </v-tab-item>
    </v-tabs>
    <v-divider></v-divider>
  </v-content>
</template>

<script>
import qs from "qs";
import api from "@/plugins/api";
import Product from "./Product";
import UseLog from "./UseLog";
import Download from "./Download";
import ModifyPasswd from "./ModifyPasswd";

export default {
  data() {
    return {
      user: {},
      tab: 0,
      username: "",
      password: "",
      modifypasswd: false
    };
  },
  components: { Product, UseLog, Download, ModifyPasswd },
  methods: {
    loginout() {
      this.$store.dispatch("loginout");
      this.$router.replace("/");
    }
  },
  created() {}
};
</script>