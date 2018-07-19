<template>
  <AppForm v-model="formData"
           :id="$route.params.id"
           :http-get="@{templateName}Api.one"
           :http-post="@{templateName}Api.save"
           back-router="@{templateName}List">
    @{formFields}
  </AppForm>
</template>

<script>
import @{templateName}Api from 'api/@{templateName}';

export default {
  name: '@{templateName}Form',

  data() {
    return {
      @{templateName}Api,
      formData: {},
    };
  },
};
</script>

