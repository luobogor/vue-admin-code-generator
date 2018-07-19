<template>
  <div class="fillcontain">
    <div class="handle-box">
      @{searchFields}
      <div@{boxRightClass}>
        <ElButton type="primary"
                  icon="el-icon-plus"
                  @click="addHandle">添加
        </ElButton>
      </div>
    </div>

    <ElTable
      v-loading="loading"
      :data="tableData">

      <ElTableColumn
        type="index"
        min-width="50"/>

      @{listColumns}

      <ElTableColumn label="操作" width="180">
        <template slot-scope="{ row, $index }">
          <ElButton
            size="small"
            icon="el-icon-edit"
            @click="editHandle(row)">编辑
          </ElButton>
          <ElButton
            size="small"
            type="danger"
            icon="el-icon-delete"
            @click="delHandle($index, row)">删除
          </ElButton>
        </template>
      </ElTableColumn>
    </ElTable>

    <ElPagination
      class="mt10"
      layout="total, prev, pager, next"
      @current-change="currentChangeHandle"
      :current-page="currentPage"
      :page-size="size"
      :total="count"/>
  </div>
</template>

<script>
import @{templateName}Api from 'api/@{templateName}';
import ListPageMixin from 'mixins/ListPageMixin';

export default {
  name: '@{templateName}List',

  mixins: [ListPageMixin],

  data: () => ({
    api: @{templateName}Api,
    moduleName: '@{templateName}',
    @{searchOptionsObj},
    query: {
      @{searchObjFields}
    },
  }),
};
</script>
