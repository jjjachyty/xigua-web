<template>
  <router-view />
</template>
<script>
export default {
  created() {
    var token = window.localStorage.getItem("token");
    this.$store.commit("LOGIN_IN", token);
  }
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
