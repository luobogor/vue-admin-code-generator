# Vue管理端代码生成工具

基于Java实体与Swagger的Vue管理端代码生成工具
 
## 使用
模块请使用驼峰命名输入

````
cd ./code-generator
npm install / yarn install
node index.js 模块英文名称 模块中文名称
````
 
例如

````
node index.js user 用户
````

如果重复执行代码生成，以下文件不会被重复覆盖

- Manage.vue
- router/index.js 

## 配置

### config.js
配置项 | 说明
---|---
domainDirPath | 模块对应Java实体/Vo层对象的路径

### 列表页搜索栏组件
在value说明后加上!ipt，程序会在搜索栏中生成相应字段的输入框

````java
@ApiModelProperty(value = "邮箱!ipt")
private String email;
````

搜索栏生成下拉选

````java
@ApiModelProperty(value = "账号状态!ops")
private Boolean enabled;
````

## 变量
- templateName 模块名称

如：user

- formFields 每个字段的表单组件

````html
<ElFormItem label="邮箱"
                prop="email"
                :rules="[{required:true , message:'此字段不能为空'}]">
      <ElInput v-model="formData.email"/>
</ElFormItem>
````
- searchFields 搜索栏

````html
 <ElForm :inline="true" :model="query">
    <ElFormItem label="邮箱">
      <ElInput v-model="query.email"/>
    </ElFormItem>

    <ElFormItem label="活动状态">
      <ElSelect v-model="query.enable" filterable>
        <ElOption
          v-for="item in enableOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </ElSelect>
    </ElFormItem>

    <ElButton
      type="primary"
      icon="el-icon-search"
      @click="initData">
      搜索
    </ElButton>
</ElForm>
````
- boxRightClass 添加按钮的位置 

如果不生成搜索栏，则会在添加按钮父容器加上class="handle-box-right"使按钮右浮动

````html
<div class="handle-box-right">
  <ElButton type="primary"
            icon="el-icon-plus"
            @click="addHandle">添加
  </ElButton>
</div>
````

- listColumns

````html
<ElTableColumn
    type="index"
    width="50"/>

<ElTableColumn
  prop="email"
  label="邮箱"
  width="220"/>

<ElTableColumn
  prop="registerTime"
  label="注册时间"/>
````

- searchOptionsObj 生成搜索栏相关options对象
- searchObjFields 填充query对象属性

````
data: () => ({
    enableOptions：[{label: '', value: ''}],
    query: {
      email: '',
      enable: '',
    },
})
````

### 锚点
- Manage.vue

````html
<!--定位导航菜单代码位置-->
<!--@{code-generator-anchor__manage-menu-item}-->
````

- router/index.js

````js
// 定位引入组件代码位置
// @{code-generator-anchor__router-import-component}

// 定位路由代码位置
// @{code-generator-anchor__router-config-path}
````
