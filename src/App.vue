<template>
  <v-app>
    <router-view />
    <v-divider></v-divider>
    <v-footer padless>
      <v-card class="flex" flat tile right>
        <v-card-title>
          <v-spacer></v-spacer>
          <strong class="subheading">售后QQ群</strong>

          <v-btn icon href="https://jq.qq.com/?_wv=1027&k=5sIzMmU" elevation="0">
            <v-icon color="primary">fab fa-qq</v-icon>
          </v-btn>
          <strong class="subheading">联系淘宝客服</strong>

          <v-btn icon small href="https://m.tb.cn/h.VSyTjSY?sm=0d39c6" elevation="0">
            <v-icon color="primary">fas fa-user</v-icon>
          </v-btn>
        </v-card-title>
      </v-card>
    </v-footer>
  </v-app>
</template>

<style>
html,
body,
#app {
  height: 100%;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
