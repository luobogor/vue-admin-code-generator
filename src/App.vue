<template>
  <div id="app" class="fillcontain">
    <router-view :key="$route.fullpath"></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
  @import 'assets/style/index';
</style>
