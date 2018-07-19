<template>
  <div class="form-box">
    <ElForm
      :model="value"
      :inline="inline"
      :disabled="disabled"
      :label-position="labelPosition"
      :label-width="labelWidth"
      ref="appForm">
      <slot></slot>
      <ElFormItem>
        <ElButton type="primary" @click="submit">保存</ElButton>
        <ElButton @click="back">返回</ElButton>
      </ElFormItem>
    </ElForm>
  </div>
</template>

<script>
import GlobalEnterMixin from 'mixins/GlobalEnterMixin';
import { wrapper } from 'utils/mUtils';

export default {
  name: 'AppForm',

  mixins: [GlobalEnterMixin],

  props: {
    id: { type: [Number, String], default: '' },
    value: { type: Object, required: true },
    backRouter: { type: String, default: '' },

    inline: { type: Boolean, default: false },
    labelWidth: { type: String, default: '120px' },
    labelPosition: { type: String, default: 'right' },

    httpGet: { type: Function, default() { throw new Error('AppForm:请传递httpGet方法'); } },
    httpPost: { type: Function, required: true },

    beforeSave: { type: Function, default() {} },
    parse: { type: Function },
  },

  data() {
    return {
      disabled: false,
    };
  },

  methods: {
    back() {
      if (this.backRouter) {
        this.$router.push({ name: this.backRouter });
      } else {
        this.$router.back();
      }
    },

    isSave() {
      return this.beforeSave(this.value) !== false;
    },
    getParsedData() {
      return this.parse ? this.parse(this.value) : this.value;
    },
    async handleSave() {
      if (this.isSave()) {
        await this.save(this.getParsedData());
        this.back();
      }
    },
    save(data) {
      return wrapper.waitingWrapper(this, 'disabled', this.httpPost)(data);
    },

    submit() {
      wrapper.validateWrapper(this, 'appForm', this.handleSave)();
    },
    async initData() {
      const { data } = await this.httpGet(this.id);
      this.$emit('input', data);
    },
  },

  created() {
    if (this.id) {
      this.initData();
    }
  },
};
</script>
