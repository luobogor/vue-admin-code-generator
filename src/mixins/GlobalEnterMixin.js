import { globalEnterEvent } from 'utils/mUtils';

export default {
  methods: {
    submit() {
      throw new Error('GlobalEnterMixin:父组件必须重载submit方法');
    },
    isEditor(dom) {
      const isQuillEditor = className => className === 'ql-editor';
      const isTextArea = tagName => tagName.toLowerCase() === 'textarea';
      return isTextArea(dom.tagName) || isQuillEditor(dom.className);
    },
  },

  created() {
    globalEnterEvent.bind(() => {
      if (this.isEditor(event.target)) {
        return;
      }
      this.submit();
    });
  },
  beforeDestroy() {
    globalEnterEvent.remove();
  },
};
