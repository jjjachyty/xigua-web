<template>
  <v-app>
    <v-app-bar
      absolute
      color="#6A76AB"
      dark
      shrink-on-scroll
      prominent
      src="https://picsum.photos/1920/1080?random"
      fade-img-on-scroll
      scroll-target="#scrolling-techniques-3"
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

      <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tab>账号生成</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-card class="overflow-hidden" height="220"></v-card>
    <v-divider></v-divider>
    <v-container>
      <v-row justify="center">
        <v-card width="500">
          <v-form>
            <v-select
              :items="productions"
              label="选择套餐"
              solo
              item-text="name"
              return-object
              v-model="selectproduction"
            ></v-select>
            <v-card-text>
              <v-row>
                <div v-for=" (item,index) in selectproduction.items" :key="index">
                  <v-btn text disabled>{{item.name}}</v-btn>
                </div>
              </v-row>
            </v-card-text>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="startdate"
                  label="开始时间"
                  prepend-icon="fas fa-calendar-day"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="startdate" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
              </v-date-picker>
            </v-menu>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="startdate"
                  label="开始时间"
                  prepend-icon="fas fa-calendar-day"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="startdate" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
              </v-date-picker>
            </v-menu>
            <v-btn large color="primary">生成账号</v-btn>
          </v-form>
        </v-card>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import qs from "qs";
import api from "@/plugins/api";
export default {
  data() {
    return {
      selectproduction: { items: {} },
      startdate: new Date().toISOString().substr(0, 10),
      enddate: new Date().toISOString().substr(0, 10),
      menu: false,
      productions: [
        {
          id: 1,
          count: 120,
          name: "产品1",
          items: [
            {
              name: "千图",
              url: "58pic.com"
            },
            {
              name: "千图1",
              url: "58pic.com"
            }
          ]
        }
      ]
    };
  },
  methods: {
    loginout() {
      this.$store.dispatch("loginout");
      this.$router.replace("/");
    }
  }
};
</script>