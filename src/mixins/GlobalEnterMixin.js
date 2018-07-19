export default {
  methods: {
    submit() {
      throw new Error('GlobalEnterMixin:父组件必须重载submit方法');
    },
    isEditor(dom) {
      if (dom.tagName.toLowerCase() === 'textarea') {
        return true;
      }
      // quill editor
      if (dom.className === 'ql-editor') {
        return true;
      }

      return false;
    },
    bindEnterEvent() {
      document.onkeydown = (event) => {
        if (this.isEditor(event.target)) {
          return;
        }
        if (event.keyCode === 13) {
          this.submit();
        }
      };
    },
    removeBindEnterEvent() {
      document.onkeydown = null;
    },
  },

  created() {
    this.bindEnterEvent();
  },
  beforeDestroy() {
    this.removeBindEnterEvent();
  },
};
