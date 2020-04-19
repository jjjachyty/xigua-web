<template>
  <v-row justify="center">
    <v-col sm="4">
      <v-card>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  label="原密码*"
                  required
                  type="password"
                  v-model="orgPassword"
                  counter="12"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  label="新密码*"
                  required
                  type="password"
                  v-model="newPassword"
                  counter="12"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  label="确认新密码*"
                  required
                  type="password"
                  v-model="cfmPassword"
                  counter="12"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-alert type="error" v-show="errorMsg">{{errorMsg}}</v-alert>
          <v-alert type="success" v-show="status">修改成功</v-alert>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="modify">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import api from "@/plugins/api";

export default {
  data: () => ({
    orgPassword: "",
    newPassword: "",
    cfmPassword: "",
    errorMsg: null,
    status: false
  }),
  methods: {
    modify() {
      if (this.orgPassword == "" || this.newPassword == "") {
        this.errorMsg = "原密码和新密码不能为空";
        return;
      }
      if (this.orgPassword == this.newPassword) {
        this.errorMsg = "新密码与原密码一致";
        return;
      }
      if (this.newPassword != this.cfmPassword) {
        this.errorMsg = "两次密码不一致";
        return;
      }
      if (
        this.orgPassword.length > 12 ||
        this.orgPassword.length < 6 ||
        this.newPassword.length > 12 ||
        this.newPassword.length < 6
      ) {
        this.errorMsg = "密码为6-12位数";
        return;
      }
      this.errorMsg = null;
      api
        .post("/user/modifypassword", {
          params: {
            orgPassword: this.orgPassword,
            newPassword: this.newPassword
          },
          token: this.$store.state.token,
          router: this.$router
        })
        .then(res => {
          if (res.Status) {
            this.status = true;
            this.orgPassword = "";
            this.newPassword = "";
            this.cfmPassword = "";
          } else {
            this.errorMsg = res.Message;
          }
        });
    }
  }
};
</script>