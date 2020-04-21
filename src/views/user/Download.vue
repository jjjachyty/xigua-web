<template>
  <v-row justify="center">
    <v-col sm="7">
      <v-text-field
        prepend-inner-icon="fas fa-search"
        outlined
        v-model="url"
        @keyup.enter="parseurl"
        :error-messages="errorMsg"
        placeholder="输入链接回车下载"
      ></v-text-field>
    <div v-if="urls && !showDownload">
        <v-btn 
        color="red"
        class="white--text"
        v-for="(item, index) in urls"
        :key="index"
        @click="getDownloadURL(item.Data)"
      >{{item.Name}}</v-btn>

    </div>
        <div v-if="downloadURL && showDownload">
      <v-btn 
        color="red"
        class="white--text"
        v-for="(item, index) in downloadURL.down_btns"
        :key="index"
        @click="down(downloadURL.url_suffix,item.url_prefix)"
      >{{item.Name}}</v-btn>
        </div>
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
      showDownload:false,
      downloadURL: {},
      urls:[],
      loading: false
    };
  },
  methods: {
    parseurl(){
      if (this.url == "") {
        return;
      }
      this.loading = true;
      this.showDownload = false;
      api
        .post("/parseurl", {
          params: { url: this.url },
          token: this.$store.state.token,
          router: this.$router
        })
        .then(res => {
          this.loading = false;
          if (res.Status) {
            this.urls = res.Data;
            this.errorMsg = null;
          } else {
            this.errorMsg = res.Message;
          }
        });
      },
    down(url_suffix, url_prefix) {
      window.open(url_prefix + url_suffix);
    },
    getDownloadURL(data) {
      var that = this;
      if (this.url == "") {
        return;
      }
      this.loading = true;
      api
        .post("/download", {
          params: { url: this.url ,data:data},
          token: this.$store.state.token,
          router: this.$router
        })
        .then(res => {
          this.loading = false;
          if (res.Status) {
            this.showDownload = true
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