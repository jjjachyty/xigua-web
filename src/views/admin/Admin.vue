<template>
  <v-app>
    <v-app-bar
      color="#6A76AB"
      dark
      shrink-on-scroll
      prominent
      src="https://picsum.photos/1920/1080?random"
    >
      <v-toolbar-title>欢迎{{$store.state.username}}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>fa fa-key</v-icon>修改密码
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
      <v-btn icon @click="loginout">
        <v-icon>fa fa-key</v-icon>退出
      </v-btn>
    </v-app-bar>
    <v-tabs align-with-title>
      <v-tab href="#tab-1">账号管理</v-tab>
      <v-tab-item value="tab-1">
        <Users></Users>
      </v-tab-item>
    </v-tabs>
  </v-app>
</template>

<script>
import qs from "qs";
import api from "@/plugins/api";
import Users from "./Users";
export default {
  components: { Users },
  methods: {
    loginout() {
      this.$store.dispatch("loginout");
      this.$router.replace("/");
    }
  }
};
</script>
