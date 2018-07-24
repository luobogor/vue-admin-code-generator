import { wrapper, globalEnterEvent } from 'utils/mUtils';

export default {
  data: () => ({
    tableData: [],
    size: 10,
    count: 0,
    currentPage: 1,
    loading: true,
    // 如果出现同名，mixins的属性是不会覆盖组件的属性，这里初始化query
    query: {},
  }),

  methods: {
    currentChangeHandle(val) {
      this.currentPage = val;
      this.initData();
    },

    addHandle() {
      this.$router.push({ name: `${this.moduleName}Form` });
    },
    editHandle(row) {
      this.$router.push({ name: `${this.moduleName}Form`, params: { id: row.id } });
    },
    delHandle(index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.delete(index, row);
      });
    },
    async delete(index, row) {
      await this.api.del(row.id);
      this.tableData.splice(index, 1);
    },

    setList({ content, totalElements }) {
      this.tableData = content;
      this.count = totalElements;
    },
    getList() {
      return wrapper.waitingWrapper(this, 'loading', this.api.get)(Object.assign(
        {
          page: this.currentPage - 1,
          size: this.size,
        },
        this.query,
      ));
    },
    async initData() {
      const { data } = await this.getList();
      this.setList(data);
    },
    isBind() {
      return !_.isEmpty(this.query);
    },
    handleBindAndRemoveEnterEvent() {
      if (this.isBind()) {
        globalEnterEvent.bind(this.initData);
        this.$once('hook:beforeDestroy', globalEnterEvent.remove);
      }
    },

    checkEssentialField() {
      if (!_.isObject(this.api)) {
        throw new Error('api 必须为对象，且为必要属性，请在组件中添加该属性');
      }
      if (!_.isString(this.moduleName)) {
        throw new Error('moduleName 必须为字符串，且为必要属性，请在组件中添加该属性');
      }
    },
  },

  created() {
    this.checkEssentialField();
    this.handleBindAndRemoveEnterEvent();
    this.initData();
  },
};
