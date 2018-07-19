import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import signale from 'signale';
import getFieldHtml from './fieldsHandler';
import mUtils from './mUtils';

const args = process.argv.splice(2);
const templateName = args[0];
const templateNameZh = args[1];

class MyFile {
  constructor(halfFileName, generatePath) {
    this.halfFileName = halfFileName;
    this.generatePath = generatePath;
  }
}

function replaceManageAnchorContent(content, moduleNameEn, moduleNameZh) {
  const manageMenuItemAnchor = '<!--@{code-generator-anchor__manage-menu-item}-->';
  const manageMenuItemTemplate = `<ElMenuItem index="${moduleNameEn}List">${moduleNameZh}列表</ElMenuItem>${mUtils.enter}
                                    ${manageMenuItemAnchor}`;

  return content.replace(manageMenuItemAnchor, manageMenuItemTemplate);
}

function replaceRouterAnchorContent(content, moduleNameEn, moduleNameZh) {
  const moduleNameEnUpperFirst = _.upperFirst(moduleNameEn);

  const routerImportComponentAnchor = '// @{code-generator-anchor__router-import-component}';
  const routerConfigPathAnchor = '// @{code-generator-anchor__router-config-path}';


  const routerImportComponentTemplate = `const ${moduleNameEnUpperFirst}List = () => import('pages/${moduleNameEnUpperFirst}List');
                                           const ${moduleNameEnUpperFirst}Form = () => import('pages/${moduleNameEnUpperFirst}Form');${mUtils.line}
                                           ${routerImportComponentAnchor}`;

  const routerConfigPathTemplate = ` {
            path: '/${moduleNameEn}List',
            name: '${moduleNameEn}List',
            component: ${moduleNameEnUpperFirst}List,
            meta: ['${moduleNameZh}'],
        }, {
            path: '/${moduleNameEn}Form/:id?',
            name: '${moduleNameEn}Form',
            component: ${moduleNameEnUpperFirst}Form,
            meta: ['${moduleNameZh}', '详情'],
        }, ${routerConfigPathAnchor}`;

  return content.replace(routerImportComponentAnchor, routerImportComponentTemplate)
    .replace(routerConfigPathAnchor, routerConfigPathTemplate);
}

function handleManageFile(moduleNameEn, moduleNameZh) {
  const manageFilePath = '../src/pages/Manage.vue';

  fs.readFile(path.resolve(__dirname, manageFilePath), 'utf8', (error, content) => {
    if (error) {
      signale.fatal(error.message);
      return;
    }
    // 如果内容已经存在，说明重复执行了代码生成，直接返回
    if (_.includes(content, `${moduleNameEn}List`)) {
      signale.info('manageFile won\'t rewrite exist module');
      return;
    }

    const newContent = replaceManageAnchorContent(content, moduleNameEn, moduleNameZh);

    fs.writeFile(path.resolve(__dirname, manageFilePath), newContent, (writeError) => {
      if (writeError) {
        signale.fatal(error.message);
      }
      signale.success('manage write successful');
    });
  });
}

function handleRouterFile(moduleNameEn, moduleNameZh) {
  const routerFilePath = '../src/router/index.js';

  fs.readFile(path.resolve(__dirname, routerFilePath), 'utf8', (error, content) => {
    if (error) {
      signale.fatal(error.message);
      return;
    }

    if (_.includes(content, `${moduleNameEn}List`)) {
      signale.info('routerFile won\'t rewrite exist module');
      return;
    }

    const newContent = replaceRouterAnchorContent(content, moduleNameEn, moduleNameZh);

    fs.writeFile(path.resolve(__dirname, routerFilePath), newContent, (writeError) => {
      if (writeError) {
        signale.fatal(writeError.message);
      }
      signale.success('router write successful');
    });
  });
}

function handleVueFile(moduleNameEn) {
  [new MyFile('.js', 'api'),
    new MyFile('List.vue', 'pages'),
    new MyFile('Form.vue', 'pages')].forEach((myFile) => {
    fs.readFile(`${__dirname}/template/Template${myFile.halfFileName}`, 'utf8', (error, content) => {
      if (error) {
        signale.fatal(error.message);
        return;
      }

      getFieldHtml(moduleNameEn, ({
                                    formFieldsHtml, listColumnsHtml,
                                    searchFieldsHtml, searchOptionsObj, searchObjFields,
                                  }) => {
        const newContent = content.replace(/@\{templateName\}/g, moduleNameEn)
          .replace(/@\{formFields\}/g, formFieldsHtml)
          .replace(/@\{listColumns\}/g, listColumnsHtml)
          .replace(/@\{searchFields\}/g, searchFieldsHtml)
          .replace(/@\{searchOptionsObj\}/g, searchOptionsObj)
          .replace(/@\{searchObjFields\}/g, searchObjFields)
          .replace(/@\{boxRightClass\}/g, searchFieldsHtml === '' ? ' class="handle-box-right"' : '');

        const outPutFileNameFirstPart = myFile.halfFileName.includes('vue') ? _.upperFirst(moduleNameEn) : moduleNameEn;
        const outPutFileName = outPutFileNameFirstPart + myFile.halfFileName;

        fs.writeFile(path.resolve(__dirname, `../src/${myFile.generatePath}/${outPutFileName}`), newContent, (writeError) => {
          if (writeError) {
            signale.fatal(writeError.message);
          }
          signale.success(`${moduleNameEn + myFile.halfFileName} write successful`);
        });
      });
    });
  });
}

(function main() {
  handleVueFile(templateName);
  handleRouterFile(templateName, templateNameZh);
  handleManageFile(templateName, templateNameZh);
}());

