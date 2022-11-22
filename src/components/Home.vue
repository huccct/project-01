<template>
  <div>
    <el-button type="info" @click="logout">LogOut</el-button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {

    }
  },
  methods: {
    logout () {
      sessionStorage.clear();
      this.$router.push('/login');
    }
  },
}
</script>

<style lang="less" scoped>
</style>

