<template>
  <v-app>
    <v-parallax height="1000" src="@/assets/login.jpeg">
      <v-container fill-height class="flex justify-center">
        <v-card width="400" class="pa-5" color="rgba(10, 10, 10, 0.3)">
          <v-row justify="center">
            <v-col sm="2">
              <v-img src="@/assets/logo.png" width="300"></v-img>
            </v-col>
          </v-row>
          <v-row class="white--text">
            <v-col>西瓜素材网</v-col>
          </v-row>
          <v-row justify="center">
            <v-col sm="12">
              <v-text-field solo label="账号" prepend-inner-icon="fas fa-user" v-model="username" type="number"></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col sm="12">
              <v-text-field
                solo
                label="密码"
                prepend-inner-icon="fas fa-lock"
                type="password"
                v-model="password"
              ></v-text-field>
              <v-alert type="error" v-show="error">{{error}}</v-alert>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col sm="12">
              <v-btn color="primary" class="ma-1 white--text" @click="login">
                登录
                <v-icon right dark>fas fa-paper-plane</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </v-parallax>
  </v-app>
</template>

<script>
import qs from "qs";
import api from "@/plugins/api";
export default {
  data() {
    return {
      error: null,
      username: null,
      password: ""
    };
  },
  methods: {
    login() {
      fetch(api.base_url + "/user/login", {
        method: "post",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
        body: JSON.stringify({
          ID: Number(this.username),
          Password: this.password
        })
      })
        .then(res => {
          console.log(res.headers);
          return res.json();
        })
        .then(res => {
          if (res.Status) {
            this.$store.commit("LOGIN_IN", res.Data.Token);
            console.log(this.$store);
            var user = api.getUser(res.Data.Token);
            if (user.Role == 1) {
              this.$router.push({ path: "/admin" });
            } else {
              this.$router.push({ path: "/profile" });
            }
          } else {
            this.error = res.Message;
          }
        });
    }
  }
};
</script>