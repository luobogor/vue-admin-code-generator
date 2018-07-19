// 默认情况下，moment是按照客户操作系统的当前时区计算。（注意不是按照浏览器的语言推算时区）
import moment from 'moment';
import Vue from 'vue';

Vue.filter('formatDate', (value, particle = 'm') => {
  if (!value) {
    return '';
  }
  const particleHandle = {
    d: 'YYYY-MM-DD',
    m: 'YYYY-MM-DD HH:mm',
    s: 'YYYY-MM-DD HH:mm:ss',
  };

  return particleHandle[particle] ? moment(value).format(particleHandle[particle]) : '';
});

Vue.filter('formatBoolean', (value) => {
  const availableValue = [1, 0, true, false];
  // 不能使用in判断，因为('1' in availableValue)返回的是true
  if (!availableValue.includes(value)) {
    return '';
  }
  return value ? '是' : '否';
});
