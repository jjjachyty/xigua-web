<template>
  <v-app id="app">
    <v-container fill-height class="flex justify-center">
      <v-card class="pa-5" min-width="350" max-width="400" color="rgba(10, 10, 10, 0.3)">
        <v-row justify="center">
          <v-img src="@/assets/logo.png" max-width="20%"></v-img>
        </v-row>
        <v-row justify="center">
          <v-col xs="12" sm="12" class="white--text">
            <strong class="title white--text">西瓜素材网</strong>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col xs="12" sm="12">
            <v-text-field
              solo
              label="账号"
              prepend-inner-icon="fas fa-user"
              v-model="username"
              type="number"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col xs="12" sm="12">
            <v-text-field
              solo
              label="密码"
              prepend-inner-icon="fas fa-lock"
              type="password"
              v-model="password"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col xs="12" sm="6">
            <v-text-field
              solo
              label="验证码"
              prepend-inner-icon="fas fa-sms"
              type="number"
              counter="6"
              v-model="code"
            ></v-text-field>
          </v-col>
          <v-col xs="12" sm="6">
            <v-img :src="img" @click="caption"></v-img>
          </v-col>
        </v-row>
        <v-alert type="error" v-show="error">{{error}}</v-alert>

        <v-row justify="center">
          <v-col sm="12" md="12" xs="12s">
            <v-btn color="primary" class="white--text" @click="login" block>
              登录
              <v-icon right dark>fas fa-paper-plane</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col sm="12" md="12" xs="12s">
            <strong class="subheading white--text">售后QQ群</strong>

            <v-btn icon href="https://jq.qq.com/?_wv=1027&k=5sIzMmU" elevation="0">
              <v-icon color="white">fab fa-qq</v-icon>
            </v-btn>
            <strong class="subheading white--text">联系淘宝客服</strong>

            <v-btn icon small href="https://m.tb.cn/h.VSyTjSY?sm=0d39c6" elevation="0">
              <v-icon color="white">fas fa-user</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-app>
</template>


<style scoped>
#app {
  height: 100%;
  width: 100%;
  background-image: url("https://picsum.photos/1920/1080?random");
}
</style>

<script>
import qs from "qs";
import api from "@/plugins/api";
export default {
  data() {
    return {
      error: null,
      username: null,
      password: "",
      id: "",
      img: "",
      code: null
    };
  },
  methods: {
    caption() {
      api.get("/com/caption", {}).then(res => {
        if (res.Status) {
          this.id = res.Data.id;
          this.img = res.Data.img;
        }
      });
    },
    login() {
      fetch(api.base_url + "/user/login", {
        method: "post",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        withCredentials: true,
        body: qs.stringify({
          Code: this.code,
          CodeID: this.id,
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
            this.caption();
            this.code = "";
          }
        });
    }
  },
  created() {
    this.caption();
  }
};
</script>