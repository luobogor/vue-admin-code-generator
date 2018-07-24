import config from './config';

export default {
  enter: '\n',
  line: '\n\n',

  isLast(arr, idx) {
    return arr.length - 1 === idx;
  },

  execVars(startTagReg, endTagReg, text) {
    const pattern = new RegExp(`${startTagReg}(.*)?${endTagReg}`, 'g');
    const vars = [];

    let matches = pattern.exec(text);
    while (matches) {
      vars.push(matches[1]);
      matches = pattern.exec(text);
    }

    return vars;
  },

  getDomainDirPath() {
    if (!config.domainDirPath.endsWith('/')) {
      return `${config.domainDirPath}/`;
    }

    return config.domainDirPath;
  },
};
