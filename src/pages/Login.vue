<template>
  <div class="login_page fillcontain">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer">
        <div class="manage_tip">
          <p class="manage_tip__text">Vue管理运营平台</p>
        </div>
        <ElForm :model="formData"
                ref="loginForm">
          <ElFormItem prop="email"
                      :rules="[{required:true , message:'用户名不能为空'},
                           { type: 'email', message: '用户名必须为邮箱'}]">
            <ElInput v-model="formData.email"
                     placeholder="用户名"/>
          </ElFormItem>
          <ElFormItem prop="password"
                      :rules="[{required:true , message:'密码不能为空'}]">
            <ElInput v-model="formData.password"
                     type="password"
                     placeholder="密码"/>
          </ElFormItem>
          <ElFormItem>
            <ElButton type="primary" @click="submit" class="submit_btn">
              登陆
            </ElButton>
          </ElFormItem>
        </ElForm>
      </section>
    </transition>
  </div>
</template>

<script>
import GlobalEnterMixin from 'mixins/GlobalEnterMixin';

export default {
  name: 'Login',

  mixins: [GlobalEnterMixin],

  data() {
    return {
      formData: {
        email: 'admin@bbq.com',
        password: '123456',
      },
    };
  },

  methods: {
    goHome() {
      this.$router.push('manage');
    },

    async submit() {
      this.goHome();
    },
  },
};
</script>

<style lang="less" scoped>
  @import '../assets/style/mixin';

  .login_page {
    background-color: #324057;
  }

  .manage_tip {
    position: absolute;
    width: 100%;
    top: -70px;
    left: 0;
    &__text {
      font-size: 34px;
      color: #fff;
    }
  }

  .form_contianer {
    .wh(360px, 190px);
    .ctp(360px, 300px);
    padding: 25px;
    border-radius: 5px;
    text-align: center;
    background-color: #fff;
    .submit_btn {
      width: 100%;
      font-size: 16px;
    }
  }

  .tip {
    font-size: 12px;
    color: red;
  }

  .form-fade-enter-active, .form-fade-leave-active {
    transition: all 1s;
  }

  .form-fade-enter, .form-fade-leave-active {
    transform: translate3d(0, -50px, 0);
    opacity: 0;
  }
</style>
