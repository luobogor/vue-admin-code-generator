<template>
  <div class="header-container">
    <ElBreadcrumb separator="/">
      <ElBreadcrumbItem v-for="(item, index) in $route.meta" :key="index">
        {{item}}
      </ElBreadcrumbItem>
    </ElBreadcrumb>
    <div>
      <ElButton
        @click="loginOut"
        class="login-out_btn"
        size="medium">
        退出
      </ElButton>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',

  methods: {
    loginOut() {
      this.$router.push('/');
    },
  },
};
</script>

<style lang="less">
  .header-container {
    background-color: #EFF2F7;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
  }

  .login-out_btn {
    margin-right: 10px;
    height: 100%;
    background-color: transparent;
    border-style: none;
  }
</style>
