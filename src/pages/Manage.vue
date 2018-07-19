<template>
  <ElContainer style="height: 100%" direction="horizontal">
    <ElAside width="220px">
      <ElMenu @select="handleSelect"
              default-active="countriesList"
              style="height: 100%;"
              background-color="#304056"
              text-color="#BFCBD9"
              active-text-color="#20a0ff">
        <ElMenuItem index="countriesList">国家</ElMenuItem>
        <ElMenuItem index="countriesReportList">国家RJ关系</ElMenuItem>
        <ElMenuItem index="countriesPartList">国家PJ关系</ElMenuItem>
        <ElMenuItem index="elementCategories">元素类型</ElMenuItem>
        <ElMenuItem index="elementsList">元素</ElMenuItem>
        <ElMenuItem index="invitesList">邀请码</ElMenuItem>
        <ElMenuItem index="usersList">用户</ElMenuItem>
        <ElMenuItem index="reportTemplateList">报告模版类型</ElMenuItem>
        <ElMenuItem index="reportTemplateDetailList">报告模版内容</ElMenuItem>
        <!--@{code-generator-anchor__manage-menu-item}-->
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
  methods: {
    handleSelect(routerPath) {
      // 手动切换路由。不使用Element Menu 的 router导航，router导航功能存在BUG
      this.$router.push({ name: routerPath });
    },
  },
};
</script>
