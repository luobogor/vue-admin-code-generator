import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import signale from 'signale';
import mUtils from './mUtils';
import config from './config';

const cache = {};
let moduleName;

function getSearchFieldsHtml(fields) {
  if (!fields.some(field => field.component)) {
    return '';
  }

  function customHtmlByComponent(fieldName, fieldProp, fieldComponent) {
    const componentHandle = {
      ops: `<ElSelect v-model="query.${fieldProp}" filterable>
                      <ElOption
                        v-for="item in ${fieldProp}Options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"/>
                  </ElSelect>`,
      ipt: `<ElInput v-model="query.${fieldProp}"/>`,
    };

    const component = componentHandle[fieldComponent] ? fieldComponent : 'ipt';
    return `<ElFormItem label="${fieldName}">
                ${componentHandle[component]}
            </ElFormItem>`;
  }

  function getItems() {
    return fields.filter(field => field.component)
      .reduce((itemsHtml, field) => {
        const fieldComponent = field.component;
        const fieldProp = _.camelCase(field.name);
        const fieldName = field.comment;
        return itemsHtml + customHtmlByComponent(fieldName, fieldProp, fieldComponent);
      }, '');
  }

  return `<ElForm :inline="true" :model="query">
              ${getItems()}
          <ElButton
            type="primary"
            icon="el-icon-search"
            @click="getList">搜索
          </ElButton>
        </ElForm>${mUtils.enter}`;
}

function getSearchOptionsObj(fields) {
  if (!fields.some(field => field.component)) {
    return '';
  }

  function getItems() {
    return fields.filter(field => field.component === 'ops')
      .reduce((objFields, field, idx, array) => {
        const items = `${objFields + _.camelCase(field.name)}Options:[{label: '', value: ''}]`;
        return items + (mUtils.isLast(array, idx) ? '' : mUtils.enter);
      }, '');
  }

  return getItems();
}

function getSearchObjFields(fields) {
  if (!fields.some(field => field.component)) {
    return '';
  }

  function getItems() {
    return fields.filter(field => field.component)
      .reduce((objFields, field, idx, array) => {
        const items = `${objFields + _.camelCase(field.name)}:'',`;
        return items + (mUtils.isLast(array, idx) ? '' : mUtils.enter);
      }, '');
  }

  return getItems();
}

function getFormFieldsHtml(fieldName, fieldProp, fieldType) {
  const customHtmlByType = () => {
    const typeHandle = {
      Boolean: `<ElRadioGroup v-model="formData.${fieldProp}">
                        <ElRadio :label="true">是</ElRadio>
                        <ElRadio :label="false">否</ElRadio>
                    </ElRadioGroup>`,
      Date: `<span>{{formData.${fieldProp} | formatDate}}</span>`,
      default: `<ElInput v-model="formData.${fieldProp}"/>`,
    };

    const type = typeHandle[fieldType] ? fieldType : 'default';
    return typeHandle[type];
  };

  return `<ElFormItem label="${fieldName}"
                        prop="${fieldProp}" 
                        :rules="[{required:true , message:'此字段不能为空'}]">
                 ${customHtmlByType()}
             </ElFormItem>\n\n`;
}

function getListColumnsHtml(fieldName, fieldProp, fieldType) {
  const customHtmlByType = () => {
    const typeHandle = {
      Boolean: `<template slot-scope="{row}">
                        <span>{{row.${fieldProp} | formatBoolean}}</span>
                    </template>`,
      Date: `<template slot-scope="{row}">
                        <span>{{row.${fieldProp} | formatDate}}</span>
                    </template>`,
      default: '',
    };

    const type = typeHandle[fieldType] || 'default';
    return typeHandle[type];
  };

  const content = customHtmlByType();

  if (content) {
    return `<ElTableColumn
                prop="${fieldProp}"
                label="${fieldName}">
                ${customHtmlByType()}</ElTableColumn>${mUtils.line}`;
  }

  return `<ElTableColumn
              prop="${fieldProp}"
              label="${fieldName}"/>${mUtils.line}`;
}

function getHtml(fields) {
  let listColumnsHtml = '';
  let formFieldsHtml = '';

  fields.forEach((field) => {
    if (field.name.toLowerCase() === 'id') {
      return;
    }

    const fieldProp = _.camelCase(field.name);
    const fieldName = field.comment;
    const fieldType = field.type;

    formFieldsHtml += getFormFieldsHtml(fieldName, fieldProp, fieldType);
    listColumnsHtml += getListColumnsHtml(fieldName, fieldProp, fieldType);
  });

  const searchFieldsHtml = getSearchFieldsHtml(fields);
  const searchObjFields = getSearchObjFields(fields);
  const searchOptionsObj = getSearchOptionsObj(fields);

  cache[moduleName] = {
    formFieldsHtml,
    listColumnsHtml,
    searchFieldsHtml,
    searchOptionsObj,
    searchObjFields,
  };
  return cache[moduleName];
}

function execComments(content) {
  const commentStartTagReg = '@ApiModelProperty\\(value\\s*=\\s*"';
  const commentEndTagReg = '"\\)';
  return mUtils.execVars(commentStartTagReg, commentEndTagReg, content);
}

function execFields(content) {
  const fieldStartTagReg = 'private\\s+';
  const fieldEndTagReg = ';';
  return mUtils.execVars(fieldStartTagReg, fieldEndTagReg, content);
}

function getDomainFileName(mName) {
  return _.upperFirst(mName) + config.domainFileSuffix;
}

export default function getFieldHtml(mName, callback) {
  moduleName = mName;

  fs.readFile(path.resolve(__dirname, mUtils.getDomainDirPath() + getDomainFileName(moduleName)), 'utf8', (error, content) => {
    if (error) {
      signale.fatal(error.message);
    }

    if (cache[moduleName]) {
      return callback && callback(cache[moduleName]);
    }

    const comments = execComments(content);
    const fields = execFields(content);

    return callback && callback(getHtml(fields.map((field, idx) => {
      const fieldStr = field.trim().split(/\s+/);
      const type = fieldStr[0];
      const name = fieldStr[1];

      const commentAndComponent = comments[idx].split('!');
      const comment = commentAndComponent[0];
      const component = commentAndComponent[1] || '';

      return { type, name, comment, component };
    })));
  });

  return {};
}
