<template>
  <ElContainer style="height: 100%" direction="horizontal">
    <ElAside width="220px">
      <ElMenu @select="handleSelect"
              :default-active="defaultActive"
              style="height: 100%;"
              background-color="#304056"
              text-color="#BFCBD9"
              active-text-color="#20a0ff">
        <ElMenuItem v-for="route in $router.options.routes[1].children"
                    :index="route.name"
                    :key="route.name">
          {{ route.meta[0] }}
        </ElMenuItem>
      </ElMenu>
    </ElAside>

    <ElContainer direction="vertical">
      <ElHeader style="padding: 0">
        <AppHeader/>
      </ElHeader>

      <ElMain>
        <router-view></router-view>
      </ElMain>
    </ElContainer>
  </ElContainer>
</template>

<script>
export default {
  computed: {
    defaultActive() {
      return this.$route.path.replace('/', '');
    },
  },
  methods: {
    handleSelect(routerPath) {
      // 手动切换路由。不使用Element Menu 的 router导航，router导航功能存在BUG
      this.$router.push({ name: routerPath });
    },
  },
};
</script>
