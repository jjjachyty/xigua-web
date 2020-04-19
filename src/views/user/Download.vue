<template>
  <v-row justify="center">
    <v-col sm="7">
      <v-text-field
        prepend-inner-icon="fas fa-search"
        outlined
        v-model="url"
        @keyup.enter="submit"
        :error-messages="errorMsg"
        placeholder="输入链接回车下载"
      ></v-text-field>
      <v-btn
        color="red"
        class="white--text"
        v-for="(item, index) in downloadURL.down_btns"
        :key="index"
        @click="down(downloadURL.url_suffix,item.url_prefix)"
      >{{item.Name}}</v-btn>
    </v-col>

    <v-dialog v-model="loading" persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          请稍等....
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>


<script>
import api from "@/plugins/api";
export default {
  data() {
    return {
      errorMsg: null,
      url: "",
      downloadURL: {},
      loading: false
    };
  },
  methods: {
    down(url_suffix, url_prefix) {
      window.open(url_prefix + url_suffix);
    },
    submit() {
      var that = this;
      if (this.url == "") {
        return;
      }
      this.loading = true;
      api
        .post("/download", {
          params: { url: this.url },
          token: this.$store.state.token,
          router: this.$router
        })
        .then(res => {
          that.loading = false;
          if (res.Status) {
            this.downloadURL = res.Data;
            this.errorMsg = null;
          } else {
            this.errorMsg = res.Message;
          }
        });
    }
  }
};
</script>